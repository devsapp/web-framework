import _ from 'lodash';
import path from 'path';
import logger from '../common/logger';
import { HTTP_CONFIG } from '../constant';
import { ICredentials } from '../interface/inputs';
import { getSrc, checkUriIsFile } from './utils';

export default class ToFc {
  protected props: any;
  protected args: string;
  protected path: { configPath: string };
  protected credentials: ICredentials;
  protected command: string;
  protected project: {
    component?: string;
    access: string;
    projectName: string;
  };
  protected appName: string;

  constructor(inputs, credentials) {
    this.props = inputs.props;
    this.args = inputs.args;
    this.path = inputs.path;
    this.command = inputs.command;
    this.project = inputs.project;
    this.appName = inputs.appName;
    this.credentials = credentials;
  }

  async getDeployNasArgs() {
    const { nasConfig, name } = this.props.service;
    const {
      name: functionName = name,
      code,
    } = this.props.function;

    let fcDir = `/mnt/auto/${functionName}`;
    if (!(_.isEmpty(nasConfig) || ['auto', 'Auto'].includes(nasConfig))) {
      fcDir = nasConfig.mountPoints?.[0]?.fcDir;
      if (_.isNil(fcDir) || !_.isString(fcDir)) {
        throw new Error('Cannot find the fcDir configuration with subscript 0 in mountPoints of nasConfig,, please refer to https://help.aliyun.com/document_detail/295899.html#h3-url-4');
      }
    }

    const codeUri = await getSrc(code, name, functionName, this.path?.configPath);

    // 如果是文件，则需要先创建目录，然后再上传文件
    if (await checkUriIsFile(codeUri)) {
      const basename = path.basename(codeUri);
      const fcTargetDir = fcDir.endsWith('/') ? `${fcDir}${basename}` : `${fcDir}/${basename}`;
      return {
        args: `upload ${codeUri} ${fcTargetDir}`,
        mkdirArgs: `command mkdir -p /${fcDir}`,
      };
    }
    // 如果是文件夹，则可以直接上传
    return { args: `upload -r ${codeUri} ${fcDir}` };
  }

  transform(command: string, deployType?: string): any {
    delete this.props.runtime;

    const service = this.service(this.props.service, deployType);
    logger.debug(`service: ${JSON.stringify(service)}`);

    const serviceName = service.name;

    const functionConfig = this.function(serviceName, this.props.function);
    logger.debug(`function: ${JSON.stringify(functionConfig)}`);

    // trigger 和 triggers 都支持，但是 triggers 优先级大于 trigger
    const triggers = this.triggers(serviceName, this.props.triggers || this.props.trigger);
    logger.debug(`triggers: ${JSON.stringify(triggers)}`);

    const customDomains = this.customDomains(serviceName, functionConfig.name, this.props.customDomains);
    logger.debug(`customDomains: ${JSON.stringify(customDomains)}`);

    return {
      command,
      args: this.args,
      path: this.path,
      project: this.project,
      appName: this.appName,
      credentials: this.credentials,
      props: {
        service,
        triggers,
        customDomains,
        region: this.props.region,
        function: functionConfig,
      },
    };
  }

  private service(service, deployType) {
    if (!service.name) {
      throw new Error('service.name required.');
    }

    if (deployType === 'container') {
      return service;
    }

    // 如果用户没有配置则默认为 auto
    return {
      vpcConfig: 'auto',
      nasConfig: 'auto',
      ...service,
    };
  }

  private function(serviceName, functionConfig) {
    const defaultConfig = {
      name: serviceName,
      caPort: 9000,
      timeout: 60,
      memorySize: 1024,
      handler: 'index.handler',
      customContainerConfig: {},
      codeUri: functionConfig?.code?.src,
    };
    return _.merge(defaultConfig, functionConfig, { runtime: 'custom-container' });
  }

  private triggers(serviceName, triggerConfig) {
    // 如果触发器是数组，不处理，直接跳过
    if (_.isArray(triggerConfig)) {
      return triggerConfig;
    }

    // 如果没有触发器
    if (_.isEmpty(triggerConfig)) {
      return [{
        name: serviceName,
        type: 'http',
        config: HTTP_CONFIG,
      }];
    }

    // 否则则认为是有且仅有一个触发器
    if (_.isObject(triggerConfig)) {
      return [{
        name: serviceName,
        ...triggerConfig,
      }];
    }

    throw new Error('The trigger configuration is abnormal, please refer to https://help.aliyun.com/document_detail/295899.html#title-1h1-81l-g6i');
  }

  private customDomains(serviceName, functionName, customDomains) {
    if (_.isEmpty(customDomains)) {
      logger.info('The configuration of the domain name is not detected, and a temporary domain name is generated.');

      return [{
        domainName: 'auto',
        protocol: 'HTTP',
        routeConfigs: [
          {
            serviceName,
            functionName,
            qualifier: 'LATEST',
            methods: ['GET', 'POST'],
            path: '/*',
          },
        ],
      }];
    }

    if (!_.isArray(customDomains)) {
      throw new Error('The customDomains configuration is abnormal, please refer to https://help.aliyun.com/document_detail/295899.html#title-coh-jxb-9op');
    }

    return customDomains;
  }
}
