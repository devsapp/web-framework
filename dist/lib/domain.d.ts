import * as core from '@serverless-devs/core';
interface IDomain {
    domainName: string;
    protocol: 'HTTP' | 'HTTP,HTTPS';
    routeConfigs: Array<{
        serviceName: string;
        functionName: string;
        qualifier: string;
        methods: string[];
        path: string;
    }>;
}
export default class Component {
    static logger: core.ILogger;
    static get(inputs: any): Promise<IDomain[]>;
    static getAutoDomain(inputs: any, serviceName: string, functionName: string): Promise<string>;
}
export {};
