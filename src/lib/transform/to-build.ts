export default class ToBuild {
  static transfromInputs({ runtime, region, service, function: functionConfig }) {
    return {
      region,
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
  }
}
