import * as Interface from '../../interface/inputs';
import { IInputs } from '../../interface/inputs';
import { getAutoName } from '../../constant';
import { getLogConfig } from '../utils';

export default class Component {
  static transform(inputs: IInputs) {
    inputs.project.component = 'fc-logs';

    const { region, service, function: functionConfig }: Interface.IProperties = inputs.props;
    const accountID = inputs.credentials.AccountID;

    const topic = service.name;
    const query = `${functionConfig.name || topic} | with_pack_meta`;

    const autoName = getAutoName(accountID, region, topic);

    return {
      ...inputs,
      props: {
        region,
        topic,
        query,
        logConfig: getLogConfig(service.logConfig, autoName),
      },
    };
  }
}
