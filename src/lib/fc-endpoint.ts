import * as core from '@serverless-devs/core';

export default class FcEndpoint {
  static endpoint: string;

  static async getFcEndpoint() {
    const fcDefault = await core.loadComponent('devsapp/fc-default');
    const fcEndpoint: string = await fcDefault.get({ args: 'fc-endpoint' });
    if (!fcEndpoint) { return undefined; }
    const enableFcEndpoint: any = await fcDefault.get({ args: 'enable-fc-endpoint' });
    const endpoint = (enableFcEndpoint === true || enableFcEndpoint === 'true') ? fcEndpoint : undefined;
    this.endpoint = endpoint;
    return endpoint;
  }
}
