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
var constant_1 = require("../../constant");
var client_1 = __importDefault(require("../client"));
var Component = /** @class */ (function () {
    function Component() {
    }
    Component.getZoneId = function (region, profile) {
        return __awaiter(this, void 0, void 0, function () {
            var fc, fcRs, ex_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        fc = client_1.default.fc(region, profile);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, fc.getAccountSettings()];
                    case 2:
                        fcRs = _a.sent();
                        this.logger.debug("Get account settings response: " + JSON.stringify(fcRs));
                        return [2 /*return*/, fcRs.data.availableAZs[0]];
                    case 3:
                        ex_1 = _a.sent();
                        throw ex_1;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Component.tryContainerAcceleration = function (profile, properties) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function () {
            var region, serviceName, functionName, customContainerConfig, fc, ex_2;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        region = properties.region;
                        serviceName = (_a = properties.service) === null || _a === void 0 ? void 0 : _a.name;
                        functionName = ((_b = properties.function) === null || _b === void 0 ? void 0 : _b.name) || serviceName;
                        customContainerConfig = (_c = properties.function) === null || _c === void 0 ? void 0 : _c.customContainerConfig;
                        if (!serviceName || !customContainerConfig) {
                            return [2 /*return*/];
                        }
                        fc = client_1.default.fc(region, profile);
                        _d.label = 1;
                    case 1:
                        _d.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, fc.updateFunction(serviceName, functionName, {
                                customContainerConfig: __assign({ accelerationType: 'Default' }, customContainerConfig)
                            })];
                    case 2:
                        _d.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        ex_2 = _d.sent();
                        this.logger.debug("Try container acceleration error: " + ex_2);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        core.HLogger(constant_1.CONTEXT),
        __metadata("design:type", Object)
    ], Component, "logger", void 0);
    return Component;
}());
exports.default = Component;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL2ZyYW1ld29yay9mYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDBEQUE4QztBQUU5QywyQ0FBeUM7QUFFekMscURBQStCO0FBRy9CO0lBQUE7SUFvQ0EsQ0FBQztJQWpDYyxtQkFBUyxHQUF0QixVQUF1QixNQUFjLEVBQUUsT0FBcUI7Ozs7Ozt3QkFDcEQsRUFBRSxHQUFHLGdCQUFNLENBQUMsRUFBRSxDQUFDLE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FBQzs7Ozt3QkFHdkIscUJBQU0sRUFBRSxDQUFDLGtCQUFrQixFQUFFLEVBQUE7O3dCQUFwQyxJQUFJLEdBQUcsU0FBNkI7d0JBQzFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLG9DQUFrQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBRyxDQUFDLENBQUM7d0JBQzVFLHNCQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxFQUFDOzs7d0JBRWpDLE1BQU0sSUFBRSxDQUFDOzs7OztLQUVaO0lBRVksa0NBQXdCLEdBQXJDLFVBQXNDLE9BQXFCLEVBQUUsVUFBdUI7Ozs7Ozs7d0JBQzVFLE1BQU0sR0FBRyxVQUFVLENBQUMsTUFBTSxDQUFDO3dCQUMzQixXQUFXLFNBQUcsVUFBVSxDQUFDLE9BQU8sMENBQUUsSUFBSSxDQUFDO3dCQUN2QyxZQUFZLEdBQUcsT0FBQSxVQUFVLENBQUMsUUFBUSwwQ0FBRSxJQUFJLEtBQUksV0FBVyxDQUFDO3dCQUN4RCxxQkFBcUIsU0FBRyxVQUFVLENBQUMsUUFBUSwwQ0FBRSxxQkFBcUIsQ0FBQzt3QkFDekUsSUFBSSxDQUFDLFdBQVcsSUFBSSxDQUFDLHFCQUFxQixFQUFFOzRCQUMxQyxzQkFBTzt5QkFDUjt3QkFFSyxFQUFFLEdBQUcsZ0JBQU0sQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxDQUFDOzs7O3dCQUVwQyxxQkFBTSxFQUFFLENBQUMsY0FBYyxDQUFDLFdBQVcsRUFBRSxZQUFZLEVBQUU7Z0NBQ2pELHFCQUFxQixhQUNuQixnQkFBZ0IsRUFBRSxTQUFTLElBQ3hCLHFCQUFxQixDQUN6Qjs2QkFDRixDQUFDLEVBQUE7O3dCQUxGLFNBS0UsQ0FBQzs7Ozt3QkFFSCxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyx1Q0FBcUMsSUFBSSxDQUFDLENBQUM7Ozs7OztLQUVoRTtJQWxDc0I7UUFBdEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxrQkFBTyxDQUFDOzttQ0FBNkI7SUFtQ3JELGdCQUFDO0NBQUEsQUFwQ0QsSUFvQ0M7a0JBcENvQixTQUFTIn0=