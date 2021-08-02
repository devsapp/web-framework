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
Object.defineProperty(exports, "__esModule", { value: true });
var constant_1 = require("../../constant");
var utils_1 = require("../utils");
var Component = /** @class */ (function () {
    function Component() {
    }
    Component.transform = function (inputs) {
        inputs.project.component = 'fc-logs';
        var _a = inputs.props, region = _a.region, service = _a.service, functionConfig = _a.function;
        var accountID = inputs.credentials.AccountID;
        var topic = service.name;
        var query = (functionConfig.name || topic) + " | with_pack_meta";
        var autoName = constant_1.getAutoName(accountID, region, topic);
        return __assign(__assign({}, inputs), { props: {
                region: region,
                topic: topic,
                query: query,
                logConfig: utils_1.getLogConfig(service.logConfig, autoName),
            } });
    };
    return Component;
}());
exports.default = Component;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG8tbG9ncy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvdHJhbnNmb3JtL3RvLWxvZ3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUVBLDJDQUE2QztBQUM3QyxrQ0FBd0M7QUFFeEM7SUFBQTtJQXNCQSxDQUFDO0lBckJRLG1CQUFTLEdBQWhCLFVBQWlCLE1BQWU7UUFDOUIsTUFBTSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO1FBRS9CLElBQUEsS0FBdUUsTUFBTSxDQUFDLEtBQUssRUFBakYsTUFBTSxZQUFBLEVBQUUsT0FBTyxhQUFBLEVBQVksY0FBYyxjQUF3QyxDQUFDO1FBQzFGLElBQU0sU0FBUyxHQUFHLE1BQU0sQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDO1FBRS9DLElBQU0sS0FBSyxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUM7UUFDM0IsSUFBTSxLQUFLLEdBQUcsQ0FBRyxjQUFjLENBQUMsSUFBSSxJQUFJLEtBQUssdUJBQW1CLENBQUM7UUFFakUsSUFBTSxRQUFRLEdBQUcsc0JBQVcsQ0FBQyxTQUFTLEVBQUUsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBRXZELDZCQUNLLE1BQU0sS0FDVCxLQUFLLEVBQUU7Z0JBQ0wsTUFBTSxRQUFBO2dCQUNOLEtBQUssT0FBQTtnQkFDTCxLQUFLLE9BQUE7Z0JBQ0wsU0FBUyxFQUFFLG9CQUFZLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxRQUFRLENBQUM7YUFDckQsSUFDRDtJQUNKLENBQUM7SUFDSCxnQkFBQztBQUFELENBQUMsQUF0QkQsSUFzQkMifQ==