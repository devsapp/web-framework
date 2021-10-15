import * as core from '@serverless-devs/core';
import logger from '../common/logger';

export default class FcFunction {
  static async tryContainerAcceleration(inputs, serviceName, functionName, customContainerConfig) {
    const fcCommon = await core.loadComponent('devsapp/fc-common');
    const fc = await fcCommon.makeFcClient(inputs);

    try {
      await fc.updateFunction(serviceName, functionName, {
        customContainerConfig: {
          accelerationType: 'Default',
          ...customContainerConfig,
        },
      });
      logger.debug('Try container acceleration success.');
      return true;
    } catch (ex) {
      logger.debug(`Try container acceleration error: ${ex}`);
      return false;
    }
  }
}
