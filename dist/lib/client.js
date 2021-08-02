"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fc2_1 = __importDefault(require("@alicloud/fc2"));
var pop_core_1 = __importDefault(require("@alicloud/pop-core"));
var fc_endpoint_1 = __importDefault(require("./fc-endpoint"));
var Component = /** @class */ (function () {
    function Component() {
    }
    Component.fc = function (region, profile) {
        fc2_1.default.prototype.getAccountSettings = function (options, headers) {
            if (options === void 0) { options = {}; }
            if (headers === void 0) { headers = {}; }
            return this.get('/account-settings', options, headers);
        };
        return new fc2_1.default(profile.AccountID, {
            region: region,
            accessKeyID: profile.AccessKeyID,
            accessKeySecret: profile.AccessKeySecret,
            securityToken: profile.SecurityToken,
            endpoint: fc_endpoint_1.default.endpoint || "https://" + profile.AccountID + "." + region + ".fc.aliyuncs.com",
            timeout: 6000000,
        });
    };
    Component.pop = function (endpoint, profile) {
        return new pop_core_1.default({
            endpoint: endpoint,
            apiVersion: '2017-06-26',
            accessKeyId: profile.AccessKeyID,
            // @ts-ignore
            securityToken: profile.SecurityToken,
            accessKeySecret: profile.AccessKeySecret,
        });
    };
    return Component;
}());
exports.default = Component;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2xpYi9jbGllbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxzREFBK0I7QUFDL0IsZ0VBQXFDO0FBRXJDLDhEQUF1QztBQUV2QztJQUFBO0lBMEJBLENBQUM7SUF6QlEsWUFBRSxHQUFULFVBQVUsTUFBYyxFQUFFLE9BQXFCO1FBQzdDLGFBQUUsQ0FBQyxTQUFTLENBQUMsa0JBQWtCLEdBQUcsVUFBVSxPQUFZLEVBQUUsT0FBWTtZQUExQix3QkFBQSxFQUFBLFlBQVk7WUFBRSx3QkFBQSxFQUFBLFlBQVk7WUFDcEUsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLG1CQUFtQixFQUFFLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQztRQUN6RCxDQUFDLENBQUM7UUFFRixPQUFPLElBQUksYUFBRSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUU7WUFDL0IsTUFBTSxRQUFBO1lBQ04sV0FBVyxFQUFFLE9BQU8sQ0FBQyxXQUFXO1lBQ2hDLGVBQWUsRUFBRSxPQUFPLENBQUMsZUFBZTtZQUN4QyxhQUFhLEVBQUUsT0FBTyxDQUFDLGFBQWE7WUFDcEMsUUFBUSxFQUFFLHFCQUFVLENBQUMsUUFBUSxJQUFJLGFBQVcsT0FBTyxDQUFDLFNBQVMsU0FBSSxNQUFNLHFCQUFrQjtZQUN6RixPQUFPLEVBQUUsT0FBTztTQUNqQixDQUFDLENBQUM7SUFDTCxDQUFDO0lBRU0sYUFBRyxHQUFWLFVBQVcsUUFBZ0IsRUFBRSxPQUFxQjtRQUNoRCxPQUFPLElBQUksa0JBQUcsQ0FBQztZQUNiLFFBQVEsVUFBQTtZQUNSLFVBQVUsRUFBRSxZQUFZO1lBQ3hCLFdBQVcsRUFBRSxPQUFPLENBQUMsV0FBVztZQUNoQyxhQUFhO1lBQ2IsYUFBYSxFQUFFLE9BQU8sQ0FBQyxhQUFhO1lBQ3BDLGVBQWUsRUFBRSxPQUFPLENBQUMsZUFBZTtTQUN6QyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBQ0gsZ0JBQUM7QUFBRCxDQUFDLEFBMUJELElBMEJDIn0=