import * as core from '@serverless-devs/core';
import _ from 'lodash';
import fse from 'fs-extra';
import { CONTEXT } from '../../constant';
import { IDomain } from './interface';
import { IProperties, IInputs } from '../../interface/inputs';
import { isAuto } from '../utils';


async function readCertFile (filePath: string = '') {
  if (await fse.pathExists(filePath)) {
    if (filePath.endsWith('.pom')) {
      throw new Error(``);
    }

    const cert = await fse.readFile(filePath, 'utf-8');
    
    if (cert.endsWith('\n')) {
      return cert.slice(0, -2)
    }
    return cert;
  }

  return filePath;
}

export default class Component {
  @core.HLogger(CONTEXT) static logger: core.ILogger;

  static async get(inputs: IInputs): Promise<IDomain[]> {
    const { customDomains, service, function: functionConfig }: IProperties = inputs.props;
    const serviceName = service.name;
    const functionName = functionConfig.name || serviceName;

    if (!customDomains) {
      this.logger.info('The configuration of the domain name is not detected, and a temporary domain name is generated.');
      const domainName = await this.getAutoDomain(inputs, serviceName, functionName);

      return [{
        domainName,
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
      throw new Error('customDomains configuration error.');
    }

    let domain = '';
    const domainConfigs: IDomain[] = [];
    
    for (const domainConfig of customDomains) {
      const { domainName, protocol, routeConfigs = [], certConfig } = domainConfig;

      if (!domainName) {
        throw new Error('customDomains configuration domainName is need.');
      } else if (isAuto(domainName)) {
        this.logger.debug('It is detected that the domain configuration is auto.');

        if (protocol !== 'HTTP') {
          this.logger.warn('Temporary domain name only supports http protocol.');
        }
        if (!domain) {
          this.logger.debug('domain name is generated.');
          domain = await this.getAutoDomain(inputs, serviceName, functionName);
        } else {
          this.logger.warn(`Multiple domainName: ${domain}`);
        }
        
        domainConfigs.push({
          domainName: domain,
          protocol: 'HTTP',
          routeConfigs: routeConfigs.map(item => ({
            serviceName,
            functionName,
            qualifier: 'LATEST',
            methods: ['GET', 'POST'],
            path: '/*',
            ...item
          })),
        });
      } else {
        domainConfig.routeConfigs = routeConfigs.map(item => ({ serviceName, functionName, ...item }))
        if (certConfig) {
          certConfig.certificate = await readCertFile(certConfig.certificate);
          certConfig.privateKey = await readCertFile(certConfig.privateKey);

          domainConfig.certConfig = certConfig;
        }
        // @ts-ignore: serviceName 和 functionName 已经被赋值
        domainConfigs.push(domainConfig);
      }
    }

    return domainConfigs;
  }

  static async getAutoDomain(inputs: IInputs, serviceName: string, functionName: string): Promise<string> {
    const domainComponent = await core.loadComponent('alibaba/domain');

    return await domainComponent.get({
      ...inputs,
      props: {
        type: 'fc',
        user: inputs.credentials.AccountID,
        region: inputs.props.region,
        service: serviceName,
        function: functionName,
      }
    });
  }
}
