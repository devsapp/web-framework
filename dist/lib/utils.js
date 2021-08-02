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
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.getImageAndReport = exports.requestDomains = exports.getLogConfig = exports.isAuto = exports.promptForConfirmContinue = exports.delFunctionInConfFile = exports.writeStrToFile = exports.isDir = exports.isFile = exports.genStackId = exports.promiseRetry = exports.isDebug = void 0;
var fs_extra_1 = __importDefault(require("fs-extra"));
var inquirer_1 = __importDefault(require("inquirer"));
var axios_1 = __importDefault(require("axios"));
var promise_retry_1 = __importDefault(require("promise-retry"));
var constant_1 = require("../constant");
var core_1 = require("@serverless-devs/core");
var lodash_1 = __importDefault(require("lodash"));
exports.isDebug = (_b = (_a = process.env) === null || _a === void 0 ? void 0 : _a.temp_params) === null || _b === void 0 ? void 0 : _b.includes('--debug');
function promiseRetry(fn) {
    return __awaiter(this, void 0, void 0, function () {
        var retryOptions;
        return __generator(this, function (_a) {
            retryOptions = {
                retries: 2,
                factor: 2,
                minTimeout: 1 * 1000,
                randomize: true,
            };
            return [2 /*return*/, promise_retry_1.default(fn, retryOptions)];
        });
    });
}
exports.promiseRetry = promiseRetry;
function genStackId(accountId, region, serviceName) {
    return accountId + "-" + region + "-" + serviceName;
}
exports.genStackId = genStackId;
function isFile(inputPath) {
    return __awaiter(this, void 0, void 0, function () {
        var stats;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fs_extra_1.default.pathExists(inputPath)];
                case 1:
                    if (!(_a.sent())) {
                        return [2 /*return*/, false];
                    }
                    return [4 /*yield*/, fs_extra_1.default.lstat(inputPath)];
                case 2:
                    stats = _a.sent();
                    return [2 /*return*/, stats.isFile()];
            }
        });
    });
}
exports.isFile = isFile;
function isDir(inputPath) {
    return __awaiter(this, void 0, void 0, function () {
        var stats;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fs_extra_1.default.lstat(inputPath)];
                case 1:
                    stats = _a.sent();
                    return [2 /*return*/, stats.isDirectory()];
            }
        });
    });
}
exports.isDir = isDir;
function writeStrToFile(targetFile, content, flags, mode) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve, reject) {
                    var ws = fs_extra_1.default.createWriteStream(targetFile, { flags: flags, mode: mode });
                    ws.write(content);
                    ws.end();
                    ws.on('finish', function () { return resolve(); });
                    ws.on('error', function (error) {
                        core_1.Logger.error(constant_1.CONTEXT, targetFile + " write error: " + error);
                        reject(error);
                    });
                })];
        });
    });
}
exports.writeStrToFile = writeStrToFile;
function delFunctionInConfFile(targetFile, content, flags, mode) {
    return __awaiter(this, void 0, void 0, function () {
        var functionName, config;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    functionName = content.functionName;
                    return [4 /*yield*/, fs_extra_1.default.readJSON(targetFile)];
                case 1:
                    config = _a.sent();
                    delete config.functions[functionName];
                    if (!!lodash_1.default.isEmpty(config.functions)) return [3 /*break*/, 3];
                    return [4 /*yield*/, writeStrToFile(targetFile, JSON.stringify(config, null, '  '), flags, mode)];
                case 2:
                    _a.sent();
                    return [2 /*return*/, false];
                case 3: return [2 /*return*/, true];
            }
        });
    });
}
exports.delFunctionInConfFile = delFunctionInConfFile;
function isInteractiveEnvironment() {
    return process.stdin.isTTY;
}
function promptForConfirmContinue(message) {
    return __awaiter(this, void 0, void 0, function () {
        var answers;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!isInteractiveEnvironment()) {
                        return [2 /*return*/, true];
                    }
                    return [4 /*yield*/, inquirer_1.default.prompt([
                            {
                                type: 'confirm',
                                name: 'ok',
                                message: message,
                            },
                        ])];
                case 1:
                    answers = _a.sent();
                    if (answers.ok) {
                        return [2 /*return*/, true];
                    }
                    return [2 /*return*/, false];
            }
        });
    });
}
exports.promptForConfirmContinue = promptForConfirmContinue;
function isAuto(arg) {
    return arg === 'auto' || arg === 'Auto';
}
exports.isAuto = isAuto;
function getLogConfig(logConfig, autoName) {
    if (isAuto(logConfig)) {
        return {
            project: autoName.toLocaleLowerCase().replace(/_/g, '-'),
            logstore: constant_1.STORENAME,
        };
    }
    if ((logConfig === null || logConfig === void 0 ? void 0 : logConfig.project) && (logConfig === null || logConfig === void 0 ? void 0 : logConfig.logstore)) {
        return logConfig;
    }
    throw new Error('service/logConfig configuration error');
}
exports.getLogConfig = getLogConfig;
function requestDomains(domainName) {
    return __awaiter(this, void 0, void 0, function () {
        var ex_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    core_1.Logger.debug(constant_1.CONTEXT, "Request domains http://" + domainName);
                    return [4 /*yield*/, axios_1.default.get("http://" + domainName, { timeout: 15 * 1000 })];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    ex_1 = _a.sent();
                    core_1.Logger.debug(constant_1.CONTEXT, ex_1.toString());
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.requestDomains = requestDomains;
function getImageAndReport(inputs, uid, command) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var image;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    core_1.reportComponent(constant_1.CONTEXT_NAME, { command: command, uid: uid });
                    core_1.Logger.debug(constant_1.CONTEXT, "get image customContainerConfig: " + JSON.stringify(inputs.props.function.customContainerConfig) + ", runtime: " + inputs.props.runtime + ", region: " + inputs.props.region + ".");
                    if (!!((_a = inputs.props.function.customContainerConfig) === null || _a === void 0 ? void 0 : _a.image)) return [3 /*break*/, 2];
                    return [4 /*yield*/, core_1.request('https://registry.devsapp.cn/registry/image', {
                            method: 'post',
                            body: {
                                region: inputs.props.region,
                                runtime: inputs.props.runtime === 'php7.2' ? 'php7' : inputs.props.runtime,
                            },
                            form: true,
                        })];
                case 1:
                    image = (_b.sent()).image;
                    core_1.Logger.debug(constant_1.CONTEXT, "auto image is " + image + ".");
                    // @ts-ignore
                    inputs.props.function.customContainerConfig || (inputs.props.function.customContainerConfig = {});
                    inputs.props.function.customContainerConfig.image = image;
                    _b.label = 2;
                case 2: return [2 /*return*/, inputs];
            }
        });
    });
}
exports.getImageAndReport = getImageAndReport;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbGliL3V0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxzREFBMkI7QUFDM0Isc0RBQWdDO0FBQ2hDLGdEQUEwQjtBQUMxQixnRUFBa0M7QUFDbEMsd0NBQStEO0FBRy9ELDhDQUF5RTtBQUN6RSxrREFBdUI7QUFFVixRQUFBLE9BQU8sZUFBRyxPQUFPLENBQUMsR0FBRywwQ0FBRSxXQUFXLDBDQUFFLFFBQVEsQ0FBQyxTQUFTLEVBQUU7QUFFckUsU0FBc0IsWUFBWSxDQUFDLEVBQU87Ozs7WUFDbEMsWUFBWSxHQUFHO2dCQUNuQixPQUFPLEVBQUUsQ0FBQztnQkFDVixNQUFNLEVBQUUsQ0FBQztnQkFDVCxVQUFVLEVBQUUsQ0FBQyxHQUFHLElBQUk7Z0JBQ3BCLFNBQVMsRUFBRSxJQUFJO2FBQ2hCLENBQUM7WUFDRixzQkFBTyx1QkFBSyxDQUFDLEVBQUUsRUFBRSxZQUFZLENBQUMsRUFBQzs7O0NBQ2hDO0FBUkQsb0NBUUM7QUFFRCxTQUFnQixVQUFVLENBQUMsU0FBaUIsRUFBRSxNQUFjLEVBQUUsV0FBbUI7SUFDL0UsT0FBVSxTQUFTLFNBQUksTUFBTSxTQUFJLFdBQWEsQ0FBQztBQUNqRCxDQUFDO0FBRkQsZ0NBRUM7QUFFRCxTQUFzQixNQUFNLENBQUMsU0FBaUI7Ozs7O3dCQUN2QyxxQkFBTSxrQkFBRyxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsRUFBQTs7b0JBQXBDLElBQUksQ0FBQyxDQUFBLFNBQStCLENBQUEsRUFBRTt3QkFDcEMsc0JBQU8sS0FBSyxFQUFDO3FCQUNkO29CQUNhLHFCQUFNLGtCQUFHLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxFQUFBOztvQkFBbEMsS0FBSyxHQUFHLFNBQTBCO29CQUN4QyxzQkFBTyxLQUFLLENBQUMsTUFBTSxFQUFFLEVBQUM7Ozs7Q0FDdkI7QUFORCx3QkFNQztBQUVELFNBQXNCLEtBQUssQ0FBQyxTQUFTOzs7Ozt3QkFDckIscUJBQU0sa0JBQUcsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLEVBQUE7O29CQUFsQyxLQUFLLEdBQUcsU0FBMEI7b0JBQ3hDLHNCQUFPLEtBQUssQ0FBQyxXQUFXLEVBQUUsRUFBQzs7OztDQUM1QjtBQUhELHNCQUdDO0FBRUQsU0FBc0IsY0FBYyxDQUNsQyxVQUFrQixFQUNsQixPQUFlLEVBQ2YsS0FBYyxFQUNkLElBQWE7OztZQUViLHNCQUFPLElBQUksT0FBTyxDQUFDLFVBQUMsT0FBTyxFQUFFLE1BQU07b0JBQ2pDLElBQU0sRUFBRSxHQUFHLGtCQUFHLENBQUMsaUJBQWlCLENBQUMsVUFBVSxFQUFFLEVBQUUsS0FBSyxPQUFBLEVBQUUsSUFBSSxNQUFBLEVBQUUsQ0FBQyxDQUFDO29CQUM5RCxFQUFFLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO29CQUNsQixFQUFFLENBQUMsR0FBRyxFQUFFLENBQUM7b0JBQ1QsRUFBRSxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsY0FBTSxPQUFBLE9BQU8sRUFBRSxFQUFULENBQVMsQ0FBQyxDQUFDO29CQUNqQyxFQUFFLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxVQUFDLEtBQUs7d0JBQ25CLGFBQU0sQ0FBQyxLQUFLLENBQUMsa0JBQU8sRUFBSyxVQUFVLHNCQUFpQixLQUFPLENBQUMsQ0FBQzt3QkFDN0QsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUNoQixDQUFDLENBQUMsQ0FBQztnQkFDTCxDQUFDLENBQUMsRUFBQzs7O0NBQ0o7QUFoQkQsd0NBZ0JDO0FBRUQsU0FBc0IscUJBQXFCLENBQ3pDLFVBQWtCLEVBQ2xCLE9BQVksRUFDWixLQUFjLEVBQ2QsSUFBYTs7Ozs7O29CQUVMLFlBQVksR0FBSyxPQUFPLGFBQVosQ0FBYTtvQkFDbEIscUJBQU0sa0JBQUcsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLEVBQUE7O29CQUF2QyxNQUFNLEdBQUcsU0FBOEI7b0JBRTdDLE9BQU8sTUFBTSxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsQ0FBQzt5QkFFbEMsQ0FBQyxnQkFBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLEVBQTVCLHdCQUE0QjtvQkFDOUIscUJBQU0sY0FBYyxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxFQUFBOztvQkFBakYsU0FBaUYsQ0FBQztvQkFDbEYsc0JBQU8sS0FBSyxFQUFDO3dCQUdmLHNCQUFPLElBQUksRUFBQzs7OztDQUNiO0FBakJELHNEQWlCQztBQUVELFNBQVMsd0JBQXdCO0lBQy9CLE9BQU8sT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUM7QUFDN0IsQ0FBQztBQUVELFNBQXNCLHdCQUF3QixDQUFDLE9BQWU7Ozs7OztvQkFDNUQsSUFBSSxDQUFDLHdCQUF3QixFQUFFLEVBQUU7d0JBQy9CLHNCQUFPLElBQUksRUFBQztxQkFDYjtvQkFHZSxxQkFBTSxrQkFBUSxDQUFDLE1BQU0sQ0FBQzs0QkFDcEM7Z0NBQ0UsSUFBSSxFQUFFLFNBQVM7Z0NBQ2YsSUFBSSxFQUFFLElBQUk7Z0NBQ1YsT0FBTyxTQUFBOzZCQUNSO3lCQUNGLENBQUMsRUFBQTs7b0JBTkksT0FBTyxHQUFHLFNBTWQ7b0JBRUYsSUFBSSxPQUFPLENBQUMsRUFBRSxFQUFFO3dCQUNkLHNCQUFPLElBQUksRUFBQztxQkFDYjtvQkFDRCxzQkFBTyxLQUFLLEVBQUM7Ozs7Q0FDZDtBQWxCRCw0REFrQkM7QUFFRCxTQUFnQixNQUFNLENBQUMsR0FBUTtJQUM3QixPQUFPLEdBQUcsS0FBSyxNQUFNLElBQUksR0FBRyxLQUFLLE1BQU0sQ0FBQztBQUMxQyxDQUFDO0FBRkQsd0JBRUM7QUFFRCxTQUFnQixZQUFZLENBQUMsU0FBdUMsRUFBRSxRQUFnQjtJQUNwRixJQUFJLE1BQU0sQ0FBQyxTQUFTLENBQUMsRUFBRTtRQUNyQixPQUFPO1lBQ0wsT0FBTyxFQUFFLFFBQVEsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDO1lBQ3hELFFBQVEsRUFBRSxvQkFBUztTQUNwQixDQUFDO0tBQ0g7SUFFRCxJQUFJLENBQUEsU0FBUyxhQUFULFNBQVMsdUJBQVQsU0FBUyxDQUFFLE9BQU8sTUFBSSxTQUFTLGFBQVQsU0FBUyx1QkFBVCxTQUFTLENBQUUsUUFBUSxDQUFBLEVBQUU7UUFDN0MsT0FBTyxTQUFTLENBQUM7S0FDbEI7SUFFRCxNQUFNLElBQUksS0FBSyxDQUFDLHVDQUF1QyxDQUFDLENBQUM7QUFDM0QsQ0FBQztBQWJELG9DQWFDO0FBRUQsU0FBc0IsY0FBYyxDQUFDLFVBQVU7Ozs7Ozs7b0JBRTNDLGFBQU0sQ0FBQyxLQUFLLENBQUMsa0JBQU8sRUFBRSw0QkFBMEIsVUFBWSxDQUFDLENBQUM7b0JBQzlELHFCQUFNLGVBQUssQ0FBQyxHQUFHLENBQUMsWUFBVSxVQUFZLEVBQUUsRUFBRSxPQUFPLEVBQUUsRUFBRSxHQUFHLElBQUksRUFBRSxDQUFDLEVBQUE7O29CQUEvRCxTQUErRCxDQUFDOzs7O29CQUVoRSxhQUFNLENBQUMsS0FBSyxDQUFDLGtCQUFPLEVBQUUsSUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7Ozs7OztDQUV4QztBQVBELHdDQU9DO0FBRUQsU0FBc0IsaUJBQWlCLENBQUMsTUFBZSxFQUFFLEdBQVcsRUFBRSxPQUFlOzs7Ozs7O29CQUNuRixzQkFBZSxDQUFDLHVCQUFZLEVBQUUsRUFBRSxPQUFPLFNBQUEsRUFBRSxHQUFHLEtBQUEsRUFBRSxDQUFDLENBQUM7b0JBRWhELGFBQU0sQ0FBQyxLQUFLLENBQUMsa0JBQU8sRUFBRSxzQ0FBb0MsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxxQkFBcUIsQ0FBQyxtQkFBYyxNQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sa0JBQWEsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLE1BQUcsQ0FBQyxDQUFDO3lCQUN4TCxRQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLHFCQUFxQiwwQ0FBRSxLQUFLLENBQUEsRUFBbkQsd0JBQW1EO29CQUNuQyxxQkFBTSxjQUFPLENBQUMsNENBQTRDLEVBQUU7NEJBQzVFLE1BQU0sRUFBRSxNQUFNOzRCQUNkLElBQUksRUFBRTtnQ0FDSixNQUFNLEVBQUUsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNO2dDQUMzQixPQUFPLEVBQUUsTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTzs2QkFDM0U7NEJBQ0QsSUFBSSxFQUFFLElBQUk7eUJBQ1gsQ0FBQyxFQUFBOztvQkFQTSxLQUFLLEdBQUssQ0FBQSxTQU9oQixDQUFBLE1BUFc7b0JBUWIsYUFBTSxDQUFDLEtBQUssQ0FBQyxrQkFBTyxFQUFFLG1CQUFpQixLQUFLLE1BQUcsQ0FBQyxDQUFDO29CQUNqRCxhQUFhO29CQUNiLE1BQU0sQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLHFCQUFxQixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMscUJBQXFCLEdBQUcsRUFBRSxDQUFDLENBQUM7b0JBQ2xHLE1BQU0sQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLHFCQUFxQixDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7O3dCQUc1RCxzQkFBTyxNQUFNLEVBQUM7Ozs7Q0FDZjtBQXBCRCw4Q0FvQkMifQ==