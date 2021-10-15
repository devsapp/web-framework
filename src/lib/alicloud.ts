import * as core from '@serverless-devs/core';
import popCore from '@alicloud/pop-core';
import logger from '../common/logger';
import { spawnSync } from 'child_process';
import { isDebug } from './utils';
import { ICredentials } from '../interface/inputs';

export default class AliCloud {
  protected namespace;
  protected apiClient;
  protected region;
  private credentials;

  constructor(region: string, namespace: string, credentials: ICredentials) {
    this.region = region || 'cn-hangzhou';
    this.credentials = credentials;
    this.namespace = namespace.toLowerCase();
    this.initApiClient();
  }

  async login() {
    const tempLoginInfo = await this.getTempLoginUserInfo();
    if (tempLoginInfo.data) {
      const { tempUserName, authorizationToken } = tempLoginInfo.data;

      const command = `docker login -u ${tempUserName} -p ${authorizationToken} registry.${this.region}.aliyuncs.com `;
      const vm = isDebug ? undefined : core.spinner(`Run: ${command}`);
      spawnSync(command, [], {
        cwd: './',
        stdio: isDebug ? 'inherit' : 'ignore',
        shell: true,
      });
      vm?.stop();
    }
  }

  async init(projectName: string) {
    const namespaceData = await this.getNameSpace();
    const namespaceNameList = namespaceData.data?.namespaces?.map((data) => data.namespace) || [];
    if (!namespaceNameList.includes(this.namespace)) {
      logger.info(`Creating namespace: ${this.namespace}`);
      // 这里容易会触发一个问题，容器镜像服务命名空间仅能创建三个
      await this.createNameSpace(this.namespace).catch((e) => {
        if (e.message?.includes('NAMESPACE_LIMIT_EXCEED')) {
          const error = new Error(`Your namespace has exceeded the usage limit, you can use ${namespaceNameList.join(',')}`);
          error.name = 'NAMESPACE_LIMIT_EXCEED';
          throw error;
        }
        throw e;
      });
    } else {
      logger.info(`Using namespace: ${this.namespace}`);
    }

    const repoResult = await this.getRepos().catch((e) => logger.debug(e.toString()));
    const repos: any[] = repoResult?.data?.repos.map((item) => item.repoName) || [];
    if (!repos.includes(projectName)) {
      logger.info(`Creating repo: ${projectName}`);
      await this.createRepo(projectName).catch((e) => { throw e; });
    } else {
      logger.info(`Using repo: ${projectName}`);
    }
  }

  private getNameSpace() {
    return this.requestApi('/namespace');
  }

  private async createNameSpace(name) {
    const body = {
      Namespace: {
        namespace: name,
      },
    };
    return this.requestApi('/namespace', 'PUT', JSON.stringify(body));
  }

  private async getTempLoginUserInfo() {
    return this.requestApi('/tokens');
  }

  private async createRepo(name) {
    const body = {
      Repo: {
        RepoNamespace: this.namespace,
        RepoName: name,
        Summary: 'serverless devs',
        Detail: 'serverless devs',
        RepoType: 'PRIVATE',
      },
    };
    return this.requestApi('/repos', 'PUT', JSON.stringify(body));
  }

  private async getRepos() {
    return this.requestApi('/repos');
  }

  private async requestApi(path, method = 'GET', body = '{}', option = {}) {
    const httpMethod = method;
    const uriPath = path;
    const queries = {};
    const headers = {
      'Content-Type': 'application/json',
    };

    try {
      return await this.apiClient.request(httpMethod, uriPath, queries, body, headers, option);
    } catch (ex) {
      const {
        code,
        statusCode,
        result,
      } = ex;
      const newError = new Error(`Code: ${result.code}, Message: ${result.message}`);
      newError.name = code || statusCode;
      newError.stack = ex.stack;
      // @ts-ignore: 保留原有的参数
      newError.code = statusCode;
      // @ts-ignore: 保留原有的参数
      newError.result = result;

      throw newError;
    }
  }

  private initApiClient() {
    if (!this.apiClient) {
      const { AccessKeyID, AccessKeySecret } = this.credentials;
      const _popCore = popCore as any;
      this.apiClient = new _popCore.ROAClient({
        accessKeyId: AccessKeyID,
        accessKeySecret: AccessKeySecret,
        endpoint: `https://cr.${this.region || 'cn-hangzhou'}.aliyuncs.com`,
        apiVersion: '2016-06-07',
      });
    }
    return this.apiClient;
  }
}
