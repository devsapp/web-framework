import * as Interface from '../../interface/inputs';

export default class Component {
  static transform(inputs: Interface.IInputs) {
    inputs.project.component = 'fc-info';

    // @ts-ignore
    const { region, service, function: functionConfig, trigger } = inputs.props;

    const serviceName = service.name;
    const functionName = functionConfig.name || serviceName;


    const triggerNames = trigger && trigger.name ? [trigger.name] : [serviceName];

    return {
      ...inputs,
      props: {
        region,
        serviceName,
        functionName,
        triggerNames,
      },
    };
  }
}
