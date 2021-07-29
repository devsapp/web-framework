/* eslint-disable no-await-in-loop */
/* eslint-disable max-len */
import {
  getCredential,
  help,
  commandParse,
  loadComponent,
  spinner,
} from '@serverless-devs/core';
import _ from 'lodash';
import { HELP } from './constant';
import { ICredentials, IInputs, ICommandParse } from './interface/inputs';
import ToLogs from './lib/transform/to-logs';
import ToMetrics from './lib/transform/to-metrics';
import ToFc from './lib/transform/to-fc';
import ToBuild from './lib/transform/to-build';
import ToInfo from './lib/transform/to-info';

import GenerateDockerfile from './lib/generate-dockerfile';
import ProviderFactory from './lib/providers/factory';
import NasComponent from './lib/nas';
import Fc from './lib/fc';
import { getImageAndReport, requestDomains } from './lib/utils';
import Domain from './lib/domain';
import logger from './common/logger';

export default class Component {
  async publish(inputs) {
    const apts = {
      boolean: ['help'],
      string: ['description'],
      alias: { help: 'h', description: 'd' },
    };
    const comParse: any = commandParse({ args: inputs.args }, apts);

    const deployType = await this.getDeployType();

    if (deployType !== 'container') {
      throw new Error('The verison capability currently only supports container.');
    }

    const credentials = await this.getCredentials(inputs.credentials, inputs.project?.access);
    inputs.credentials = credentials;

    const { region } = inputs.props;
    const serviceName = inputs.props.service.name;

    let nextQualifier;

    const versions = await Fc.listVersions(credentials, region, serviceName);
    if (_.isEmpty(versions)) {
      nextQualifier = 1;
    } else {
      nextQualifier = versions.shift().versionId / 1 + 1;
    }
    logger.debug(`next qualifier is ${nextQualifier}.`);

    inputs = await getImageAndReport(inputs, credentials.AccountID, 'publish');
    const cloneInputs: any = _.cloneDeep(inputs);
    cloneInputs.props = ToFc.transform(cloneInputs.props, deployType);

    const imageId = await GenerateDockerfile(inputs, nextQualifier);

    const provider = ProviderFactory.getProvider(inputs);
    await provider.login();
    cloneInputs.props.function.customContainerConfig.image = await provider.publish(imageId, nextQualifier);
    logger.debug(`custom container config image is ${cloneInputs.props.function.customContainerConfig.image}`);
    cloneInputs.props.customDomains = await Domain.get(inputs);
    await (await this.getFc()).deploy(cloneInputs);

    return await Fc.publishVersion(credentials, region, serviceName, comParse.data?.description);
  }

  async unpublish(inputs) {
    const apts = {
      boolean: ['help'],
      string: ['version'],
      alias: { help: 'h', version: 'v' },
    };
    const comParse: any = commandParse({ args: inputs.args }, apts);

    const credentials = await this.getCredentials(inputs.credentials, inputs.project?.access);
    inputs.credentials = credentials;

    const { region } = inputs.props;
    const serviceName = inputs.props.service.name;
    logger.info(`unpublish version ${region}/${serviceName}.${comParse.data?.version}`);
    return await Fc.deleteVersion(credentials, region, serviceName, comParse.data?.version);
  }

  async deploy(inputs) {
    const apts = {
      boolean: ['help', 'assumeYes'],
      alias: { help: 'h', assumeYes: 'y' },
    };
    const comParse: any = commandParse({ args: inputs.args }, apts);
    if (comParse.data?.help) {
      help(HELP);
      return;
    }

    const credentials = await this.getCredentials(inputs.credentials, inputs.project?.access);
    inputs.credentials = credentials;

    inputs = await getImageAndReport(inputs, credentials.AccountID, 'deploy');
    const cloneInputs: any = _.cloneDeep(inputs);

    const deployType = await this.getDeployType();
    cloneInputs.props = ToFc.transform(cloneInputs.props, deployType);

    // @ts-ignore
    delete cloneInputs.Properties;

    if (deployType === 'container') {
      const qualifier = `LATEST-${new Date().getTime()}`;
      const imageId = await GenerateDockerfile(inputs, qualifier);

      const provider = ProviderFactory.getProvider(inputs);
      await provider.login();
      cloneInputs.props.function.customContainerConfig.image = await provider.publish(imageId, qualifier);
    }

    cloneInputs.props.customDomains = await Domain.get(inputs);
    logger.debug(`transfrom props: ${JSON.stringify(cloneInputs.props, null, '  ')}`);

    const fcConfig = await (await this.getFc()).deploy(cloneInputs);

    const properties = inputs.props;
    if (deployType === 'nas') {
      await NasComponent.init(properties, _.cloneDeep(inputs));
      await NasComponent.remove(properties, _.cloneDeep(inputs));
    }

    const vm = spinner('Try container acceleration');
    const flag = await Fc.tryContainerAcceleration(credentials, fcConfig.region, fcConfig.service.name, fcConfig.function.name, fcConfig.function.customContainerConfig);

    if (fcConfig.customDomains && fcConfig.customDomains[0].domainName) {
      await requestDomains(fcConfig.customDomains[0].domainName);
    }

    if (flag) {
      vm.succeed();
    } else {
      vm.fail();
    }

    // 返回结果
    return {
      region: properties.region,
      serviceName: fcConfig.service.name,
      functionName: fcConfig.function.name,
      customDomains: fcConfig.customDomains?.map(({ domainName }) => domainName),
    };
  }

  async remove(inputs) {
    const apts = {
      boolean: ['help', 'assumeYes'],
      alias: { help: 'h', assumeYes: 'y' },
    };
    const comParse: ICommandParse = commandParse({ args: inputs.args }, apts);
    if (comParse.data?.help) {
      help(HELP);
      return;
    }
    const cloneInputs = _.cloneDeep(inputs);
    // @ts-ignore
    delete cloneInputs.Properties;

    cloneInputs.credentials = await this.getCredentials(inputs.credentials, inputs.project?.access);
    await getImageAndReport(cloneInputs, cloneInputs.credentials.AccountID, 'build');

    const deployType = await this.getDeployType();
    cloneInputs.props = ToFc.transform(cloneInputs.props, deployType);

    cloneInputs.props.customDomains = await Domain.get(inputs);
    logger.debug(`transfrom props: ${JSON.stringify(cloneInputs.props.customDomains)}`);
    cloneInputs.args = 'service';

    const { region } = inputs.props;
    const serviceName = inputs.props.service.name;
    const versions = await Fc.listVersions(cloneInputs.credentials, region, serviceName);
    for (const { versionId } of versions) {
      await this.unpublish({
        project: inputs.project,
        args: `--version ${versionId}`,
        props: {
          region,
          service: { name: serviceName },
        },
      });
    }

    return (await this.getFc()).remove(cloneInputs);
  }

  async build(inputs) {
    inputs.credentials = await this.getCredentials(inputs.credentials, inputs.project?.access);
    await getImageAndReport(inputs, inputs.credentials.AccountID, 'build');

    const builds = await loadComponent('devsapp/fc-build');
    inputs.project.component = 'fc-build';
    inputs.props = ToBuild.transfromInputs(inputs.props);

    await builds.build(inputs);
  }

  async logs(inputs: IInputs) {
    if (!inputs.props.service?.logConfig) {
      throw new Error('To use this function, you need to configure the log function in the service, please refer to https://github.com/devsapp/web-framework/blob/master/readme.md#service');
    }

    inputs.credentials = await this.getCredentials(inputs.credentials, inputs.project?.access);
    await getImageAndReport(inputs, inputs.credentials.AccountID, 'logs');

    const inputsLogs = await ToLogs.transform(_.cloneDeep(inputs));
    const logs = await loadComponent('devsapp/logs');

    await logs.logs(inputsLogs);
  }

  async metrics(inputs: IInputs) {
    inputs.credentials = await this.getCredentials(inputs.credentials, inputs.project?.access);

    await getImageAndReport(inputs, inputs.credentials.AccountID, 'metrics');

    const inputsMetrics = await ToMetrics.transform(_.cloneDeep(inputs));
    const metrics = await loadComponent('devsapp/fc-metrics');
    await metrics.metrics(inputsMetrics);
  }

  async info(inputs: IInputs) {
    inputs.credentials = await this.getCredentials(inputs.credentials, inputs.project?.access);

    await getImageAndReport(inputs, inputs.credentials.AccountID, 'metrics');

    const inputsInfo = await ToInfo.transform(_.cloneDeep(inputs));
    const info = await loadComponent('devsapp/fc-info');
    return await info.info(inputsInfo);
  }

  async cp(inputs: IInputs) {
    const credentials = await this.getCredentials(inputs.credentials, inputs.project?.access);
    await getImageAndReport(inputs, credentials.AccountID, 'cp');

    await NasComponent.cp(inputs.props, _.cloneDeep(inputs));
  }

  async ls(inputs: IInputs) {
    const credentials = await this.getCredentials(inputs.credentials, inputs.project?.access);
    await getImageAndReport(inputs, credentials.AccountID, 'ls');

    await NasComponent.ls(inputs.props, _.cloneDeep(inputs));
  }

  async rm(inputs: IInputs) {
    const credentials = await this.getCredentials(inputs.credentials, inputs.project?.access);
    await getImageAndReport(inputs, credentials.AccountID, 'rm');

    await NasComponent.rm(inputs.props, _.cloneDeep(inputs));
  }

  async command(inputs: IInputs) {
    const credentials = await this.getCredentials(inputs.credentials, inputs.project?.access);
    await getImageAndReport(inputs, credentials.AccountID, 'command');

    await NasComponent.command(inputs.props, _.cloneDeep(inputs));
  }

  private async getCredentials(credentials: ICredentials, access: string) {

    return _.isEmpty(credentials) ? await getCredential(access) : credentials;
  }

  private async getDeployType() {
    const fcDefault = await loadComponent('devsapp/fc-default');
    return await fcDefault.get({ args: 'web-framework' });
  }

  private async getFc() {
    return await loadComponent('devsapp/fc-deploy');
  }
}
