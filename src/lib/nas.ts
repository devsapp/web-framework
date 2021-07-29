import * as core from '@serverless-devs/core';
import _ from 'lodash';
import path from 'path';
import fse from 'fs-extra';
import Client from './client';
import { ICredentials, IProperties, IInputs } from '../interface/inputs';
import logger from '../common/logger';

interface ISrc {
  src: string;
  excludes?: string[];
}

export default class Component {
  static async getSrc(code: ISrc, serviceName: string, functionName: string): Promise<string> {
    const buildCodeUri = path.join(
      process.cwd(),
      '.s',
      'build',
      'artifacts',
      serviceName,
      functionName,
    );

    if (await fse.pathExists(buildCodeUri)) {
      return buildCodeUri;
    }

    return code.src;
  }

  static async init(properties: IProperties, v1Inputs: IInputs) {
    const serviceName = properties.service.name;
    const functionName = properties.function.name || serviceName;
    const src = await this.getSrc(
      properties.function.code,
      serviceName,
      functionName,
    );
    logger.info(`nas component get src is: ${src}`);

    const { inputs, nas } = await this.transfromInputs(properties, v1Inputs);

    await nas.deploy(inputs);

    if (src) {
      inputs.args = `-r ${src} nas:///${inputs.props.nasDir}/${functionName}`;
      logger.debug(`Cp cmd is: ${inputs.args}`);
      await nas.cp(inputs);
    }

    return inputs.props;
  }

  static async remove(properties: IProperties, v1Inputs: IInputs) {
    const { inputs, nas } = await this.transfromInputs(properties, v1Inputs);

    logger.debug(`Remove cmd is: ${inputs.args}`);
    await nas.remove(inputs);
  }

  static async cp(properties: IProperties, v1Inputs: IInputs) {
    const { inputs, nas } = await this.transfromInputs(properties, v1Inputs);
    logger.debug(`Cp cmd is: ${inputs.args}`);

    await nas.cp(inputs);
  }

  static async ls(properties: IProperties, v1Inputs: IInputs) {
    const { inputs, nas } = await this.transfromInputs(properties, v1Inputs);

    logger.debug(`Ls cmd is: ${inputs.args}`);
    await nas.ls(inputs);
  }

  static async rm(properties: IProperties, v1Inputs: IInputs) {
    const { inputs, nas } = await this.transfromInputs(properties, v1Inputs);
    logger.debug(`Rm cmd is: ${inputs.args}`);
    await nas.rm(inputs);
  }

  static async command(properties: IProperties, v1Inputs: IInputs) {
    const { inputs, nas } = await this.transfromInputs(properties, v1Inputs);
    logger.debug(`Command cmd is: ${inputs.args}`);
    await nas.command(inputs);
  }

  static async transfromInputs(properties: IProperties, inputs: IInputs) {
    const { region } = properties;
    const serviceName = properties.service.name;
    const { excludes } = properties.function.code || {};

    const credentials: ICredentials = await core.getCredential(inputs.project.access);
    const nasProperties = await this.getNasProperties(
      region,
      serviceName,
      credentials,
      excludes,
    );
    logger.debug(`Nas properties is: ${JSON.stringify(nasProperties)}`);

    inputs.project.component = 'nas';

    const nas = await core.loadComponent('devsapp/nas');

    return {
      nas,
      inputs: {
        ...inputs,
        props: nasProperties,
      },
    };
  }

  static async getNasProperties(
    regionId: string,
    serviceName: string,
    credentials: ICredentials,
    excludes: undefined | string[],
  ) {
    const fc = Client.fc(regionId, credentials);
    const {
      data: { role, vpcConfig, nasConfig },
    } = await fc.getService(serviceName);

    const { vpcId, vSwitchIds, securityGroupId } = vpcConfig;

    if (!vpcId) {
      throw new Error(`Service ${serviceName} is configured for query to vpc`);
    }

    const { userId, groupId, mountPoints } = nasConfig;
    if (_.isEmpty(mountPoints)) {
      throw new Error(`Service ${serviceName} is configured for query to nas`);
    }
    const [mountPointDomain, nasDir] = mountPoints[0].serverAddr.split(':/');

    return {
      regionId,
      serviceName: `_FC_NAS_${serviceName}`,
      description: `service for fc nas used for service ${serviceName}`,
      vpcId,
      vSwitchId: vSwitchIds[0],
      securityGroupId,
      role,
      userId,
      groupId,
      mountPointDomain,
      nasDir,
      excludes,
    };
  }
}
