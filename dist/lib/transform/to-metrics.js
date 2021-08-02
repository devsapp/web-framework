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
        inputs.project.component = 'fc-metrics';
        var _a = inputs.props, region = _a.region, service = _a.service, functionConfig = _a.function;
        var serviceName = service.name;
        var functionName = functionConfig.name || serviceName;
        return __assign(__assign({}, inputs), { props: {
                region: region,
                serviceName: serviceName,
                functionName: functionName,
            } });
    };
    return Component;
}());
exports.default = Component;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG8tbWV0cmljcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvdHJhbnNmb3JtL3RvLW1ldHJpY3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUVBO0lBQUE7SUFrQkEsQ0FBQztJQWpCUSxtQkFBUyxHQUFoQixVQUFpQixNQUF5QjtRQUN4QyxNQUFNLENBQUMsT0FBTyxDQUFDLFNBQVMsR0FBRyxZQUFZLENBQUM7UUFFbEMsSUFBQSxLQUFnRCxNQUFNLENBQUMsS0FBSyxFQUExRCxNQUFNLFlBQUEsRUFBRSxPQUFPLGFBQUEsRUFBWSxjQUFjLGNBQWlCLENBQUM7UUFFbkUsSUFBTSxXQUFXLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQztRQUNqQyxJQUFNLFlBQVksR0FBRyxjQUFjLENBQUMsSUFBSSxJQUFJLFdBQVcsQ0FBQztRQUV4RCw2QkFDSyxNQUFNLEtBQ1QsS0FBSyxFQUFFO2dCQUNMLE1BQU0sUUFBQTtnQkFDTixXQUFXLGFBQUE7Z0JBQ1gsWUFBWSxjQUFBO2FBQ2IsSUFDRDtJQUNKLENBQUM7SUFDSCxnQkFBQztBQUFELENBQUMsQUFsQkQsSUFrQkMifQ==