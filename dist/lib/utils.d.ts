import { ILogConfig } from '../interface/service';
export declare function genStackId(accountId: string, region: string, serviceName: string): string;
export declare function isFile(inputPath: string): Promise<boolean>;
export declare function isDir(inputPath: any): Promise<boolean>;
export declare function writeStrToFile(targetFile: string, content: string, flags?: string, mode?: number): Promise<void>;
export declare function promptForConfirmContinue(message: string): Promise<boolean>;
export declare function isAuto(arg: any): arg is 'auto' | 'Auto';
export declare function getLogConfig(logConfig: 'auto' | 'Auto' | ILogConfig, autoName: string): ILogConfig;