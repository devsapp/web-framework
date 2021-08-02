"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-await-in-loop */
/* eslint-disable max-len */
var core_1 = require("@serverless-devs/core");
var lodash_1 = __importDefault(require("lodash"));
var constant_1 = require("./constant");
var to_logs_1 = __importDefault(require("./lib/transform/to-logs"));
var to_metrics_1 = __importDefault(require("./lib/transform/to-metrics"));
var to_fc_1 = __importDefault(require("./lib/transform/to-fc"));
var to_build_1 = __importDefault(require("./lib/transform/to-build"));
var to_info_1 = __importDefault(require("./lib/transform/to-info"));
var fc_endpoint_1 = __importDefault(require("./lib/fc-endpoint"));
var generate_dockerfile_1 = __importDefault(require("./lib/generate-dockerfile"));
var factory_1 = __importDefault(require("./lib/providers/factory"));
var nas_1 = __importDefault(require("./lib/nas"));
var fc_1 = __importDefault(require("./lib/fc"));
var utils_1 = require("./lib/utils");
var domain_1 = __importDefault(require("./lib/domain"));
var logger_1 = __importDefault(require("./common/logger"));
var Component = /** @class */ (function () {
    function Component() {
    }
    Component.prototype.publish = function (inputs) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var apts, comParse, deployType, credentials, region, serviceName, nextQualifier, versions, cloneInputs, imageId, provider, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        apts = {
                            boolean: ['help'],
                            string: ['description'],
                            alias: { help: 'h', description: 'd' },
                        };
                        comParse = core_1.commandParse({ args: inputs.args }, apts);
                        return [4 /*yield*/, this.getDeployType()];
                    case 1:
                        deployType = _e.sent();
                        if (deployType !== 'container') {
                            throw new Error('The verison capability currently only supports container.');
                        }
                        return [4 /*yield*/, this.getCredentials(inputs.credentials, (_a = inputs.project) === null || _a === void 0 ? void 0 : _a.access)];
                    case 2:
                        credentials = _e.sent();
                        inputs.credentials = credentials;
                        region = inputs.props.region;
                        serviceName = inputs.props.service.name;
                        return [4 /*yield*/, fc_1.default.listVersions(credentials, region, serviceName)];
                    case 3:
                        versions = _e.sent();
                        if (lodash_1.default.isEmpty(versions)) {
                            nextQualifier = 1;
                        }
                        else {
                            nextQualifier = versions.shift().versionId / 1 + 1;
                        }
                        logger_1.default.debug("next qualifier is " + nextQualifier + ".");
                        return [4 /*yield*/, utils_1.getImageAndReport(inputs, credentials.AccountID, 'publish')];
                    case 4:
                        inputs = _e.sent();
                        cloneInputs = lodash_1.default.cloneDeep(inputs);
                        cloneInputs.props = to_fc_1.default.transform(cloneInputs.props, deployType);
                        return [4 /*yield*/, generate_dockerfile_1.default(inputs, nextQualifier)];
                    case 5:
                        imageId = _e.sent();
                        provider = factory_1.default.getProvider(inputs);
                        return [4 /*yield*/, provider.login()];
                    case 6:
                        _e.sent();
                        _c = cloneInputs.props.function.customContainerConfig;
                        return [4 /*yield*/, provider.publish(imageId, nextQualifier)];
                    case 7:
                        _c.image = _e.sent();
                        logger_1.default.debug("custom container config image is " + cloneInputs.props.function.customContainerConfig.image);
                        _d = cloneInputs.props;
                        return [4 /*yield*/, domain_1.default.get(inputs)];
                    case 8:
                        _d.customDomains = _e.sent();
                        return [4 /*yield*/, this.getFc()];
                    case 9: return [4 /*yield*/, (_e.sent()).deploy(cloneInputs)];
                    case 10:
                        _e.sent();
                        return [4 /*yield*/, fc_1.default.publishVersion(credentials, region, serviceName, (_b = comParse.data) === null || _b === void 0 ? void 0 : _b.description)];
                    case 11: return [2 /*return*/, _e.sent()];
                }
            });
        });
    };
    Component.prototype.unpublish = function (inputs) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function () {
            var apts, comParse, credentials, region, serviceName;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        apts = {
                            boolean: ['help'],
                            string: ['version'],
                            alias: { help: 'h', version: 'v' },
                        };
                        comParse = core_1.commandParse({ args: inputs.args }, apts);
                        return [4 /*yield*/, this.getCredentials(inputs.credentials, (_a = inputs.project) === null || _a === void 0 ? void 0 : _a.access)];
                    case 1:
                        credentials = _d.sent();
                        inputs.credentials = credentials;
                        region = inputs.props.region;
                        serviceName = inputs.props.service.name;
                        logger_1.default.info("unpublish version " + region + "/" + serviceName + "." + ((_b = comParse.data) === null || _b === void 0 ? void 0 : _b.version));
                        return [4 /*yield*/, fc_1.default.deleteVersion(credentials, region, serviceName, (_c = comParse.data) === null || _c === void 0 ? void 0 : _c.version)];
                    case 2: return [2 /*return*/, _d.sent()];
                }
            });
        });
    };
    Component.prototype.deploy = function (inputs) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function () {
            var apts, comParse, credentials, cloneInputs, deployType, qualifier, imageId, provider, _d, _e, fcConfig, properties, vm, flag;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        apts = {
                            boolean: ['help', 'assumeYes'],
                            alias: { help: 'h', assumeYes: 'y' },
                        };
                        comParse = core_1.commandParse({ args: inputs.args }, apts);
                        if ((_a = comParse.data) === null || _a === void 0 ? void 0 : _a.help) {
                            core_1.help(constant_1.HELP);
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.getCredentials(inputs.credentials, (_b = inputs.project) === null || _b === void 0 ? void 0 : _b.access)];
                    case 1:
                        credentials = _f.sent();
                        inputs.credentials = credentials;
                        return [4 /*yield*/, utils_1.getImageAndReport(inputs, credentials.AccountID, 'deploy')];
                    case 2:
                        inputs = _f.sent();
                        cloneInputs = lodash_1.default.cloneDeep(inputs);
                        return [4 /*yield*/, this.getDeployType()];
                    case 3:
                        deployType = _f.sent();
                        cloneInputs.props = to_fc_1.default.transform(cloneInputs.props, deployType);
                        // @ts-ignore
                        delete cloneInputs.Properties;
                        if (!(deployType === 'container')) return [3 /*break*/, 7];
                        qualifier = "LATEST-" + new Date().getTime();
                        return [4 /*yield*/, generate_dockerfile_1.default(inputs, qualifier)];
                    case 4:
                        imageId = _f.sent();
                        provider = factory_1.default.getProvider(inputs);
                        return [4 /*yield*/, provider.login()];
                    case 5:
                        _f.sent();
                        _d = cloneInputs.props.function.customContainerConfig;
                        return [4 /*yield*/, provider.publish(imageId, qualifier)];
                    case 6:
                        _d.image = _f.sent();
                        _f.label = 7;
                    case 7:
                        _e = cloneInputs.props;
                        return [4 /*yield*/, domain_1.default.get(inputs)];
                    case 8:
                        _e.customDomains = _f.sent();
                        logger_1.default.debug("transfrom props: " + JSON.stringify(cloneInputs.props, null, '  '));
                        return [4 /*yield*/, this.getFc()];
                    case 9: return [4 /*yield*/, (_f.sent()).deploy(cloneInputs)];
                    case 10:
                        fcConfig = _f.sent();
                        properties = inputs.props;
                        if (!(deployType === 'nas')) return [3 /*break*/, 13];
                        return [4 /*yield*/, nas_1.default.init(properties, lodash_1.default.cloneDeep(inputs))];
                    case 11:
                        _f.sent();
                        return [4 /*yield*/, nas_1.default.remove(properties, lodash_1.default.cloneDeep(inputs))];
                    case 12:
                        _f.sent();
                        _f.label = 13;
                    case 13:
                        vm = core_1.spinner('Try container acceleration');
                        return [4 /*yield*/, fc_1.default.tryContainerAcceleration(credentials, fcConfig.region, fcConfig.service.name, fcConfig.function.name, fcConfig.function.customContainerConfig)];
                    case 14:
                        flag = _f.sent();
                        if (!(fcConfig.customDomains && fcConfig.customDomains[0].domainName)) return [3 /*break*/, 16];
                        return [4 /*yield*/, utils_1.requestDomains(fcConfig.customDomains[0].domainName)];
                    case 15:
                        _f.sent();
                        _f.label = 16;
                    case 16:
                        if (flag) {
                            vm.succeed();
                        }
                        else {
                            vm.fail();
                        }
                        // 返回结果
                        return [2 /*return*/, {
                                region: properties.region,
                                serviceName: fcConfig.service.name,
                                functionName: fcConfig.function.name,
                                customDomains: (_c = fcConfig.customDomains) === null || _c === void 0 ? void 0 : _c.map(function (_a) {
                                    var domainName = _a.domainName;
                                    return domainName;
                                }),
                            }];
                }
            });
        });
    };
    Component.prototype.remove = function (inputs) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var apts, comParse, cloneInputs, _c, deployType, _d, region, serviceName, versions, _i, versions_1, versionId;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        apts = {
                            boolean: ['help', 'assumeYes'],
                            alias: { help: 'h', assumeYes: 'y' },
                        };
                        comParse = core_1.commandParse({ args: inputs.args }, apts);
                        if ((_a = comParse.data) === null || _a === void 0 ? void 0 : _a.help) {
                            core_1.help(constant_1.HELP);
                            return [2 /*return*/];
                        }
                        cloneInputs = lodash_1.default.cloneDeep(inputs);
                        // @ts-ignore
                        delete cloneInputs.Properties;
                        _c = cloneInputs;
                        return [4 /*yield*/, this.getCredentials(inputs.credentials, (_b = inputs.project) === null || _b === void 0 ? void 0 : _b.access)];
                    case 1:
                        _c.credentials = _e.sent();
                        return [4 /*yield*/, utils_1.getImageAndReport(cloneInputs, cloneInputs.credentials.AccountID, 'build')];
                    case 2:
                        _e.sent();
                        return [4 /*yield*/, this.getDeployType()];
                    case 3:
                        deployType = _e.sent();
                        cloneInputs.props = to_fc_1.default.transform(cloneInputs.props, deployType);
                        _d = cloneInputs.props;
                        return [4 /*yield*/, domain_1.default.get(inputs)];
                    case 4:
                        _d.customDomains = _e.sent();
                        logger_1.default.debug("transfrom props: " + JSON.stringify(cloneInputs.props.customDomains));
                        cloneInputs.args = 'service';
                        region = inputs.props.region;
                        serviceName = inputs.props.service.name;
                        return [4 /*yield*/, fc_1.default.listVersions(cloneInputs.credentials, region, serviceName)];
                    case 5:
                        versions = _e.sent();
                        _i = 0, versions_1 = versions;
                        _e.label = 6;
                    case 6:
                        if (!(_i < versions_1.length)) return [3 /*break*/, 9];
                        versionId = versions_1[_i].versionId;
                        return [4 /*yield*/, this.unpublish({
                                project: inputs.project,
                                args: "--version " + versionId,
                                props: {
                                    region: region,
                                    service: { name: serviceName },
                                },
                            })];
                    case 7:
                        _e.sent();
                        _e.label = 8;
                    case 8:
                        _i++;
                        return [3 /*break*/, 6];
                    case 9: return [4 /*yield*/, this.getFc()];
                    case 10: return [2 /*return*/, (_e.sent()).remove(cloneInputs)];
                }
            });
        });
    };
    Component.prototype.build = function (inputs) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var _b, builds;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _b = inputs;
                        return [4 /*yield*/, this.getCredentials(inputs.credentials, (_a = inputs.project) === null || _a === void 0 ? void 0 : _a.access)];
                    case 1:
                        _b.credentials = _c.sent();
                        return [4 /*yield*/, utils_1.getImageAndReport(inputs, inputs.credentials.AccountID, 'build')];
                    case 2:
                        _c.sent();
                        return [4 /*yield*/, core_1.loadComponent('devsapp/fc-build')];
                    case 3:
                        builds = _c.sent();
                        inputs.project.component = 'fc-build';
                        inputs.props = to_build_1.default.transfromInputs(inputs.props);
                        return [4 /*yield*/, builds.build(inputs)];
                    case 4:
                        _c.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Component.prototype.logs = function (inputs) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var _c, inputsLogs, logs;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        if (!((_a = inputs.props.service) === null || _a === void 0 ? void 0 : _a.logConfig)) {
                            throw new Error('To use this function, you need to configure the log function in the service, please refer to https://github.com/devsapp/web-framework/blob/master/readme.md#service');
                        }
                        _c = inputs;
                        return [4 /*yield*/, this.getCredentials(inputs.credentials, (_b = inputs.project) === null || _b === void 0 ? void 0 : _b.access)];
                    case 1:
                        _c.credentials = _d.sent();
                        return [4 /*yield*/, utils_1.getImageAndReport(inputs, inputs.credentials.AccountID, 'logs')];
                    case 2:
                        _d.sent();
                        return [4 /*yield*/, to_logs_1.default.transform(lodash_1.default.cloneDeep(inputs))];
                    case 3:
                        inputsLogs = _d.sent();
                        return [4 /*yield*/, core_1.loadComponent('devsapp/logs')];
                    case 4:
                        logs = _d.sent();
                        return [4 /*yield*/, logs.logs(inputsLogs)];
                    case 5:
                        _d.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Component.prototype.metrics = function (inputs) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var _b, inputsMetrics, metrics;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _b = inputs;
                        return [4 /*yield*/, this.getCredentials(inputs.credentials, (_a = inputs.project) === null || _a === void 0 ? void 0 : _a.access)];
                    case 1:
                        _b.credentials = _c.sent();
                        return [4 /*yield*/, utils_1.getImageAndReport(inputs, inputs.credentials.AccountID, 'metrics')];
                    case 2:
                        _c.sent();
                        return [4 /*yield*/, to_metrics_1.default.transform(lodash_1.default.cloneDeep(inputs))];
                    case 3:
                        inputsMetrics = _c.sent();
                        return [4 /*yield*/, core_1.loadComponent('devsapp/fc-metrics')];
                    case 4:
                        metrics = _c.sent();
                        return [4 /*yield*/, metrics.metrics(inputsMetrics)];
                    case 5:
                        _c.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Component.prototype.info = function (inputs) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var _b, inputsInfo, info;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _b = inputs;
                        return [4 /*yield*/, this.getCredentials(inputs.credentials, (_a = inputs.project) === null || _a === void 0 ? void 0 : _a.access)];
                    case 1:
                        _b.credentials = _c.sent();
                        return [4 /*yield*/, utils_1.getImageAndReport(inputs, inputs.credentials.AccountID, 'metrics')];
                    case 2:
                        _c.sent();
                        return [4 /*yield*/, to_info_1.default.transform(lodash_1.default.cloneDeep(inputs))];
                    case 3:
                        inputsInfo = _c.sent();
                        return [4 /*yield*/, core_1.loadComponent('devsapp/fc-info')];
                    case 4:
                        info = _c.sent();
                        return [4 /*yield*/, info.info(inputsInfo)];
                    case 5: return [2 /*return*/, _c.sent()];
                }
            });
        });
    };
    Component.prototype.cp = function (inputs) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var credentials;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.getCredentials(inputs.credentials, (_a = inputs.project) === null || _a === void 0 ? void 0 : _a.access)];
                    case 1:
                        credentials = _b.sent();
                        return [4 /*yield*/, utils_1.getImageAndReport(inputs, credentials.AccountID, 'cp')];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, nas_1.default.cp(inputs.props, lodash_1.default.cloneDeep(inputs))];
                    case 3:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Component.prototype.ls = function (inputs) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var credentials;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.getCredentials(inputs.credentials, (_a = inputs.project) === null || _a === void 0 ? void 0 : _a.access)];
                    case 1:
                        credentials = _b.sent();
                        return [4 /*yield*/, utils_1.getImageAndReport(inputs, credentials.AccountID, 'ls')];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, nas_1.default.ls(inputs.props, lodash_1.default.cloneDeep(inputs))];
                    case 3:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Component.prototype.rm = function (inputs) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var credentials;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.getCredentials(inputs.credentials, (_a = inputs.project) === null || _a === void 0 ? void 0 : _a.access)];
                    case 1:
                        credentials = _b.sent();
                        return [4 /*yield*/, utils_1.getImageAndReport(inputs, credentials.AccountID, 'rm')];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, nas_1.default.rm(inputs.props, lodash_1.default.cloneDeep(inputs))];
                    case 3:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Component.prototype.command = function (inputs) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var credentials;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.getCredentials(inputs.credentials, (_a = inputs.project) === null || _a === void 0 ? void 0 : _a.access)];
                    case 1:
                        credentials = _b.sent();
                        return [4 /*yield*/, utils_1.getImageAndReport(inputs, credentials.AccountID, 'command')];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, nas_1.default.command(inputs.props, lodash_1.default.cloneDeep(inputs))];
                    case 3:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Component.prototype.getCredentials = function (credentials, access) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, fc_endpoint_1.default.getFcEndpoint()];
                    case 1:
                        _b.sent();
                        logger_1.default.debug("fc endpoint: " + fc_endpoint_1.default.endpoint);
                        if (!lodash_1.default.isEmpty(credentials)) return [3 /*break*/, 3];
                        return [4 /*yield*/, core_1.getCredential(access)];
                    case 2:
                        _a = _b.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        _a = credentials;
                        _b.label = 4;
                    case 4: return [2 /*return*/, _a];
                }
            });
        });
    };
    Component.prototype.getDeployType = function () {
        return __awaiter(this, void 0, void 0, function () {
            var fcDefault;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, core_1.loadComponent('devsapp/fc-default')];
                    case 1:
                        fcDefault = _a.sent();
                        return [4 /*yield*/, fcDefault.get({ args: 'web-framework' })];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Component.prototype.getFc = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, core_1.loadComponent('devsapp/fc-deploy')];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return Component;
}());
exports.default = Component;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxxQ0FBcUM7QUFDckMsNEJBQTRCO0FBQzVCLDhDQU0rQjtBQUMvQixrREFBdUI7QUFDdkIsdUNBQWtDO0FBRWxDLG9FQUE2QztBQUM3QywwRUFBbUQ7QUFDbkQsZ0VBQXlDO0FBQ3pDLHNFQUErQztBQUMvQyxvRUFBNkM7QUFFN0Msa0VBQTJDO0FBQzNDLGtGQUEyRDtBQUMzRCxvRUFBc0Q7QUFDdEQsa0RBQXFDO0FBQ3JDLGdEQUEwQjtBQUMxQixxQ0FBZ0U7QUFDaEUsd0RBQWtDO0FBQ2xDLDJEQUFxQztBQUVyQztJQUFBO0lBaVFBLENBQUM7SUFoUU8sMkJBQU8sR0FBYixVQUFjLE1BQU07Ozs7Ozs7d0JBQ1osSUFBSSxHQUFHOzRCQUNYLE9BQU8sRUFBRSxDQUFDLE1BQU0sQ0FBQzs0QkFDakIsTUFBTSxFQUFFLENBQUMsYUFBYSxDQUFDOzRCQUN2QixLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLFdBQVcsRUFBRSxHQUFHLEVBQUU7eUJBQ3ZDLENBQUM7d0JBQ0ksUUFBUSxHQUFRLG1CQUFZLENBQUMsRUFBRSxJQUFJLEVBQUUsTUFBTSxDQUFDLElBQUksRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDO3dCQUU3QyxxQkFBTSxJQUFJLENBQUMsYUFBYSxFQUFFLEVBQUE7O3dCQUF2QyxVQUFVLEdBQUcsU0FBMEI7d0JBRTdDLElBQUksVUFBVSxLQUFLLFdBQVcsRUFBRTs0QkFDOUIsTUFBTSxJQUFJLEtBQUssQ0FBQywyREFBMkQsQ0FBQyxDQUFDO3lCQUM5RTt3QkFFbUIscUJBQU0sSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsV0FBVyxRQUFFLE1BQU0sQ0FBQyxPQUFPLDBDQUFFLE1BQU0sQ0FBQyxFQUFBOzt3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