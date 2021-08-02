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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
var path_1 = __importDefault(require("path"));
var fs_extra_1 = __importDefault(require("fs-extra"));
var client_1 = __importDefault(require("./client"));
var logger_1 = __importDefault(require("../common/logger"));
var Component = /** @class */ (function () {
    function Component() {
    }
    Component.getSrc = function (code, serviceName, functionName) {
        return __awaiter(this, void 0, void 0, function () {
            var buildCodeUri;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        buildCodeUri = path_1.default.join(process.cwd(), '.s', 'build', 'artifacts', serviceName, functionName);
                        return [4 /*yield*/, fs_extra_1.default.pathExists(buildCodeUri)];
                    case 1:
                        if (_a.sent()) {
                            return [2 /*return*/, buildCodeUri];
                        }
                        return [2 /*return*/, code.src];
                }
            });
        });
    };
    Component.init = function (properties, v1Inputs) {
        return __awaiter(this, void 0, void 0, function () {
            var serviceName, functionName, src, _a, inputs, nas;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        serviceName = properties.service.name;
                        functionName = properties.function.name || serviceName;
                        return [4 /*yield*/, this.getSrc(properties.function.code, serviceName, functionName)];
                    case 1:
                        src = _b.sent();
                        logger_1.default.info("nas component get src is: " + src);
                        return [4 /*yield*/, this.transfromInputs(properties, v1Inputs)];
                    case 2:
                        _a = _b.sent(), inputs = _a.inputs, nas = _a.nas;
                        return [4 /*yield*/, nas.deploy(inputs)];
                    case 3:
                        _b.sent();
                        if (!src) return [3 /*break*/, 5];
                        inputs.args = "-r " + src + " nas:///" + inputs.props.nasDir + "/" + functionName;
                        logger_1.default.debug("Cp cmd is: " + inputs.args);
                        return [4 /*yield*/, nas.cp(inputs)];
                    case 4:
                        _b.sent();
                        _b.label = 5;
                    case 5: return [2 /*return*/, inputs.props];
                }
            });
        });
    };
    Component.remove = function (properties, v1Inputs) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, inputs, nas;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.transfromInputs(properties, v1Inputs)];
                    case 1:
                        _a = _b.sent(), inputs = _a.inputs, nas = _a.nas;
                        logger_1.default.debug("Remove cmd is: " + inputs.args);
                        return [4 /*yield*/, nas.remove(inputs)];
                    case 2:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Component.cp = function (properties, v1Inputs) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, inputs, nas;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.transfromInputs(properties, v1Inputs)];
                    case 1:
                        _a = _b.sent(), inputs = _a.inputs, nas = _a.nas;
                        logger_1.default.debug("Cp cmd is: " + inputs.args);
                        return [4 /*yield*/, nas.cp(inputs)];
                    case 2:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Component.ls = function (properties, v1Inputs) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, inputs, nas;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.transfromInputs(properties, v1Inputs)];
                    case 1:
                        _a = _b.sent(), inputs = _a.inputs, nas = _a.nas;
                        logger_1.default.debug("Ls cmd is: " + inputs.args);
                        return [4 /*yield*/, nas.ls(inputs)];
                    case 2:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Component.rm = function (properties, v1Inputs) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, inputs, nas;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.transfromInputs(properties, v1Inputs)];
                    case 1:
                        _a = _b.sent(), inputs = _a.inputs, nas = _a.nas;
                        logger_1.default.debug("Rm cmd is: " + inputs.args);
                        return [4 /*yield*/, nas.rm(inputs)];
                    case 2:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Component.command = function (properties, v1Inputs) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, inputs, nas;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.transfromInputs(properties, v1Inputs)];
                    case 1:
                        _a = _b.sent(), inputs = _a.inputs, nas = _a.nas;
                        logger_1.default.debug("Command cmd is: " + inputs.args);
                        return [4 /*yield*/, nas.command(inputs)];
                    case 2:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Component.transfromInputs = function (properties, inputs) {
        return __awaiter(this, void 0, void 0, function () {
            var region, serviceName, excludes, credentials, nasProperties, nas;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        region = properties.region;
                        serviceName = properties.service.name;
                        excludes = (properties.function.code || {}).excludes;
                        return [4 /*yield*/, core.getCredential(inputs.project.access)];
                    case 1:
                        credentials = _a.sent();
                        return [4 /*yield*/, this.getNasProperties(region, serviceName, credentials, excludes)];
                    case 2:
                        nasProperties = _a.sent();
                        logger_1.default.debug("Nas properties is: " + JSON.stringify(nasProperties));
                        inputs.project.component = 'nas';
                        return [4 /*yield*/, core.loadComponent('devsapp/nas')];
                    case 3:
                        nas = _a.sent();
                        return [2 /*return*/, {
                                nas: nas,
                                inputs: __assign(__assign({}, inputs), { props: nasProperties }),
                            }];
                }
            });
        });
    };
    Component.getNasProperties = function (regionId, serviceName, credentials, excludes) {
        return __awaiter(this, void 0, void 0, function () {
            var fc, _a, role, vpcConfig, nasConfig, vpcId, vSwitchIds, securityGroupId, userId, groupId, mountPoints, _b, mountPointDomain, nasDir;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        fc = client_1.default.fc(regionId, credentials);
                        return [4 /*yield*/, fc.getService(serviceName)];
                    case 1:
                        _a = (_c.sent()).data, role = _a.role, vpcConfig = _a.vpcConfig, nasConfig = _a.nasConfig;
                        vpcId = vpcConfig.vpcId, vSwitchIds = vpcConfig.vSwitchIds, securityGroupId = vpcConfig.securityGroupId;
                        if (!vpcId) {
                            throw new Error("Service " + serviceName + " is configured for query to vpc");
                        }
                        userId = nasConfig.userId, groupId = nasConfig.groupId, mountPoints = nasConfig.mountPoints;
                        if (lodash_1.default.isEmpty(mountPoints)) {
                            throw new Error("Service " + serviceName + " is configured for query to nas");
                        }
                        _b = mountPoints[0].serverAddr.split(':/'), mountPointDomain = _b[0], nasDir = _b[1];
                        return [2 /*return*/, {
                                regionId: regionId,
                                serviceName: "_FC_NAS_" + serviceName,
                                description: "service for fc nas used for service " + serviceName,
                                vpcId: vpcId,
                                vSwitchId: vSwitchIds[0],
                                securityGroupId: securityGroupId,
                                role: role,
                                userId: userId,
                                groupId: groupId,
                                mountPointDomain: mountPointDomain,
                                nasDir: nasDir,
                                excludes: excludes,
                            }];
                }
            });
        });
    };
    return Component;
}());
exports.default = Component;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmFzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2xpYi9uYXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwwREFBOEM7QUFDOUMsa0RBQXVCO0FBQ3ZCLDhDQUF3QjtBQUN4QixzREFBMkI7QUFDM0Isb0RBQThCO0FBRTlCLDREQUFzQztBQU90QztJQUFBO0lBMklBLENBQUM7SUExSWMsZ0JBQU0sR0FBbkIsVUFBb0IsSUFBVSxFQUFFLFdBQW1CLEVBQUUsWUFBb0I7Ozs7Ozt3QkFDakUsWUFBWSxHQUFHLGNBQUksQ0FBQyxJQUFJLENBQzVCLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFDYixJQUFJLEVBQ0osT0FBTyxFQUNQLFdBQVcsRUFDWCxXQUFXLEVBQ1gsWUFBWSxDQUNiLENBQUM7d0JBRUUscUJBQU0sa0JBQUcsQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLEVBQUE7O3dCQUF0QyxJQUFJLFNBQWtDLEVBQUU7NEJBQ3RDLHNCQUFPLFlBQVksRUFBQzt5QkFDckI7d0JBRUQsc0JBQU8sSUFBSSxDQUFDLEdBQUcsRUFBQzs7OztLQUNqQjtJQUVZLGNBQUksR0FBakIsVUFBa0IsVUFBdUIsRUFBRSxRQUFpQjs7Ozs7O3dCQUNwRCxXQUFXLEdBQUcsVUFBVSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUM7d0JBQ3RDLFlBQVksR0FBRyxVQUFVLENBQUMsUUFBUSxDQUFDLElBQUksSUFBSSxXQUFXLENBQUM7d0JBQ2pELHFCQUFNLElBQUksQ0FBQyxNQUFNLENBQzNCLFVBQVUsQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUN4QixXQUFXLEVBQ1gsWUFBWSxDQUNiLEVBQUE7O3dCQUpLLEdBQUcsR0FBRyxTQUlYO3dCQUNELGdCQUFNLENBQUMsSUFBSSxDQUFDLCtCQUE2QixHQUFLLENBQUMsQ0FBQzt3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