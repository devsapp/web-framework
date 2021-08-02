import { IInputs } from './interface/inputs';
export default class Component {
    publish(inputs: any): Promise<any>;
    unpublish(inputs: any): Promise<any>;
    deploy(inputs: any): Promise<{
        region: any;
        serviceName: any;
        functionName: any;
        customDomains: any;
    }>;
    remove(inputs: any): Promise<any>;
    build(inputs: any): Promise<void>;
    logs(inputs: IInputs): Promise<void>;
    metrics(inputs: IInputs): Promise<void>;
    info(inputs: IInputs): Promise<any>;
    cp(inputs: IInputs): Promise<void>;
    ls(inputs: IInputs): Promise<void>;
    rm(inputs: IInputs): Promise<void>;
    command(inputs: IInputs): Promise<void>;
    private getCredentials;
    private getDeployType;
    private getFc;
}
