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
exports.getImageAndReport = exports.requestDomains = exports.getLogConfig = exports.isAuto = exports.promptForConfirmContinue = exports.writeStrToFile = exports.isDir = exports.isFile = exports.genStackId = void 0;
var fs_extra_1 = __importDefault(require("fs-extra"));
var inquirer_1 = __importDefault(require("inquirer"));
var got_1 = __importDefault(require("got"));
var constant_1 = require("../constant");
var core_1 = require("@serverless-devs/core");
function genStackId(accountId, region, serviceName) {
    return accountId + "-" + region + "-" + serviceName;
}
exports.genStackId = genStackId;
function isFile(inputPath) {
    return __awaiter(this, void 0, void 0, function () {
        var stats;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fs_extra_1.default.lstat(inputPath)];
                case 1:
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
            logstore: constant_1.STORENAME
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
                    return [4 /*yield*/, got_1.default(domainName, { timeout: 10 })];
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
    return __awaiter(this, void 0, void 0, function () {
        var image;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    core_1.reportComponent(constant_1.CONTEXT_NAME, { command: command, uid: uid });
                    core_1.Logger.debug(constant_1.CONTEXT, "get image customContainerConfig: " + JSON.stringify(inputs.props.function.customContainerConfig) + ", runtime: " + inputs.props.runtime + ", region: " + inputs.props.region + ".");
                    if (!!inputs.props.function.customContainerConfig.image) return [3 /*break*/, 2];
                    return [4 /*yield*/, core_1.request('https://registry.serverlessfans.cn/registry/image', {
                            method: 'post',
                            body: {
                                region: inputs.props.region,
                                runtime: inputs.props.runtime === 'php7.2' ? 'php7' : inputs.props.runtime
                            },
                            form: true
                        })];
                case 1:
                    image = (_a.sent()).image;
                    core_1.Logger.debug(constant_1.CONTEXT, "auto image is " + image + ".");
                    inputs.props.function.customContainerConfig.image = image;
                    _a.label = 2;
                case 2: return [2 /*return*/];
            }
        });
    });
}
exports.getImageAndReport = getImageAndReport;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbGliL3V0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHNEQUEyQjtBQUMzQixzREFBZ0M7QUFDaEMsNENBQXNCO0FBQ3RCLHdDQUErRDtBQUcvRCw4Q0FBeUU7QUFFekUsU0FBZ0IsVUFBVSxDQUFDLFNBQWlCLEVBQUUsTUFBYyxFQUFFLFdBQW1CO0lBQy9FLE9BQVUsU0FBUyxTQUFJLE1BQU0sU0FBSSxXQUFhLENBQUM7QUFDakQsQ0FBQztBQUZELGdDQUVDO0FBRUQsU0FBc0IsTUFBTSxDQUFDLFNBQWlCOzs7Ozt3QkFDOUIscUJBQU0sa0JBQUcsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLEVBQUE7O29CQUFsQyxLQUFLLEdBQUcsU0FBMEI7b0JBQ3hDLHNCQUFPLEtBQUssQ0FBQyxNQUFNLEVBQUUsRUFBQzs7OztDQUN2QjtBQUhELHdCQUdDO0FBRUQsU0FBc0IsS0FBSyxDQUFDLFNBQVM7Ozs7O3dCQUNyQixxQkFBTSxrQkFBRyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsRUFBQTs7b0JBQWxDLEtBQUssR0FBRyxTQUEwQjtvQkFDeEMsc0JBQU8sS0FBSyxDQUFDLFdBQVcsRUFBRSxFQUFDOzs7O0NBQzVCO0FBSEQsc0JBR0M7QUFFRCxTQUFzQixjQUFjLENBQ2xDLFVBQWtCLEVBQ2xCLE9BQWUsRUFDZixLQUFjLEVBQ2QsSUFBYTs7O1lBRWIsc0JBQU8sSUFBSSxPQUFPLENBQUMsVUFBQyxPQUFPLEVBQUUsTUFBTTtvQkFDakMsSUFBTSxFQUFFLEdBQUcsa0JBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxVQUFVLEVBQUUsRUFBRSxLQUFLLE9BQUEsRUFBRSxJQUFJLE1BQUEsRUFBRSxDQUFDLENBQUM7b0JBQzlELEVBQUUsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7b0JBQ2xCLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQztvQkFDVCxFQUFFLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxjQUFNLE9BQUEsT0FBTyxFQUFFLEVBQVQsQ0FBUyxDQUFDLENBQUM7b0JBQ2pDLEVBQUUsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLFVBQUMsS0FBSzt3QkFDbkIsYUFBTSxDQUFDLEtBQUssQ0FBQyxrQkFBTyxFQUFLLFVBQVUsc0JBQWlCLEtBQU8sQ0FBQyxDQUFDO3dCQUM3RCxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQ2hCLENBQUMsQ0FBQyxDQUFDO2dCQUNMLENBQUMsQ0FBQyxFQUFDOzs7Q0FDSjtBQWhCRCx3Q0FnQkM7QUFFRCxTQUFTLHdCQUF3QjtJQUMvQixPQUFPLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDO0FBQzdCLENBQUM7QUFFRCxTQUFzQix3QkFBd0IsQ0FBQyxPQUFlOzs7Ozs7b0JBQzVELElBQUksQ0FBQyx3QkFBd0IsRUFBRSxFQUFFO3dCQUMvQixzQkFBTyxJQUFJLEVBQUM7cUJBQ2I7b0JBR2UscUJBQU0sa0JBQVEsQ0FBQyxNQUFNLENBQUM7NEJBQ3BDO2dDQUNFLElBQUksRUFBRSxTQUFTO2dDQUNmLElBQUksRUFBRSxJQUFJO2dDQUNWLE9BQU8sU0FBQTs2QkFDUjt5QkFDRixDQUFDLEVBQUE7O29CQU5JLE9BQU8sR0FBRyxTQU1kO29CQUVGLElBQUksT0FBTyxDQUFDLEVBQUUsRUFBRTt3QkFDZCxzQkFBTyxJQUFJLEVBQUM7cUJBQ2I7b0JBQ0Qsc0JBQU8sS0FBSyxFQUFDOzs7O0NBQ2Q7QUFsQkQsNERBa0JDO0FBRUQsU0FBZ0IsTUFBTSxDQUFDLEdBQVE7SUFDN0IsT0FBTyxHQUFHLEtBQUssTUFBTSxJQUFJLEdBQUcsS0FBSyxNQUFNLENBQUM7QUFDMUMsQ0FBQztBQUZELHdCQUVDO0FBRUQsU0FBZ0IsWUFBWSxDQUFDLFNBQXVDLEVBQUUsUUFBZ0I7SUFDcEYsSUFBSSxNQUFNLENBQUMsU0FBUyxDQUFDLEVBQUU7UUFDckIsT0FBTztZQUNMLE9BQU8sRUFBRSxRQUFRLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQztZQUN4RCxRQUFRLEVBQUUsb0JBQVM7U0FDcEIsQ0FBQTtLQUNGO0lBRUQsSUFBSSxDQUFBLFNBQVMsYUFBVCxTQUFTLHVCQUFULFNBQVMsQ0FBRSxPQUFPLE1BQUksU0FBUyxhQUFULFNBQVMsdUJBQVQsU0FBUyxDQUFFLFFBQVEsQ0FBQSxFQUFFO1FBQzdDLE9BQU8sU0FBUyxDQUFDO0tBQ2xCO0lBRUQsTUFBTSxJQUFJLEtBQUssQ0FBQyx1Q0FBdUMsQ0FBQyxDQUFDO0FBQzNELENBQUM7QUFiRCxvQ0FhQztBQUVELFNBQXNCLGNBQWMsQ0FBQyxVQUFVOzs7Ozs7O29CQUUzQyxxQkFBTSxhQUFHLENBQUMsVUFBVSxFQUFFLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUE7O29CQUF0QyxTQUFzQyxDQUFDOzs7O29CQUV2QyxhQUFNLENBQUMsS0FBSyxDQUFDLGtCQUFPLEVBQUUsSUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7Ozs7OztDQUV4QztBQU5ELHdDQU1DO0FBRUQsU0FBc0IsaUJBQWlCLENBQUMsTUFBZSxFQUFFLEdBQVcsRUFBRSxPQUFlOzs7Ozs7b0JBQ25GLHNCQUFlLENBQUMsdUJBQVksRUFBRSxFQUFFLE9BQU8sU0FBQSxFQUFFLEdBQUcsS0FBQSxFQUFFLENBQUMsQ0FBQztvQkFFaEQsYUFBTSxDQUFDLEtBQUssQ0FBQyxrQkFBTyxFQUFFLHNDQUFvQyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLHFCQUFxQixDQUFDLG1CQUFjLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxrQkFBYSxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sTUFBRyxDQUFDLENBQUM7eUJBQ3hMLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMscUJBQXFCLENBQUMsS0FBSyxFQUFsRCx3QkFBa0Q7b0JBQ2xDLHFCQUFNLGNBQU8sQ0FBQyxtREFBbUQsRUFBRTs0QkFDbkYsTUFBTSxFQUFFLE1BQU07NEJBQ2QsSUFBSSxFQUFFO2dDQUNKLE1BQU0sRUFBRSxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU07Z0NBQzNCLE9BQU8sRUFBRSxNQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPOzZCQUMzRTs0QkFDRCxJQUFJLEVBQUUsSUFBSTt5QkFDWCxDQUFDLEVBQUE7O29CQVBNLEtBQUssR0FBSyxDQUFBLFNBT2hCLENBQUEsTUFQVztvQkFRYixhQUFNLENBQUMsS0FBSyxDQUFDLGtCQUFPLEVBQUUsbUJBQWlCLEtBQUssTUFBRyxDQUFDLENBQUM7b0JBRWpELE1BQU0sQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLHFCQUFxQixDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7Ozs7OztDQUU3RDtBQWpCRCw4Q0FpQkMifQ==