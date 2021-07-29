import logger from '../../common/logger';
import { HTTP_CONFIG } from '../../constant';

export default class ToFc {
  static transform(props, deployType?) {
    delete props.runtime;

    const service = this.service(props.service, deployType);
    logger.debug(`service: ${JSON.stringify(service)}`);
    const functionConfig = this.function(service.name, props.function);
    logger.debug(`function: ${JSON.stringify(functionConfig)}`);
    const triggers = this.triggers(service.name, props.trigger);

    return {
      service,
      triggers,
      region: props.region,
      function: functionConfig,
    };
  }

  static service(service, deployType) {
    if (!service.name) {
      throw new Error('service.name required.');
    }
    if (deployType === 'container') {
      return { ...service };
    } else {
      return {
        vpcConfig: 'auto',
        nasConfig: 'auto',
        ...service,
      };
    }
  }

  static function(serviceName, functionConfig) {
    delete functionConfig.code;

    const {
      caPort,
      handler,
      memorySize,
      timeout,
      name,
    } = functionConfig;

    functionConfig.name = name || serviceName;
    functionConfig.caPort = caPort || 9000;
    functionConfig.timeout = timeout || 60;
    functionConfig.memorySize = memorySize || 1024;
    functionConfig.handler = handler || 'index.handler';
    functionConfig.runtime = 'custom-container';
    return functionConfig;
  }

  static triggers(serviceName, triggerConfig) {
    if (!triggerConfig) {
      return [{
        name: serviceName,
        type: 'http',
        config: HTTP_CONFIG,
      }];
    }

    return [{
      name: serviceName,
      ...triggerConfig,
    }];
  }
}
