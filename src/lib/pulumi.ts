import path from 'path';
import * as fse from 'fs-extra';
import { Logger, IV1Inputs } from '@serverless-devs/core';
import { CONTEXT } from '../constant';

const PULUMI_CODE_DIR: string = path.join(__dirname, 'pulumi-fc');
const PULUMI_CODE_FILE: string = path.join(PULUMI_CODE_DIR, 'index.js');
const PULUMI_PACKAGE_FILE: string = path.join(PULUMI_CODE_DIR, 'package.json');
const PULUMI_PACKAGE_LOCK_FILE: string = path.join(PULUMI_CODE_DIR, 'package-lock.json');

export async function cpPulumiCodeFiles(targetDir) {
  Logger.debug(CONTEXT, `Coping files under ${PULUMI_CODE_DIR} to ${targetDir}`);

  await fse.copy(PULUMI_CODE_FILE, path.join(targetDir, path.basename(PULUMI_CODE_FILE)), {
    overwrite: true,
  });

  await fse.copy(PULUMI_PACKAGE_FILE, path.join(targetDir, path.basename(PULUMI_PACKAGE_FILE)), {
    overwrite: true,
  });

  await fse.copy(
    PULUMI_PACKAGE_LOCK_FILE,
    path.join(targetDir, path.basename(PULUMI_PACKAGE_LOCK_FILE)),
    { overwrite: true },
  );

  Logger.debug(CONTEXT, `Copy files under ${PULUMI_CODE_DIR} to ${targetDir} done.`);
}

export function genPulumiInputs(
  credentials: any,
  project: any,
  stackId: string,
  region: string,
  pulumiStackDirOfService: string,
): IV1Inputs {
  const inputs = Object.assign(
    {},
    {
      Credentials: credentials,
      Project: project,
      Properties: {
        region,
        projectName: stackId,
        stackName: stackId,
        workDir: pulumiStackDirOfService,
        runtime: 'nodejs',
        cloudPlatform: 'alicloud',
      },
      Args: '',
    },
  );

  return inputs;
}
