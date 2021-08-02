"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ToBuild = /** @class */ (function () {
    function ToBuild() {
    }
    ToBuild.transfromInputs = function (_a) {
        var runtime = _a.runtime, region = _a.region, service = _a.service, functionConfig = _a.function;
        return {
            region: region,
            service: {
                name: service.name,
            },
            function: {
                name: functionConfig.name || service.name,
                runtime: runtime || 'custom',
                codeUri: functionConfig.code,
                handler: functionConfig.handler || 'index.handler',
                initializationTimeout: functionConfig.initializationTimeout || 3,
                initializer: functionConfig.initializer,
            },
        };
    };
    return ToBuild;
}());
exports.default = ToBuild;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG8tYnVpbGQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL3RyYW5zZm9ybS90by1idWlsZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBO0lBQUE7SUFpQkEsQ0FBQztJQWhCUSx1QkFBZSxHQUF0QixVQUF1QixFQUFzRDtZQUFwRCxPQUFPLGFBQUEsRUFBRSxNQUFNLFlBQUEsRUFBRSxPQUFPLGFBQUEsRUFBWSxjQUFjLGNBQUE7UUFDekUsT0FBTztZQUNMLE1BQU0sUUFBQTtZQUNOLE9BQU8sRUFBRTtnQkFDUCxJQUFJLEVBQUUsT0FBTyxDQUFDLElBQUk7YUFDbkI7WUFDRCxRQUFRLEVBQUU7Z0JBQ1IsSUFBSSxFQUFFLGNBQWMsQ0FBQyxJQUFJLElBQUksT0FBTyxDQUFDLElBQUk7Z0JBQ3pDLE9BQU8sRUFBRSxPQUFPLElBQUksUUFBUTtnQkFDNUIsT0FBTyxFQUFFLGNBQWMsQ0FBQyxJQUFJO2dCQUM1QixPQUFPLEVBQUUsY0FBYyxDQUFDLE9BQU8sSUFBSSxlQUFlO2dCQUNsRCxxQkFBcUIsRUFBRSxjQUFjLENBQUMscUJBQXFCLElBQUksQ0FBQztnQkFDaEUsV0FBVyxFQUFFLGNBQWMsQ0FBQyxXQUFXO2FBQ3hDO1NBQ0YsQ0FBQztJQUNKLENBQUM7SUFDSCxjQUFDO0FBQUQsQ0FBQyxBQWpCRCxJQWlCQyJ9