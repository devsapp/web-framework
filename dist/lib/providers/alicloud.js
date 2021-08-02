"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var pop_core_1 = __importDefault(require("@alicloud/pop-core"));
var core_1 = require("@serverless-devs/core");
var logger_1 = __importDefault(require("../../common/logger"));
var provider_1 = __importDefault(require("./provider"));
var utils_1 = require("../utils");
var spawnSync = require('child_process').spawnSync;
var AliCloud = /** @class */ (function (_super) {
    __extends(AliCloud, _super);
    function AliCloud(props) {
        var _this = _super.call(this, props) || this;
        _this.namespace = _this.inputs.appName.toString().toLowerCase();
        return _this;
    }
    AliCloud.prototype.login = function () {
        return __awaiter(this, void 0, void 0, function () {
            var tempLoginInfo, region, _a, tempUserName, authorizationToken;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.getTempLoginUserInfo()];
                    case 1:
                        tempLoginInfo = _b.sent();
                        if (!tempLoginInfo.data) return [3 /*break*/, 3];
                        region = this.inputs.props.region || 'cn-hangzhou';
                        _a = tempLoginInfo.data, tempUserName = _a.tempUserName, authorizationToken = _a.authorizationToken;
                        return [4 /*yield*/, this.executeLoginCommand(tempUserName, authorizationToken, region)];
                    case 2:
                        _b.sent();
                        _b.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AliCloud.prototype.publish = function (buildImg, qualifier) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var namespaceData, namespaces, namespaceNameList, properties, serviceName, functionName, projectName, repoResult, repos, region, imgversion, imageUrl;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.getNameSpace()];
                    case 1:
                        namespaceData = _b.sent();
                        namespaces = namespaceData.data.namespaces;
                        namespaceNameList = namespaces.map(function (data) { return data.namespace; });
                        if (!!namespaceNameList.includes(this.namespace)) return [3 /*break*/, 3];
                        // 这里容易会触发一个问题，容器镜像服务命名空间仅能创建三个
                        return [4 /*yield*/, this.createNameSpace(this.namespace).catch(function (e) { return logger_1.default.error(e); })];
                    case 2:
                        // 这里容易会触发一个问题，容器镜像服务命名空间仅能创建三个
                        _b.sent();
                        _b.label = 3;
                    case 3: return [4 /*yield*/, this.updateNamespace(this.namespace).catch(function (e) { return logger_1.default.error(e); })];
                    case 4:
                        _b.sent();
                        properties = this.inputs.props;
                        serviceName = properties.service.name;
                        functionName = ((_a = properties.function) === null || _a === void 0 ? void 0 : _a.name) || serviceName;
                        projectName = (serviceName + "." + functionName).toLowerCase();
                        return [4 /*yield*/, this.getRepos().catch(function (e) { return logger_1.default.error(e); })];
                    case 5:
                        repoResult = _b.sent();
                        repos = repoResult.data.repos.map(function (item) { return item.repoName; });
                        if (!!repos.includes(projectName)) return [3 /*break*/, 7];
                        return [4 /*yield*/, this.createRepo(projectName).catch(function (e) { return logger_1.default.error(e); })];
                    case 6:
                        _b.sent();
                        _b.label = 7;
                    case 7:
                        region = this.inputs.props.region || 'cn-hangzhou';
                        return [4 /*yield*/, this.executeTagCommand(region, projectName, buildImg, qualifier)];
                    case 8:
                        imgversion = _b.sent();
                        return [4 /*yield*/, this.executePublishCommand(region, projectName, imgversion)];
                    case 9:
                        _b.sent();
                        imageUrl = "registry." + region + ".aliyuncs.com/" + this.namespace + "/" + projectName + ":" + imgversion;
                        return [2 /*return*/, imageUrl];
                }
            });
        });
    };
    AliCloud.prototype.createApiClient = function () {
        if (!this.client) {
            var _a = this.inputs.credentials, AccessKeyID = _a.AccessKeyID, AccessKeySecret = _a.AccessKeySecret;
            var _popCore = pop_core_1.default;
            this.client = new _popCore.ROAClient({
                accessKeyId: AccessKeyID,
                accessKeySecret: AccessKeySecret,
                endpoint: "https://cr." + (this.inputs.props.region || 'cn-hangzhou') + ".aliyuncs.com",
                apiVersion: '2016-06-07',
            });
        }
        return this.client;
    };
    AliCloud.prototype.requestApi = function (path, method, body, option) {
        if (method === void 0) { method = 'GET'; }
        if (body === void 0) { body = '{}'; }
        if (option === void 0) { option = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var httpMethod, uriPath, queries, headers, apiClient, ex_1, code, statusCode, result, newError;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        httpMethod = method;
                        uriPath = path;
                        queries = {};
                        headers = {
                            'Content-Type': 'application/json',
                        };
                        apiClient = this.createApiClient();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, apiClient.request(httpMethod, uriPath, queries, body, headers, option)];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3:
                        ex_1 = _a.sent();
                        code = ex_1.code, statusCode = ex_1.statusCode, result = ex_1.result;
                        newError = new Error("Code: " + result.code + ", Message: " + result.message);
                        newError.name = code || statusCode;
                        newError.stack = ex_1.stack;
                        // @ts-ignore: 保留原有的参数
                        newError.code = statusCode;
                        // @ts-ignore: 保留原有的参数
                        newError.result = result;
                        throw newError;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    AliCloud.prototype.getTempLoginUserInfo = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.requestApi('/tokens')];
            });
        });
    };
    AliCloud.prototype.executeLoginCommand = function (userName, password, region) {
        if (region === void 0) { region = 'cn-hangzhou'; }
        var command = "docker login -u " + userName + " -p " + password + " registry." + region + ".aliyuncs.com ";
        var vm = utils_1.isDebug ? undefined : core_1.spinner("Run: " + command);
        spawnSync(command, [], {
            cwd: './',
            stdio: utils_1.isDebug ? 'inherit' : 'ignore',
            shell: true,
        });
        vm === null || vm === void 0 ? void 0 : vm.stop();
    };
    AliCloud.prototype.executeTagCommand = function (region, projectName, imgId, imgversion) {
        var command = "docker tag " + imgId + " registry." + region + ".aliyuncs.com/" + this.namespace + "/" + projectName + ":" + imgversion;
        var vm = utils_1.isDebug ? undefined : core_1.spinner("Run: " + command);
        spawnSync(command, [], {
            cwd: './',
            stdio: utils_1.isDebug ? 'inherit' : 'ignore',
            shell: true,
        });
        vm === null || vm === void 0 ? void 0 : vm.stop();
        return imgversion;
    };
    AliCloud.prototype.executePublishCommand = function (region, projectName, imgversion) {
        var command = "docker push registry." + region + ".aliyuncs.com/" + this.namespace + "/" + projectName + ":" + imgversion;
        var vm = utils_1.isDebug ? undefined : core_1.spinner("Run: " + command);
        var status = spawnSync(command, [], {
            cwd: './',
            stdio: utils_1.isDebug ? 'inherit' : 'ignore',
            shell: true,
        }).status;
        if (status) {
            vm === null || vm === void 0 ? void 0 : vm.fail();
            throw new Error('Failed to push the image to the Registry.');
        }
        vm === null || vm === void 0 ? void 0 : vm.succeed();
    };
    AliCloud.prototype.getNameSpace = function () {
        return this.requestApi('/namespace');
    };
    AliCloud.prototype.createNameSpace = function (name) {
        return __awaiter(this, void 0, void 0, function () {
            var body;
            return __generator(this, function (_a) {
                body = {
                    Namespace: {
                        namespace: name,
                    },
                };
                return [2 /*return*/, this.requestApi('/namespace', 'PUT', JSON.stringify(body))];
            });
        });
    };
    AliCloud.prototype.updateNamespace = function (name) {
        return __awaiter(this, void 0, void 0, function () {
            var body;
            return __generator(this, function (_a) {
                body = {
                    Namespace: {
                        AutoCreate: true,
                        DefaultVisibility: 'PUBLIC',
                    },
                };
                return [2 /*return*/, this.requestApi("/namespace/" + name, 'POST', JSON.stringify(body))];
            });
        });
    };
    AliCloud.prototype.createRepo = function (name) {
        return __awaiter(this, void 0, void 0, function () {
            var body;
            return __generator(this, function (_a) {
                body = {
                    Repo: {
                        RepoNamespace: this.namespace,
                        RepoName: name,
                        Summary: 'serverless devs',
                        Detail: 'serverless devs',
                        RepoType: 'PRIVATE',
                    },
                };
                return [2 /*return*/, this.requestApi('/repos', 'PUT', JSON.stringify(body))];
            });
        });
    };
    AliCloud.prototype.getRepos = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.requestApi('/repos')];
            });
        });
    };
    return AliCloud;
}(provider_1.default));
exports.default = AliCloud;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxpY2xvdWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL3Byb3ZpZGVycy9hbGljbG91ZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSxnRUFBeUM7QUFDekMsOENBQWdEO0FBQ2hELCtEQUF5QztBQUN6Qyx3REFBdUM7QUFDdkMsa0NBQW1DO0FBRTNCLElBQUEsU0FBUyxHQUFLLE9BQU8sQ0FBQyxlQUFlLENBQUMsVUFBN0IsQ0FBOEI7QUFFL0M7SUFBc0MsNEJBQWE7SUFHakQsa0JBQVksS0FBSztRQUFqQixZQUNFLGtCQUFNLEtBQUssQ0FBQyxTQUViO1FBREMsS0FBSSxDQUFDLFNBQVMsR0FBRyxLQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxXQUFXLEVBQUUsQ0FBQzs7SUFDaEUsQ0FBQztJQUVLLHdCQUFLLEdBQVg7Ozs7OzRCQUN3QixxQkFBTSxJQUFJLENBQUMsb0JBQW9CLEVBQUUsRUFBQTs7d0JBQWpELGFBQWEsR0FBRyxTQUFpQzs2QkFDbkQsYUFBYSxDQUFDLElBQUksRUFBbEIsd0JBQWtCO3dCQUNkLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLElBQUksYUFBYSxDQUFDO3dCQUNuRCxLQUF1QyxhQUFhLENBQUMsSUFBSSxFQUF2RCxZQUFZLGtCQUFBLEVBQUUsa0JBQWtCLHdCQUFBLENBQXdCO3dCQUNoRSxxQkFBTSxJQUFJLENBQUMsbUJBQW1CLENBQUMsWUFBWSxFQUFFLGtCQUFrQixFQUFFLE1BQU0sQ0FBQyxFQUFBOzt3QkFBeEUsU0FBd0UsQ0FBQzs7Ozs7O0tBRTVFO0lBRUssMEJBQU8sR0FBYixVQUFjLFFBQWdCLEVBQUUsU0FBa0I7Ozs7Ozs0QkFDMUIscUJBQU0sSUFBSSxDQUFDLFlBQVksRUFBRSxFQUFBOzt3QkFBekMsYUFBYSxHQUFHLFNBQXlCO3dCQUN2QyxVQUFVLEdBQUssYUFBYSxDQUFDLElBQUksV0FBdkIsQ0FBd0I7d0JBQ3BDLGlCQUFpQixHQUFVLFVBQVUsQ0FBQyxHQUFHLENBQUMsVUFBQyxJQUFJLElBQUssT0FBQSxJQUFJLENBQUMsU0FBUyxFQUFkLENBQWMsQ0FBQyxDQUFDOzZCQUN0RSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQTNDLHdCQUEyQzt3QkFDN0MsK0JBQStCO3dCQUMvQixxQkFBTSxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxLQUFLLENBQUMsVUFBQyxDQUFDLElBQUssT0FBQSxnQkFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBZixDQUFlLENBQUMsRUFBQTs7d0JBRHhFLCtCQUErQjt3QkFDL0IsU0FBd0UsQ0FBQzs7NEJBRTNFLHFCQUFNLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxVQUFDLENBQUMsSUFBSyxPQUFBLGdCQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFmLENBQWUsQ0FBQyxFQUFBOzt3QkFBeEUsU0FBd0UsQ0FBQzt3QkFFbkUsVUFBVSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDO3dCQUMvQixXQUFXLEdBQUcsVUFBVSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUM7d0JBQ3RDLFlBQVksR0FBRyxPQUFBLFVBQVUsQ0FBQyxRQUFRLDBDQUFFLElBQUksS0FBSSxXQUFXLENBQUM7d0JBQ3hELFdBQVcsR0FBRyxDQUFHLFdBQVcsU0FBSSxZQUFjLENBQUEsQ0FBQyxXQUFXLEVBQUUsQ0FBQzt3QkFFaEQscUJBQU0sSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLEtBQUssQ0FBQyxVQUFDLENBQUMsSUFBSyxPQUFBLGdCQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFmLENBQWUsQ0FBQyxFQUFBOzt3QkFBaEUsVUFBVSxHQUFHLFNBQW1EO3dCQUNoRSxLQUFLLEdBQVUsVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLFVBQUMsSUFBSSxJQUFLLE9BQUEsSUFBSSxDQUFDLFFBQVEsRUFBYixDQUFhLENBQUMsQ0FBQzs2QkFDcEUsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxFQUE1Qix3QkFBNEI7d0JBQzlCLHFCQUFNLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLENBQUMsS0FBSyxDQUFDLFVBQUMsQ0FBQyxJQUFLLE9BQUEsZ0JBQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQWYsQ0FBZSxDQUFDLEVBQUE7O3dCQUFoRSxTQUFnRSxDQUFDOzs7d0JBRTdELE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLElBQUksYUFBYSxDQUFDO3dCQUN0QyxxQkFBTSxJQUFJLENBQUMsaUJBQWlCLENBQUMsTUFBTSxFQUFFLFdBQVcsRUFBRSxRQUFRLEVBQUUsU0FBUyxDQUFDLEVBQUE7O3dCQUFuRixVQUFVLEdBQUcsU0FBc0U7d0JBQ3pGLHFCQUFNLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxNQUFNLEVBQUUsV0FBVyxFQUFFLFVBQVUsQ0FBQyxFQUFBOzt3QkFBakUsU0FBaUUsQ0FBQzt3QkFDNUQsUUFBUSxHQUFHLGNBQVksTUFBTSxzQkFBaUIsSUFBSSxDQUFDLFNBQVMsU0FBSSxXQUFXLFNBQUksVUFBWSxDQUFDO3dCQUNsRyxzQkFBTyxRQUFRLEVBQUM7Ozs7S0FDakI7SUFFTyxrQ0FBZSxHQUF2QjtRQUNFLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ1YsSUFBQSxLQUFtQyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsRUFBeEQsV0FBVyxpQkFBQSxFQUFFLGVBQWUscUJBQTRCLENBQUM7WUFDakUsSUFBTSxRQUFRLEdBQUcsa0JBQWMsQ0FBQztZQUNoQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksUUFBUSxDQUFDLFNBQVMsQ0FBQztnQkFDbkMsV0FBVyxFQUFFLFdBQVc7Z0JBQ3hCLGVBQWUsRUFBRSxlQUFlO2dCQUNoQyxRQUFRLEVBQUUsaUJBQWMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxJQUFJLGFBQWEsbUJBQWU7Z0JBQ2hGLFVBQVUsRUFBRSxZQUFZO2FBQ3pCLENBQUMsQ0FBQztTQUNKO1FBQ0QsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ3JCLENBQUM7SUFFYSw2QkFBVSxHQUF4QixVQUF5QixJQUFJLEVBQUUsTUFBYyxFQUFFLElBQVcsRUFBRSxNQUFXO1FBQXhDLHVCQUFBLEVBQUEsY0FBYztRQUFFLHFCQUFBLEVBQUEsV0FBVztRQUFFLHVCQUFBLEVBQUEsV0FBVzs7Ozs7O3dCQUMvRCxVQUFVLEdBQUcsTUFBTSxDQUFDO3dCQUNwQixPQUFPLEdBQUcsSUFBSSxDQUFDO3dCQUNmLE9BQU8sR0FBRyxFQUFFLENBQUM7d0JBQ2IsT0FBTyxHQUFHOzRCQUNkLGNBQWMsRUFBRSxrQkFBa0I7eUJBQ25DLENBQUM7d0JBRUksU0FBUyxHQUFHLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQzs7Ozt3QkFFaEMscUJBQU0sU0FBUyxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLE1BQU0sQ0FBQyxFQUFBOzRCQUFuRixzQkFBTyxTQUE0RSxFQUFDOzs7d0JBR2xGLElBQUksR0FHRixJQUFFLEtBSEEsRUFDSixVQUFVLEdBRVIsSUFBRSxXQUZNLEVBQ1YsTUFBTSxHQUNKLElBQUUsT0FERSxDQUNEO3dCQUNELFFBQVEsR0FBRyxJQUFJLEtBQUssQ0FBQyxXQUFTLE1BQU0sQ0FBQyxJQUFJLG1CQUFjLE1BQU0sQ0FBQyxPQUFTLENBQUMsQ0FBQzt3QkFDL0UsUUFBUSxDQUFDLElBQUksR0FBRyxJQUFJLElBQUksVUFBVSxDQUFDO3dCQUNuQyxRQUFRLENBQUMsS0FBSyxHQUFHLElBQUUsQ0FBQyxLQUFLLENBQUM7d0JBQzFCLHNCQUFzQjt3QkFDdEIsUUFBUSxDQUFDLElBQUksR0FBRyxVQUFVLENBQUM7d0JBQzNCLHNCQUFzQjt3QkFDdEIsUUFBUSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7d0JBRXpCLE1BQU0sUUFBUSxDQUFDOzs7OztLQUVsQjtJQUVhLHVDQUFvQixHQUFsQzs7O2dCQUNFLHNCQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLEVBQUM7OztLQUNuQztJQUVPLHNDQUFtQixHQUEzQixVQUE0QixRQUFRLEVBQUUsUUFBUSxFQUFFLE1BQXNCO1FBQXRCLHVCQUFBLEVBQUEsc0JBQXNCO1FBQ3BFLElBQU0sT0FBTyxHQUFHLHFCQUFtQixRQUFRLFlBQU8sUUFBUSxrQkFBYSxNQUFNLG1CQUFnQixDQUFDO1FBQzlGLElBQU0sRUFBRSxHQUFHLGVBQU8sQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxjQUFPLENBQUMsVUFBUSxPQUFTLENBQUMsQ0FBQztRQUM1RCxTQUFTLENBQUMsT0FBTyxFQUFFLEVBQUUsRUFBRTtZQUNyQixHQUFHLEVBQUUsSUFBSTtZQUNULEtBQUssRUFBRSxlQUFPLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsUUFBUTtZQUNyQyxLQUFLLEVBQUUsSUFBSTtTQUNaLENBQUMsQ0FBQztRQUNILEVBQUUsYUFBRixFQUFFLHVCQUFGLEVBQUUsQ0FBRSxJQUFJLEdBQUc7SUFDYixDQUFDO0lBRU8sb0NBQWlCLEdBQXpCLFVBQTBCLE1BQWMsRUFBRSxXQUFtQixFQUFFLEtBQWEsRUFBRSxVQUEyQjtRQUN2RyxJQUFNLE9BQU8sR0FBRyxnQkFBYyxLQUFLLGtCQUFhLE1BQU0sc0JBQWlCLElBQUksQ0FBQyxTQUFTLFNBQUksV0FBVyxTQUFJLFVBQVksQ0FBQztRQUNySCxJQUFNLEVBQUUsR0FBRyxlQUFPLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsY0FBTyxDQUFDLFVBQVEsT0FBUyxDQUFDLENBQUM7UUFDNUQsU0FBUyxDQUFDLE9BQU8sRUFBRSxFQUFFLEVBQUU7WUFDckIsR0FBRyxFQUFFLElBQUk7WUFDVCxLQUFLLEVBQUUsZUFBTyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLFFBQVE7WUFDckMsS0FBSyxFQUFFLElBQUk7U0FDWixDQUFDLENBQUM7UUFDSCxFQUFFLGFBQUYsRUFBRSx1QkFBRixFQUFFLENBQUUsSUFBSSxHQUFHO1FBQ1gsT0FBTyxVQUFVLENBQUM7SUFDcEIsQ0FBQztJQUVPLHdDQUFxQixHQUE3QixVQUE4QixNQUFjLEVBQUUsV0FBbUIsRUFBRSxVQUEyQjtRQUM1RixJQUFNLE9BQU8sR0FBRywwQkFBd0IsTUFBTSxzQkFBaUIsSUFBSSxDQUFDLFNBQVMsU0FBSSxXQUFXLFNBQUksVUFBWSxDQUFDO1FBQzdHLElBQU0sRUFBRSxHQUFHLGVBQU8sQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxjQUFPLENBQUMsVUFBUSxPQUFTLENBQUMsQ0FBQztRQUNwRCxJQUFBLE1BQU0sR0FBSyxTQUFTLENBQUMsT0FBTyxFQUFFLEVBQUUsRUFBRTtZQUN4QyxHQUFHLEVBQUUsSUFBSTtZQUNULEtBQUssRUFBRSxlQUFPLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsUUFBUTtZQUNyQyxLQUFLLEVBQUUsSUFBSTtTQUNaLENBQUMsT0FKWSxDQUlYO1FBQ0gsSUFBSSxNQUFNLEVBQUU7WUFDVixFQUFFLGFBQUYsRUFBRSx1QkFBRixFQUFFLENBQUUsSUFBSSxHQUFHO1lBQ1gsTUFBTSxJQUFJLEtBQUssQ0FBQywyQ0FBMkMsQ0FBQyxDQUFDO1NBQzlEO1FBQ0QsRUFBRSxhQUFGLEVBQUUsdUJBQUYsRUFBRSxDQUFFLE9BQU8sR0FBRztJQUNoQixDQUFDO0lBRU8sK0JBQVksR0FBcEI7UUFDRSxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDdkMsQ0FBQztJQUVhLGtDQUFlLEdBQTdCLFVBQThCLElBQUk7Ozs7Z0JBQzFCLElBQUksR0FBRztvQkFDWCxTQUFTLEVBQUU7d0JBQ1QsU0FBUyxFQUFFLElBQUk7cUJBQ2hCO2lCQUNGLENBQUM7Z0JBQ0Ysc0JBQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBQzs7O0tBQ25FO0lBRWEsa0NBQWUsR0FBN0IsVUFBOEIsSUFBSTs7OztnQkFDMUIsSUFBSSxHQUFHO29CQUNYLFNBQVMsRUFBRTt3QkFDVCxVQUFVLEVBQUUsSUFBSTt3QkFDaEIsaUJBQWlCLEVBQUUsUUFBUTtxQkFDNUI7aUJBQ0YsQ0FBQztnQkFDRixzQkFBTyxJQUFJLENBQUMsVUFBVSxDQUFDLGdCQUFjLElBQU0sRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFDOzs7S0FDNUU7SUFFYSw2QkFBVSxHQUF4QixVQUF5QixJQUFJOzs7O2dCQUNyQixJQUFJLEdBQUc7b0JBQ1gsSUFBSSxFQUFFO3dCQUNKLGFBQWEsRUFBRSxJQUFJLENBQUMsU0FBUzt3QkFDN0IsUUFBUSxFQUFFLElBQUk7d0JBQ2QsT0FBTyxFQUFFLGlCQUFpQjt3QkFDMUIsTUFBTSxFQUFFLGlCQUFpQjt3QkFDekIsUUFBUSxFQUFFLFNBQVM7cUJBQ3BCO2lCQUNGLENBQUM7Z0JBQ0Ysc0JBQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBQzs7O0tBQy9EO0lBRWEsMkJBQVEsR0FBdEI7OztnQkFDRSxzQkFBTyxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxFQUFDOzs7S0FDbEM7SUFDSCxlQUFDO0FBQUQsQ0FBQyxBQXhLRCxDQUFzQyxrQkFBYSxHQXdLbEQifQ==