import fse from 'fs-extra';
import inquirer from 'inquirer';
import axios from 'axios';
import retry from 'promise-retry';
import { CONTEXT, STORENAME, CONTEXT_NAME } from '../constant';
import { ILogConfig } from '../interface/service';
import { IInputs } from '../interface/inputs';
import { Logger, reportComponent, request } from '@serverless-devs/core';
import _ from 'lodash';

export const isDebug = process.env?.temp_params?.includes('--debug');

export async function promiseRetry(fn: any): Promise<any> {
  const retryOptions = {
    retries: 2,
    factor: 2,
    minTimeout: 1 * 1000,
    randomize: true,
  };
  return retry(fn, retryOptions);
}

export function genStackId(accountId: string, region: string, serviceName: string): string {
  return `${accountId}-${region}-${serviceName}`;
}

export async function isFile(inputPath: string): Promise<boolean> {
  if (!await fse.pathExists(inputPath)) {
    return false;
  }
  const stats = await fse.lstat(inputPath);
  return stats.isFile();
}

export async function isDir(inputPath) {
  const stats = await fse.lstat(inputPath);
  return stats.isDirectory();
}

export async function writeStrToFile(
  targetFile: string,
  content: string,
  flags?: string,
  mode?: number,
): Promise<void> {
  return new Promise((resolve, reject) => {
    const ws = fse.createWriteStream(targetFile, { flags, mode });
    ws.write(content);
    ws.end();
    ws.on('finish', () => resolve());
    ws.on('error', (error) => {
      Logger.error(CONTEXT, `${targetFile} write error: ${error}`);
      reject(error);
    });
  });
}

export async function delFunctionInConfFile(
  targetFile: string,
  content: any,
  flags?: string,
  mode?: number,
): Promise<boolean> {
  const { functionName } = content;
  const config = await fse.readJSON(targetFile);

  delete config.functions[functionName];

  if (!_.isEmpty(config.functions)) {
    await writeStrToFile(targetFile, JSON.stringify(config, null, '  '), flags, mode);
    return false;
  }

  return true;
}

function isInteractiveEnvironment(): boolean {
  return process.stdin.isTTY;
}

export async function promptForConfirmContinue(message: string): Promise<boolean> {
  if (!isInteractiveEnvironment()) {
    return true;
  }
  // if (detectMocha()) { return true; }

  const answers = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'ok',
      message,
    },
  ]);

  if (answers.ok) {
    return true;
  }
  return false;
}

export function isAuto(arg: any): arg is 'auto' | 'Auto' {
  return arg === 'auto' || arg === 'Auto';
}

export function getLogConfig(logConfig: 'auto' | 'Auto' | ILogConfig, autoName: string) {
  if (isAuto(logConfig)) {
    return {
      project: autoName.toLocaleLowerCase().replace(/_/g, '-'),
      logstore: STORENAME,
    };
  }

  if (logConfig?.project && logConfig?.logstore) {
    return logConfig;
  }

  throw new Error('service/logConfig configuration error');
}

export async function requestDomains(domainName) {
  try {
    Logger.debug(CONTEXT, `Request domains http://${domainName}`);
    await axios.get(`http://${domainName}`, { timeout: 15 * 1000 });
  } catch (ex) {
    Logger.debug(CONTEXT, ex.toString());
  }
}

export async function getImageAndReport(inputs: IInputs, uid: string, command: string) {
  reportComponent(CONTEXT_NAME, { command, uid });

  Logger.debug(CONTEXT, `get image customContainerConfig: ${JSON.stringify(inputs.props.function.customContainerConfig)}, runtime: ${inputs.props.runtime}, region: ${inputs.props.region}.`);
  if (!inputs.props.function.customContainerConfig?.image) {
    const { image } = await request('https://registry.devsapp.cn/registry/image', {
      method: 'post',
      body: {
        region: inputs.props.region,
        runtime: inputs.props.runtime === 'php7.2' ? 'php7' : inputs.props.runtime,
      },
      form: true,
    });
    Logger.debug(CONTEXT, `auto image is ${image}.`);
    // @ts-ignore
    inputs.props.function.customContainerConfig || (inputs.props.function.customContainerConfig = {});
    inputs.props.function.customContainerConfig.image = image;
  }

  return inputs;
}
