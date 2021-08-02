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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var logger_1 = __importDefault(require("../../common/logger"));
var constant_1 = require("../../constant");
var ToFc = /** @class */ (function () {
    function ToFc() {
    }
    ToFc.transform = function (props, deployType) {
        delete props.runtime;
        var service = this.service(props.service, deployType);
        logger_1.default.debug("service: " + JSON.stringify(service));
        var functionConfig = this.function(service.name, props.function);
        logger_1.default.debug("function: " + JSON.stringify(functionConfig));
        var triggers = this.triggers(service.name, props.trigger);
        return {
            service: service,
            triggers: triggers,
            region: props.region,
            function: functionConfig,
        };
    };
    ToFc.service = function (service, deployType) {
        if (!service.name) {
            throw new Error('service.name required.');
        }
        if (deployType === 'container') {
            return __assign({}, service);
        }
        else {
            return __assign({ vpcConfig: 'auto', nasConfig: 'auto' }, service);
        }
    };
    ToFc.function = function (serviceName, functionConfig) {
        delete functionConfig.code;
        var caPort = functionConfig.caPort, handler = functionConfig.handler, memorySize = functionConfig.memorySize, timeout = functionConfig.timeout, name = functionConfig.name;
        functionConfig.name = name || serviceName;
        functionConfig.caPort = caPort || 9000;
        functionConfig.timeout = timeout || 60;
        functionConfig.memorySize = memorySize || 1024;
        functionConfig.handler = handler || 'index.handler';
        functionConfig.runtime = 'custom-container';
        return functionConfig;
    };
    ToFc.triggers = function (serviceName, triggerConfig) {
        if (!triggerConfig) {
            return [{
                    name: serviceName,
                    type: 'http',
                    config: constant_1.HTTP_CONFIG,
                }];
        }
        return [__assign({ name: serviceName }, triggerConfig)];
    };
    return ToFc;
}());
exports.default = ToFc;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG8tZmMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL3RyYW5zZm9ybS90by1mYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsK0RBQXlDO0FBQ3pDLDJDQUE2QztBQUU3QztJQUFBO0lBbUVBLENBQUM7SUFsRVEsY0FBUyxHQUFoQixVQUFpQixLQUFLLEVBQUUsVUFBVztRQUNqQyxPQUFPLEtBQUssQ0FBQyxPQUFPLENBQUM7UUFFckIsSUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQ3hELGdCQUFNLENBQUMsS0FBSyxDQUFDLGNBQVksSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUcsQ0FBQyxDQUFDO1FBQ3BELElBQU0sY0FBYyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDbkUsZ0JBQU0sQ0FBQyxLQUFLLENBQUMsZUFBYSxJQUFJLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBRyxDQUFDLENBQUM7UUFDNUQsSUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUU1RCxPQUFPO1lBQ0wsT0FBTyxTQUFBO1lBQ1AsUUFBUSxVQUFBO1lBQ1IsTUFBTSxFQUFFLEtBQUssQ0FBQyxNQUFNO1lBQ3BCLFFBQVEsRUFBRSxjQUFjO1NBQ3pCLENBQUM7SUFDSixDQUFDO0lBRU0sWUFBTyxHQUFkLFVBQWUsT0FBTyxFQUFFLFVBQVU7UUFDaEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUU7WUFDakIsTUFBTSxJQUFJLEtBQUssQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO1NBQzNDO1FBQ0QsSUFBSSxVQUFVLEtBQUssV0FBVyxFQUFFO1lBQzlCLG9CQUFZLE9BQU8sRUFBRztTQUN2QjthQUFNO1lBQ0wsa0JBQ0UsU0FBUyxFQUFFLE1BQU0sRUFDakIsU0FBUyxFQUFFLE1BQU0sSUFDZCxPQUFPLEVBQ1Y7U0FDSDtJQUNILENBQUM7SUFFTSxhQUFRLEdBQWYsVUFBZ0IsV0FBVyxFQUFFLGNBQWM7UUFDekMsT0FBTyxjQUFjLENBQUMsSUFBSSxDQUFDO1FBR3pCLElBQUEsTUFBTSxHQUtKLGNBQWMsT0FMVixFQUNOLE9BQU8sR0FJTCxjQUFjLFFBSlQsRUFDUCxVQUFVLEdBR1IsY0FBYyxXQUhOLEVBQ1YsT0FBTyxHQUVMLGNBQWMsUUFGVCxFQUNQLElBQUksR0FDRixjQUFjLEtBRFosQ0FDYTtRQUVuQixjQUFjLENBQUMsSUFBSSxHQUFHLElBQUksSUFBSSxXQUFXLENBQUM7UUFDMUMsY0FBYyxDQUFDLE1BQU0sR0FBRyxNQUFNLElBQUksSUFBSSxDQUFDO1FBQ3ZDLGNBQWMsQ0FBQyxPQUFPLEdBQUcsT0FBTyxJQUFJLEVBQUUsQ0FBQztRQUN2QyxjQUFjLENBQUMsVUFBVSxHQUFHLFVBQVUsSUFBSSxJQUFJLENBQUM7UUFDL0MsY0FBYyxDQUFDLE9BQU8sR0FBRyxPQUFPLElBQUksZUFBZSxDQUFDO1FBQ3BELGNBQWMsQ0FBQyxPQUFPLEdBQUcsa0JBQWtCLENBQUM7UUFDNUMsT0FBTyxjQUFjLENBQUM7SUFDeEIsQ0FBQztJQUVNLGFBQVEsR0FBZixVQUFnQixXQUFXLEVBQUUsYUFBYTtRQUN4QyxJQUFJLENBQUMsYUFBYSxFQUFFO1lBQ2xCLE9BQU8sQ0FBQztvQkFDTixJQUFJLEVBQUUsV0FBVztvQkFDakIsSUFBSSxFQUFFLE1BQU07b0JBQ1osTUFBTSxFQUFFLHNCQUFXO2lCQUNwQixDQUFDLENBQUM7U0FDSjtRQUVELE9BQU8sWUFDTCxJQUFJLEVBQUUsV0FBVyxJQUNkLGFBQWEsRUFDaEIsQ0FBQztJQUNMLENBQUM7SUFDSCxXQUFDO0FBQUQsQ0FBQyxBQW5FRCxJQW1FQyJ9