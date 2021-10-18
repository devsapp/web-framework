import * as core from '@serverless-devs/core';
import path from 'path';
import fse from 'fs-extra';
import axios from 'axios';
import logger from '../common/logger';

export const isDebug = process.env?.temp_params?.includes('--debug');

export async function getSrc(code, serviceName: string, functionName: string, sYaml: string): Promise<string> {
  const baseDir = sYaml ? path.dirname(sYaml) : process.cwd();
  const buildCodeUri = path.join(
    baseDir,
    '.s',
    'build',
    'artifacts',
    serviceName,
    functionName,
  );

  if (await fse.pathExists(buildCodeUri)) {
    const statusId = `${serviceName}-${functionName}-build`;
    const statusPath = path.join(baseDir, '.s', 'fc-build');
    const { status } = await core.getState(statusId, statusPath) || {};
    if (status === 'unavailable') {
      throw new Error(`${serviceName}/${functionName} build status is unavailable.Please re-execute 's build'`);
    }
    return buildCodeUri;
  }

  return code.src;
}

export async function requestDomains(domainName) {
  try {
    logger.debug(`Request domains http://${domainName}`);
    await axios.get(`http://${domainName}`, { timeout: 15 * 1000 });
  } catch (ex) {
    logger.debug(ex.toString());
  }
}

export async function checkUriIsFile(uri: string) {
  if (!(await fse.pathExists(uri))) {
    return false;
  }

  return (await fse.lstat(uri)).isFile();
}
