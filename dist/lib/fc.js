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
var client_1 = __importDefault(require("./client"));
var logger_1 = __importDefault(require("../common/logger"));
var Component = /** @class */ (function () {
    function Component() {
    }
    Component.listVersions = function (profile, region, serviceName) {
        return __awaiter(this, void 0, void 0, function () {
            var fc;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        fc = client_1.default.fc(region, profile);
                        return [4 /*yield*/, fc.listVersions(serviceName)];
                    case 1: return [2 /*return*/, (_a.sent()).data.versions];
                }
            });
        });
    };
    Component.publishVersion = function (profile, region, serviceName, description) {
        return __awaiter(this, void 0, void 0, function () {
            var fc;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        fc = client_1.default.fc(region, profile);
                        return [4 /*yield*/, fc.publishVersion(serviceName, description)];
                    case 1: return [2 /*return*/, (_a.sent()).data];
                }
            });
        });
    };
    Component.deleteVersion = function (profile, region, serviceName, versionId) {
        return __awaiter(this, void 0, void 0, function () {
            var fc;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        fc = client_1.default.fc(region, profile);
                        return [4 /*yield*/, fc.deleteVersion(serviceName, versionId)];
                    case 1: return [2 /*return*/, (_a.sent()).data];
                }
            });
        });
    };
    Component.tryContainerAcceleration = function (profile, region, serviceName, functionName, customContainerConfig) {
        return __awaiter(this, void 0, void 0, function () {
            var fc, ex_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!serviceName || !customContainerConfig) {
                            return [2 /*return*/];
                        }
                        fc = client_1.default.fc(region, profile);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, fc.updateFunction(serviceName, functionName, {
                                customContainerConfig: __assign({ accelerationType: 'Default' }, customContainerConfig),
                            })];
                    case 2:
                        _a.sent();
                        logger_1.default.debug('Try container acceleration success.');
                        return [2 /*return*/, true];
                    case 3:
                        ex_1 = _a.sent();
                        logger_1.default.debug("Try container acceleration error: " + ex_1);
                        return [2 /*return*/, false];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return Component;
}());
exports.default = Component;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbGliL2ZjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvREFBOEI7QUFDOUIsNERBQXNDO0FBRXRDO0lBQUE7SUF1Q0EsQ0FBQztJQXRDYyxzQkFBWSxHQUF6QixVQUEwQixPQUFPLEVBQUUsTUFBYyxFQUFFLFdBQW1COzs7Ozs7d0JBQzlELEVBQUUsR0FBRyxnQkFBTSxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDLENBQUM7d0JBRTlCLHFCQUFNLEVBQUUsQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLEVBQUE7NEJBQTFDLHNCQUFPLENBQUMsU0FBa0MsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUM7Ozs7S0FDM0Q7SUFFWSx3QkFBYyxHQUEzQixVQUE0QixPQUFPLEVBQUUsTUFBYyxFQUFFLFdBQW1CLEVBQUUsV0FBWTs7Ozs7O3dCQUM5RSxFQUFFLEdBQUcsZ0JBQU0sQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxDQUFDO3dCQUU5QixxQkFBTSxFQUFFLENBQUMsY0FBYyxDQUFDLFdBQVcsRUFBRSxXQUFXLENBQUMsRUFBQTs0QkFBekQsc0JBQU8sQ0FBQyxTQUFpRCxDQUFDLENBQUMsSUFBSSxFQUFDOzs7O0tBQ2pFO0lBRVksdUJBQWEsR0FBMUIsVUFBMkIsT0FBTyxFQUFFLE1BQWMsRUFBRSxXQUFtQixFQUFFLFNBQVM7Ozs7Ozt3QkFDMUUsRUFBRSxHQUFHLGdCQUFNLENBQUMsRUFBRSxDQUFDLE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FBQzt3QkFFOUIscUJBQU0sRUFBRSxDQUFDLGFBQWEsQ0FBQyxXQUFXLEVBQUUsU0FBUyxDQUFDLEVBQUE7NEJBQXRELHNCQUFPLENBQUMsU0FBOEMsQ0FBQyxDQUFDLElBQUksRUFBQzs7OztLQUM5RDtJQUVZLGtDQUF3QixHQUFyQyxVQUFzQyxPQUFPLEVBQUUsTUFBYyxFQUFFLFdBQW1CLEVBQUUsWUFBb0IsRUFBRSxxQkFBcUI7Ozs7Ozt3QkFDN0gsSUFBSSxDQUFDLFdBQVcsSUFBSSxDQUFDLHFCQUFxQixFQUFFOzRCQUMxQyxzQkFBTzt5QkFDUjt3QkFFSyxFQUFFLEdBQUcsZ0JBQU0sQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxDQUFDOzs7O3dCQUVwQyxxQkFBTSxFQUFFLENBQUMsY0FBYyxDQUFDLFdBQVcsRUFBRSxZQUFZLEVBQUU7Z0NBQ2pELHFCQUFxQixhQUNuQixnQkFBZ0IsRUFBRSxTQUFTLElBQ3hCLHFCQUFxQixDQUN6Qjs2QkFDRixDQUFDLEVBQUE7O3dCQUxGLFNBS0UsQ0FBQzt3QkFDSCxnQkFBTSxDQUFDLEtBQUssQ0FBQyxxQ0FBcUMsQ0FBQyxDQUFDO3dCQUNwRCxzQkFBTyxJQUFJLEVBQUM7Ozt3QkFFWixnQkFBTSxDQUFDLEtBQUssQ0FBQyx1Q0FBcUMsSUFBSSxDQUFDLENBQUM7d0JBQ3hELHNCQUFPLEtBQUssRUFBQzs7Ozs7S0FFaEI7SUFDSCxnQkFBQztBQUFELENBQUMsQUF2Q0QsSUF1Q0MifQ==