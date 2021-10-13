"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
var core = __importStar(require("@serverless-devs/core"));
var lodash_1 = __importDefault(require("lodash"));
var fs_extra_1 = __importDefault(require("fs-extra"));
var constant_1 = require("../constant");
var utils_1 = require("./utils");
function readCertFile(filePath) {
    if (filePath === void 0) { filePath = ''; }
    return __awaiter(this, void 0, void 0, function () {
        var cert;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fs_extra_1.default.pathExists(filePath)];
                case 1:
                    if (!_a.sent()) return [3 /*break*/, 3];
                    if (filePath.endsWith('.pom')) {
                        throw new Error('');
                    }
                    return [4 /*yield*/, fs_extra_1.default.readFile(filePath, 'utf-8')];
                case 2:
                    cert = _a.sent();
                    if (cert.endsWith('\n')) {
                        return [2 /*return*/, cert.slice(0, -2)];
                    }
                    return [2 /*return*/, cert];
                case 3: return [2 /*return*/, filePath];
            }
        });
    });
}
var Component = /** @class */ (function () {
    function Component() {
    }
    Component.get = function (inputs) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, customDomains, service, functionConfig, serviceName, functionName, domainName, domain, domainConfigs, _i, customDomains_1, domainConfig, domainName, protocol, _b, routeConfigs, certConfig, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _a = inputs.props, customDomains = _a.customDomains, service = _a.service, functionConfig = _a.function;
                        serviceName = service.name;
                        functionName = functionConfig.name || serviceName;
                        if (!!customDomains) return [3 /*break*/, 2];
                        this.logger.info('The configuration of the domain name is not detected, and a temporary domain name is generated.');
                        return [4 /*yield*/, this.getAutoDomain(inputs, serviceName, functionName)];
                    case 1:
                        domainName = _e.sent();
                        return [2 /*return*/, [{
                                    domainName: domainName,
                                    protocol: 'HTTP',
                                    routeConfigs: [
                                        {
                                            serviceName: serviceName,
                                            functionName: functionName,
                                            qualifier: 'LATEST',
                                            methods: ['GET', 'POST'],
                                            path: '/*',
                                        },
                                    ],
                                }]];
                    case 2:
                        if (!lodash_1.default.isArray(customDomains)) {
                            throw new Error('customDomains configuration error.');
                        }
                        domain = '';
                        domainConfigs = [];
                        _i = 0, customDomains_1 = customDomains;
                        _e.label = 3;
                    case 3:
                        if (!(_i < customDomains_1.length)) return [3 /*break*/, 13];
                        domainConfig = customDomains_1[_i];
                        domainName = domainConfig.domainName, protocol = domainConfig.protocol, _b = domainConfig.routeConfigs, routeConfigs = _b === void 0 ? [] : _b, certConfig = domainConfig.certConfig;
                        if (!!domainName) return [3 /*break*/, 4];
                        throw new Error('customDomains configuration domainName is need.');
                    case 4:
                        if (!utils_1.isAuto(domainName)) return [3 /*break*/, 8];
                        this.logger.debug('It is detected that the domain configuration is auto.');
                        if (protocol !== 'HTTP') {
                            this.logger.warn('Temporary domain name only supports http protocol.');
                        }
                        if (!!domain) return [3 /*break*/, 6];
                        this.logger.debug('domain name is generated.');
                        return [4 /*yield*/, this.getAutoDomain(inputs, serviceName, functionName)];
                    case 5:
                        domain = _e.sent();
                        return [3 /*break*/, 7];
                    case 6:
                        this.logger.warn("Multiple domainName: " + domain);
                        _e.label = 7;
                    case 7:
                        domainConfigs.push({
                            domainName: domain,
                            protocol: 'HTTP',
                            routeConfigs: routeConfigs.map(function (item) { return (__assign({ serviceName: serviceName,
                                functionName: functionName, qualifier: 'LATEST', methods: ['GET', 'POST'], path: '/*' }, item)); }),
                        });
                        return [3 /*break*/, 12];
                    case 8:
                        domainConfig.routeConfigs = routeConfigs.map(function (item) { return (__assign({ serviceName: serviceName, functionName: functionName }, item)); });
                        if (!certConfig) return [3 /*break*/, 11];
                        _c = certConfig;
                        return [4 /*yield*/, readCertFile(certConfig.certificate)];
                    case 9:
                        _c.certificate = _e.sent();
                        _d = certConfig;
                        return [4 /*yield*/, readCertFile(certConfig.privateKey)];
                    case 10:
                        _d.privateKey = _e.sent();
                        domainConfig.certConfig = certConfig;
                        _e.label = 11;
                    case 11:
                        // @ts-ignore: serviceName 和 functionName 已经被赋值
                        domainConfigs.push(domainConfig);
                        _e.label = 12;
                    case 12:
                        _i++;
                        return [3 /*break*/, 3];
                    case 13: return [2 /*return*/, domainConfigs];
                }
            });
        });
    };
    Component.getAutoDomain = function (inputs, serviceName, functionName) {
        return __awaiter(this, void 0, void 0, function () {
            var domainComponent;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, core.loadComponent('devsapp/domain')];
                    case 1:
                        domainComponent = _a.sent();
                        return [4 /*yield*/, domainComponent.get(__assign(__assign({}, inputs), { props: {
                                    type: 'fc',
                                    user: inputs.credentials.AccountID,
                                    region: inputs.props.region,
                                    service: serviceName,
                                    function: functionName,
                                } }))];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    var _a;
    __decorate([
        core.HLogger(constant_1.CONTEXT),
        __metadata("design:type", typeof (_a = typeof core !== "undefined" && core.ILogger) === "function" ? _a : Object)
    ], Component, "logger", void 0);
    return Component;
}());
exports.default = Component;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9tYWluLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2xpYi9kb21haW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwwREFBOEM7QUFDOUMsa0RBQXVCO0FBQ3ZCLHNEQUEyQjtBQUMzQix3Q0FBc0M7QUFDdEMsaUNBQWlDO0FBZWpDLFNBQWUsWUFBWSxDQUFDLFFBQWE7SUFBYix5QkFBQSxFQUFBLGFBQWE7Ozs7O3dCQUNuQyxxQkFBTSxrQkFBRyxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsRUFBQTs7eUJBQTlCLFNBQThCLEVBQTlCLHdCQUE4QjtvQkFDaEMsSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxFQUFFO3dCQUM3QixNQUFNLElBQUksS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO3FCQUNyQjtvQkFFWSxxQkFBTSxrQkFBRyxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsT0FBTyxDQUFDLEVBQUE7O29CQUE1QyxJQUFJLEdBQUcsU0FBcUM7b0JBRWxELElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRTt3QkFDdkIsc0JBQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBQztxQkFDMUI7b0JBQ0Qsc0JBQU8sSUFBSSxFQUFDO3dCQUdkLHNCQUFPLFFBQVEsRUFBQzs7OztDQUNqQjtBQUVEO0lBQUE7SUE4RkEsQ0FBQztJQTNGYyxhQUFHLEdBQWhCLFVBQWlCLE1BQU07Ozs7Ozt3QkFDZixLQUF1RCxNQUFNLENBQUMsS0FBSyxFQUFqRSxhQUFhLG1CQUFBLEVBQUUsT0FBTyxhQUFBLEVBQVksY0FBYyxjQUFBLENBQWtCO3dCQUNwRSxXQUFXLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQzt3QkFDM0IsWUFBWSxHQUFHLGNBQWMsQ0FBQyxJQUFJLElBQUksV0FBVyxDQUFDOzZCQUVwRCxDQUFDLGFBQWEsRUFBZCx3QkFBYzt3QkFDaEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsaUdBQWlHLENBQUMsQ0FBQzt3QkFDakcscUJBQU0sSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEVBQUUsV0FBVyxFQUFFLFlBQVksQ0FBQyxFQUFBOzt3QkFBeEUsVUFBVSxHQUFHLFNBQTJEO3dCQUU5RSxzQkFBTyxDQUFDO29DQUNOLFVBQVUsWUFBQTtvQ0FDVixRQUFRLEVBQUUsTUFBTTtvQ0FDaEIsWUFBWSxFQUFFO3dDQUNaOzRDQUNFLFdBQVcsYUFBQTs0Q0FDWCxZQUFZLGNBQUE7NENBQ1osU0FBUyxFQUFFLFFBQVE7NENBQ25CLE9BQU8sRUFBRSxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUM7NENBQ3hCLElBQUksRUFBRSxJQUFJO3lDQUNYO3FDQUNGO2lDQUNGLENBQUMsRUFBQzs7d0JBR0wsSUFBSSxDQUFDLGdCQUFDLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxFQUFFOzRCQUM3QixNQUFNLElBQUksS0FBSyxDQUFDLG9DQUFvQyxDQUFDLENBQUM7eUJBQ3ZEO3dCQUVHLE1BQU0sR0FBRyxFQUFFLENBQUM7d0JBQ1YsYUFBYSxHQUFjLEVBQUUsQ0FBQzs4QkFFSSxFQUFiLCtCQUFhOzs7NkJBQWIsQ0FBQSwyQkFBYSxDQUFBO3dCQUE3QixZQUFZO3dCQUNiLFVBQVUsR0FBOEMsWUFBWSxXQUExRCxFQUFFLFFBQVEsR0FBb0MsWUFBWSxTQUFoRCxFQUFFLEtBQWtDLFlBQVksYUFBN0IsRUFBakIsWUFBWSxtQkFBRyxFQUFFLEtBQUEsRUFBRSxVQUFVLEdBQUssWUFBWSxXQUFqQixDQUFrQjs2QkFFekUsQ0FBQyxVQUFVLEVBQVgsd0JBQVc7d0JBQ2IsTUFBTSxJQUFJLEtBQUssQ0FBQyxpREFBaUQsQ0FBQyxDQUFDOzs2QkFDMUQsY0FBTSxDQUFDLFVBQVUsQ0FBQyxFQUFsQix3QkFBa0I7d0JBQzNCLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLHVEQUF1RCxDQUFDLENBQUM7d0JBRTNFLElBQUksUUFBUSxLQUFLLE1BQU0sRUFBRTs0QkFDdkIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsb0RBQW9ELENBQUMsQ0FBQzt5QkFDeEU7NkJBQ0csQ0FBQyxNQUFNLEVBQVAsd0JBQU87d0JBQ1QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsMkJBQTJCLENBQUMsQ0FBQzt3QkFDdEMscUJBQU0sSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEVBQUUsV0FBVyxFQUFFLFlBQVksQ0FBQyxFQUFBOzt3QkFBcEUsTUFBTSxHQUFHLFNBQTJELENBQUM7Ozt3QkFFckUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsMEJBQXdCLE1BQVEsQ0FBQyxDQUFDOzs7d0JBR3JELGFBQWEsQ0FBQyxJQUFJLENBQUM7NEJBQ2pCLFVBQVUsRUFBRSxNQUFNOzRCQUNsQixRQUFRLEVBQUUsTUFBTTs0QkFDaEIsWUFBWSxFQUFFLFlBQVksQ0FBQyxHQUFHLENBQUMsVUFBQyxJQUFJLElBQUssT0FBQSxZQUN2QyxXQUFXLGFBQUE7Z0NBQ1gsWUFBWSxjQUFBLEVBQ1osU0FBUyxFQUFFLFFBQVEsRUFDbkIsT0FBTyxFQUFFLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxFQUN4QixJQUFJLEVBQUUsSUFBSSxJQUNQLElBQUksRUFDUCxFQVB1QyxDQU92QyxDQUFDO3lCQUNKLENBQUMsQ0FBQzs7O3dCQUVILFlBQVksQ0FBQyxZQUFZLEdBQUcsWUFBWSxDQUFDLEdBQUcsQ0FBQyxVQUFDLElBQUksSUFBSyxPQUFBLFlBQUcsV0FBVyxhQUFBLEVBQUUsWUFBWSxjQUFBLElBQUssSUFBSSxFQUFHLEVBQXhDLENBQXdDLENBQUMsQ0FBQzs2QkFDN0YsVUFBVSxFQUFWLHlCQUFVO3dCQUNaLEtBQUEsVUFBVSxDQUFBO3dCQUFlLHFCQUFNLFlBQVksQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLEVBQUE7O3dCQUFuRSxHQUFXLFdBQVcsR0FBRyxTQUEwQyxDQUFDO3dCQUNwRSxLQUFBLFVBQVUsQ0FBQTt3QkFBYyxxQkFBTSxZQUFZLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxFQUFBOzt3QkFBakUsR0FBVyxVQUFVLEdBQUcsU0FBeUMsQ0FBQzt3QkFFbEUsWUFBWSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7Ozt3QkFFdkMsK0NBQStDO3dCQUMvQyxhQUFhLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDOzs7d0JBdkNWLElBQWEsQ0FBQTs7NkJBMkN4QyxzQkFBTyxhQUFhLEVBQUM7Ozs7S0FDdEI7SUFFWSx1QkFBYSxHQUExQixVQUEyQixNQUFNLEVBQUUsV0FBbUIsRUFBRSxZQUFvQjs7Ozs7NEJBQ2xELHFCQUFNLElBQUksQ0FBQyxhQUFhLENBQUMsZ0JBQWdCLENBQUMsRUFBQTs7d0JBQTVELGVBQWUsR0FBRyxTQUEwQzt3QkFFM0QscUJBQU0sZUFBZSxDQUFDLEdBQUcsdUJBQzNCLE1BQU0sS0FDVCxLQUFLLEVBQUU7b0NBQ0wsSUFBSSxFQUFFLElBQUk7b0NBQ1YsSUFBSSxFQUFFLE1BQU0sQ0FBQyxXQUFXLENBQUMsU0FBUztvQ0FDbEMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTTtvQ0FDM0IsT0FBTyxFQUFFLFdBQVc7b0NBQ3BCLFFBQVEsRUFBRSxZQUFZO2lDQUN2QixJQUNELEVBQUE7NEJBVEYsc0JBQU8sU0FTTCxFQUFDOzs7O0tBQ0o7O0lBNUZzQjtRQUF0QixJQUFJLENBQUMsT0FBTyxDQUFDLGtCQUFPLENBQUM7c0RBQWdCLElBQUksb0JBQUosSUFBSSxDQUFDLE9BQU87bUNBQUM7SUE2RnJELGdCQUFDO0NBQUEsQUE5RkQsSUE4RkM7a0JBOUZvQixTQUFTIn0=