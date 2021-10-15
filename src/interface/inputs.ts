import { IServiceConfig } from './service';
import { IFunctionConfig } from './function';
import { ITriggerConfig } from './trigger';


export interface IInputs {
  props: IProperties;
  project: {
    component?: string;
    access: string;
    projectName?: string;
  };
  credentials?: any;
  appName: string;
  args: string;
  argsObj?: any;
  path: any;
}

export interface ICommandParse {
  rawData?: string;
  data?: ICommandData;
}

export interface ICommandData {
  help?: boolean;
  h?: boolean;
  assumeYes?: boolean;
  y?: boolean;
}

export interface ICredentials {
  AccountID: string;
  AccessKeyID: string;
  AccessKeySecret: string;
  SecurityToken?: string;
}

export interface IProperties {
  namespace?: string;
  runtime: string;
  region: string;
  service: IServiceConfig;
  function: IFunctionConfig;
  trigger: ITriggerConfig;
  customDomains?: string;
}
