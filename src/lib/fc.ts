import Client from './client';
import logger from '../common/logger';

export default class Component {
  static async listVersions(profile, region: string, serviceName: string) {
    const fc = Client.fc(region, profile);

    return (await fc.listVersions(serviceName)).data.versions;
  }

  static async publishVersion(profile, region: string, serviceName: string, description?) {
    const fc = Client.fc(region, profile);

    return (await fc.publishVersion(serviceName, description)).data;
  }

  static async deleteVersion(profile, region: string, serviceName: string, versionId) {
    const fc = Client.fc(region, profile);

    return (await fc.deleteVersion(serviceName, versionId)).data;
  }

  static async tryContainerAcceleration(profile, region: string, serviceName: string, functionName: string, customContainerConfig) {
    if (!serviceName || !customContainerConfig) {
      return;
    }

    const fc = Client.fc(region, profile);
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
