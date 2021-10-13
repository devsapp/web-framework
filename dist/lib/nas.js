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
                        if (!src) return [3 /*break*/, 10];
                        return [4 /*yield*/, fs_extra_1.default.pathExists(src)];
                    case 4:
                        if (!(_b.sent())) {
                            throw new Error("Src path: " + src + " not exists.");
                        }
                        return [4 /*yield*/, fs_extra_1.default.lstat(src)];
                    case 5:
                        if (!(_b.sent()).isFile()) return [3 /*break*/, 7];
                        // mkdir nas:///${inputs.props.nasDir}/${functionName}
                        inputs.args = "mkdir -p nas:///" + inputs.props.nasDir + "/" + functionName;
                        return [4 /*yield*/, nas.command(inputs)];
                    case 6:
                        _b.sent();
                        inputs.args = src + " nas:///" + inputs.props.nasDir + "/" + functionName + "/" + path_1.default.basename(src);
                        return [3 /*break*/, 8];
                    case 7:
                        inputs.args = "-r " + src + " nas:///" + inputs.props.nasDir + "/" + functionName;
                        _b.label = 8;
                    case 8:
                        logger_1.default.debug("Cp cmd is: " + inputs.args);
                        return [4 /*yield*/, nas.cp(inputs)];
                    case 9:
                        _b.sent();
                        _b.label = 10;
                    case 10: return [2 /*return*/, inputs.props];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmFzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2xpYi9uYXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwwREFBOEM7QUFDOUMsa0RBQXVCO0FBQ3ZCLDhDQUF3QjtBQUN4QixzREFBMkI7QUFDM0Isb0RBQThCO0FBRTlCLDREQUFzQztBQU90QztJQUFBO0lBcUpBLENBQUM7SUFwSmMsZ0JBQU0sR0FBbkIsVUFBb0IsSUFBVSxFQUFFLFdBQW1CLEVBQUUsWUFBb0I7Ozs7Ozt3QkFDakUsWUFBWSxHQUFHLGNBQUksQ0FBQyxJQUFJLENBQzVCLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFDYixJQUFJLEVBQ0osT0FBTyxFQUNQLFdBQVcsRUFDWCxXQUFXLEVBQ1gsWUFBWSxDQUNiLENBQUM7d0JBRUUscUJBQU0sa0JBQUcsQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLEVBQUE7O3dCQUF0QyxJQUFJLFNBQWtDLEVBQUU7NEJBQ3RDLHNCQUFPLFlBQVksRUFBQzt5QkFDckI7d0JBRUQsc0JBQU8sSUFBSSxDQUFDLEdBQUcsRUFBQzs7OztLQUNqQjtJQUVZLGNBQUksR0FBakIsVUFBa0IsVUFBdUIsRUFBRSxRQUFpQjs7Ozs7O3dCQUNwRCxXQUFXLEdBQUcsVUFBVSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUM7d0JBQ3RDLFlBQVksR0FBRyxVQUFVLENBQUMsUUFBUSxDQUFDLElBQUksSUFBSSxXQUFXLENBQUM7d0JBQ2pELHFCQUFNLElBQUksQ0FBQyxNQUFNLENBQzNCLFVBQVUsQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUN4QixXQUFXLEVBQ1gsWUFBWSxDQUNiLEVBQUE7O3dCQUpLLEdBQUcsR0FBRyxTQUlYO3dCQUNELGdCQUFNLENBQUMsSUFBSSxDQUFDLCtCQUE2QixHQUFLLENBQUMsQ0FBQzt3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