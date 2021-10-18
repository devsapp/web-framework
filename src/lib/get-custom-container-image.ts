import * as core from '@serverless-devs/core';
import { spawnSync } from 'child_process';
import fse from 'fs-extra';
import _ from 'lodash';
import { IProperties } from '../interface/inputs';
import { GET_IMAGE_URL } from '../constant';
import { isDebug, getSrc, checkUriIsFile } from './utils';
import logger from '../common/logger';
import path from 'path';

export default class GetCustomContainerImage {
  async getCustomContainerImage(props: IProperties): Promise<string> {
    const {
      function: functionConfig,
      runtime,
      region,
    } = props;
    logger.debug(`get image customContainerConfig: ${JSON.stringify(functionConfig?.customContainerConfig)}, runtime: ${runtime}, region: ${region}.`);
    if (_.isEmpty(runtime) && _.isEmpty(functionConfig?.customContainerConfig?.image)) {
      throw new Error('The running environment is not found, please manually configure the image property of customContainerConfig');
    }

    if (_.isEmpty(functionConfig?.customContainerConfig?.image)) {
      const { image, ResponseId, Response } = await core.request(GET_IMAGE_URL, {
        method: 'post',
        body: {
          region,
          runtime: props.runtime === 'php7.2' ? 'php7' : props.runtime,
        },
        form: true,
      });
      logger.debug(`Get custom container image is ${image}.`);
      if (_.isEmpty(image)) {
        const error = new Error(`Message: ${Response?.Message} ResponseId: ${ResponseId}`);
        error.name = Response?.Error;
        throw error;
      }
      return image;
    }

    logger.debug(`Get custom container image is ${functionConfig.customContainerConfig.image}.`);
    return functionConfig.customContainerConfig.image;
  }

  async generateCustomContainerImage(
    props: IProperties,
    image: string,
    qualifier: string,
    namespace: string,
    baseDir: string,
  ): Promise<string> {
    const { region } = props;
    const serviceName = props.service.name;
    const {
      code,
      name: functionName = serviceName,
    } = props.function;

    /**
     * 创建镜像过程
     * 1. 生成dockerfile以及dockerignore，如果存在则不处理
     * 2. 利用hanxie大佬的provider修改push，由于之前的镜像是我们的公用镜像，所以需要转化成用户的镜像。
     * 3. 返回 imageId
     */
    let dockerPath = 'Dockerfile';
    let deleteIgnore = false;

    const codeUri = await getSrc(code, serviceName, functionName, baseDir);
    if (!await checkUriIsFile(dockerPath)) {
      dockerPath = '.Dockerfile';
      await fse.writeFileSync(dockerPath, `FROM ${image}
  RUN mkdir /code
  ADD ${path.relative(process.cwd(), codeUri)} /code/${functionName}
  RUN chmod 755 -R /code
  WORKDIR /code/${functionName}`);
    }

    if (!(await fse.pathExists('.dockerignore'))) {
      deleteIgnore = true;
      const exclude = code.excludes || [];
      exclude.unshift('!.s');
      await fse.writeFileSync('.dockerignore', exclude.join(codeUri ? `\n${codeUri}/` : '\n'));
    }

    const projectName = `${serviceName}.${functionName}`.toLowerCase();
    if (projectName.length > 64) {
      throw new Error(`[${projectName}] The length is greater than 64, it is recommended to reduce the length of the service or function name.`);
    }

    const imageId = `registry.${region}.aliyuncs.com/${namespace}/${projectName}:${qualifier}`;
    const command = `docker build -t ${imageId} -f ${dockerPath} . `;

    const stdio = isDebug ? 'inherit' : 'ignore';
    const vm = isDebug ? undefined : core.spinner(`Run: ${command}`);

    const { status } = spawnSync(command, [], {
      stdio,
      cwd: './',
      shell: true,
    });

    if (deleteIgnore) {
      await fse.remove('.dockerignore');
    }
    if (dockerPath === '.Dockerfile') {
      await fse.remove(dockerPath);
    }

    if (status) {
      vm?.fail();
      throw new Error('Failed to package image.');
    }
    vm?.succeed();
    return imageId;
  }
}
