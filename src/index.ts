import * as core from '@serverless-devs/core';
import _ from 'lodash';
import fse from 'fs-extra';
import * as constant from './constant';
import logger from './common/logger';
import { ICredentials, IInputs } from './interface/inputs';
import GetCustomContainerImage from './lib/get-custom-container-image';
import AliCloud from './lib/alicloud';
import FcFunction from './lib/fc';
import TransformToFc from './lib/inputs-transform-to-fc';
import { requestDomains } from './lib/utils';

export default class FcFramework {
  async deploy(inputs: IInputs) {
    logger.debug(`inputs.props:: ${JSON.stringify(inputs.props)}`);
    const {
      isHelp,
      credentials,
      transformToFc,
      deployType,
      toFcInputs,
    } = await this.handlerInputs(inputs, 'deploy');
    if (isHelp) return;

    const src = inputs.props.function?.code?.src;
    if (!src) {
      throw new Error('No code package config found');
    }
    if (!(await fse.pathExists(src))) {
      throw new Error(`Address ${src} does not exist`);
    }

    const baseDir = inputs.path?.configPath;
    const serviceName = toFcInputs.props.service.name;
    const functionName = toFcInputs.props.function.name;
    const getCustomContainerImage = new GetCustomContainerImage();
    let imageId = await getCustomContainerImage.getCustomContainerImage(inputs.props);

    if (deployType === 'container') {
      const qualifier = `LATEST-${new Date().getTime()}`;
      const namespace = this.getNamespace(inputs);
      const projectName = `${serviceName}.${functionName}`.toLowerCase();
      logger.debug(`Get namespace is ${namespace}, qualifier is ${qualifier}`);

      // 优先尝试检测阿里云的容器镜像服务的命名空间和仓库是否可用
      const provider = new AliCloud(inputs.props.region, namespace, credentials);
      await provider.login();
      await provider.init(projectName);
      // 重新 build 一个镜像
      imageId = await getCustomContainerImage.generateCustomContainerImage(inputs.props, imageId, qualifier, namespace, baseDir);
    }
    logger.debug(`Get imageId:: ${imageId}`);
    toFcInputs.props.function.customContainerConfig.image = imageId;

    const fcConfig = await this.fcMethodCaller(toFcInputs, 'deploy');

    if (deployType === 'nas') {
      const { args, mkdirArgs } = await transformToFc.getDeployNasArgs();
      logger.log(`Reminder nas upload instruction: ${args}`);
      if (mkdirArgs) {
        logger.debug(`mkdirArgs: ${mkdirArgs}`);
        toFcInputs.args = mkdirArgs;
        try {
          await this.fcMethodCaller(toFcInputs, 'nas');
        } catch (e) {
          logger.debug(e.toString());
        }
      }
      toFcInputs.args = args;
      await this.fcMethodCaller(toFcInputs, 'nas');
    }
    const tryContainerAccelerationVM = core.spinner('Try container acceleration');
    const flag = await FcFunction.tryContainerAcceleration(inputs, serviceName, functionName, toFcInputs.props.function.customContainerConfig);
    const customDomains = fcConfig.url?.custom_domain.map(({ domain }) => domain);
    if (fcConfig.customDomains && fcConfig.customDomains[0].domainName) {
      await requestDomains(customDomains[0]);
    }

    flag ? tryContainerAccelerationVM.succeed() : tryContainerAccelerationVM.fail();

    // 返回结果
    return {
      region: fcConfig.region,
      serviceName,
      functionName,
      customDomains,
    };
  }

  async remove(inputs: IInputs) {
    const {
      isHelp,
      toFcInputs,
    } = await this.handlerInputs(inputs, 'remove');
    if (isHelp) return;

    const regionId = toFcInputs.props.region;
    const serviceName = toFcInputs.props.service.name;
    const nasComponent = await core.loadComponent('devsapp/nas');
    await nasComponent.removeHelperService({ ...toFcInputs, props: { regionId, serviceName } });

    return await this.fcMethodCaller(toFcInputs, 'remove');
  }

  async logs(inputs: IInputs) {
    const {
      isHelp,
      toFcInputs,
    } = await this.handlerInputs(inputs, 'logs');
    if (isHelp) return;

    return await this.fcMethodCaller(toFcInputs, 'logs');
  }

  async build(inputs: IInputs) {
    const {
      isHelp,
      toFcInputs,
    } = await this.handlerInputs(inputs, 'logs');
    if (isHelp) return;

    toFcInputs.props.function.runtime = inputs.props.runtime || 'custom';
    delete toFcInputs.props.function.customContainerConfig;

    return await this.fcMethodCaller(toFcInputs, 'build');
  }

  async metrics(inputs: IInputs) {
    const {
      isHelp,
      toFcInputs,
    } = await this.handlerInputs(inputs, 'metrics');
    if (isHelp) return;

    return await this.fcMethodCaller(toFcInputs, 'metrics');
  }

  async info(inputs: IInputs) {
    const {
      isHelp,
      toFcInputs,
    } = await this.handlerInputs(inputs, 'info');
    if (isHelp) return;

    return await this.fcMethodCaller(toFcInputs, 'info');
  }

  async nas(inputs: IInputs) {
    const {
      isHelp,
      toFcInputs,
    } = await this.handlerInputs(inputs, 'nas');
    if (isHelp) return;

    toFcInputs.argsObj = inputs.argsObj;
    return await this.fcMethodCaller(toFcInputs, 'nas');
  }

  async alias(inputs: IInputs) {
    const {
      isHelp,
      toFcInputs,
    } = await this.handlerInputs(inputs, 'alias');
    if (isHelp) return;

    toFcInputs.argsObj = inputs.argsObj;
    return await this.fcMethodCaller(toFcInputs, 'alias');
  }

  async version(inputs: IInputs) {
    const {
      isHelp,
      toFcInputs,
    } = await this.handlerInputs(inputs, 'version');
    if (isHelp) return;

    toFcInputs.argsObj = inputs.argsObj;
    return await this.fcMethodCaller(toFcInputs, 'version');
  }

  async provision(inputs: IInputs) {
    const {
      isHelp,
      toFcInputs,
    } = await this.handlerInputs(inputs, 'provision');
    if (isHelp) return;

    toFcInputs.argsObj = inputs.argsObj;
    return await this.fcMethodCaller(toFcInputs, 'provision');
  }

  async onDemand(inputs: IInputs) {
    const {
      isHelp,
      toFcInputs,
    } = await this.handlerInputs(inputs, 'onDemand');
    if (isHelp) return;

    toFcInputs.argsObj = inputs.argsObj;
    return await this.fcMethodCaller(toFcInputs, 'onDemand');
  }

  private async handlerInputs(inputs, methodName) {
    const apts = { boolean: ['help'], alias: { help: 'h' } };
    const comParse: any = core.commandParse({ args: inputs.args }, apts);
    if (comParse.data?.help) {
      if (['deploy', 'remove'].includes(methodName)) {
        core.help(constant[methodName.toLocaleUpperCase()]);
      } else {
        await this.fcMethodCaller(inputs, methodName);
      }
      return { isHelp: true };
    }

    const credentials = await this.getCredentials(inputs);
    this.reportComponent('methodName', credentials.AccountID);

    const deployType = await this.getDeployType();
    const transformToFc = new TransformToFc(_.cloneDeep(inputs), credentials);
    const toFcInputs = transformToFc.transform(methodName, deployType);

    return {
      credentials,
      deployType,
      transformToFc,
      toFcInputs,
    };
  }

  private getNamespace(inputs: IInputs) {
    if (!_.isEmpty(inputs.props.namespace)) {
      return inputs.props.namespace.toLowerCase();
    }
    if (!_.isEmpty(inputs.appName)) {
      return inputs.appName.toLowerCase();
    }
    throw new Error('Unable to determine the namespace, please configure the namespace under the props parameter');
  }

  private async getCredentials(inputs: IInputs): Promise<ICredentials> {
    const fcCommon = await core.loadComponent('devsapp/fc-common');
    const { access, credentials } = await fcCommon.getCredentials(inputs);
    if (!_.isEmpty(access)) {
      if (_.isEmpty(inputs.project)) {
        // eslint-disable-next-line
        inputs.project = { access };
      } else {
        // eslint-disable-next-line
        inputs.project.access = access;
      }
    }

    return credentials;
  }

  private async getDeployType() {
    const fcDefault = await core.loadComponent('devsapp/fc-default');
    return await fcDefault.get({ args: 'web-framework' });
  }

  private async fcMethodCaller(toFcInputs, methodName: string) {
    const fcComponent = await core.loadComponent('devsapp/fc');
    return await fcComponent[methodName](_.cloneDeep(toFcInputs));
  }

  private async reportComponent(command: string, uid?: string) {
    core.reportComponent(constant.CONTEXT_NAME, { command, uid });
  }
}
