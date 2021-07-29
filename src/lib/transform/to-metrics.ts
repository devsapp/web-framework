import * as Interface from '../../interface/inputs';

export default class Component {
  static transform(inputs: Interface.IInputs) {
    inputs.project.component = 'fc-metrics';

    const { region, service, function: functionConfig } = inputs.props;

    const serviceName = service.name;
    const functionName = functionConfig.name || serviceName;

    return {
      ...inputs,
      props: {
        region,
        serviceName,
        functionName,
      },
    };
  }
}
