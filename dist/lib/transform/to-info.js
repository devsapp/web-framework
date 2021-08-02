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
var Component = /** @class */ (function () {
    function Component() {
    }
    Component.transform = function (inputs) {
        inputs.project.component = 'fc-info';
        // @ts-ignore
        var _a = inputs.props, region = _a.region, service = _a.service, functionConfig = _a.function, trigger = _a.trigger;
        var serviceName = service.name;
        var functionName = functionConfig.name || serviceName;
        var triggerNames = trigger && trigger.name ? [trigger.name] : [serviceName];
        return __assign(__assign({}, inputs), { props: {
                region: region,
                serviceName: serviceName,
                functionName: functionName,
                triggerNames: triggerNames,
            } });
    };
    return Component;
}());
exports.default = Component;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG8taW5mby5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvdHJhbnNmb3JtL3RvLWluZm8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUVBO0lBQUE7SUF1QkEsQ0FBQztJQXRCUSxtQkFBUyxHQUFoQixVQUFpQixNQUF5QjtRQUN4QyxNQUFNLENBQUMsT0FBTyxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7UUFFckMsYUFBYTtRQUNQLElBQUEsS0FBeUQsTUFBTSxDQUFDLEtBQUssRUFBbkUsTUFBTSxZQUFBLEVBQUUsT0FBTyxhQUFBLEVBQVksY0FBYyxjQUFBLEVBQUUsT0FBTyxhQUFpQixDQUFDO1FBRTVFLElBQU0sV0FBVyxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUM7UUFDakMsSUFBTSxZQUFZLEdBQUcsY0FBYyxDQUFDLElBQUksSUFBSSxXQUFXLENBQUM7UUFHeEQsSUFBTSxZQUFZLEdBQUcsT0FBTyxJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBRTlFLDZCQUNLLE1BQU0sS0FDVCxLQUFLLEVBQUU7Z0JBQ0wsTUFBTSxRQUFBO2dCQUNOLFdBQVcsYUFBQTtnQkFDWCxZQUFZLGNBQUE7Z0JBQ1osWUFBWSxjQUFBO2FBQ2IsSUFDRDtJQUNKLENBQUM7SUFDSCxnQkFBQztBQUFELENBQUMsQUF2QkQsSUF1QkMifQ==