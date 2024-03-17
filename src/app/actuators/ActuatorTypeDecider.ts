import { ActuatorType } from './actuatorTypes';
import { isDefaultForceDirectedGraphTypeGuard } from './actuatorTypeGuards';

export class ActuatorTypeDecider {

    static decide(jsonData: any): ActuatorType {
        let actuatorTypes: ActuatorType = 'unknown';
        // let defaultForceDirectedGraph: DefaultForceDirectedGraph = jsonData as DefaultForceDirectedGraph;
        if(isDefaultForceDirectedGraphTypeGuard(jsonData)) {
            actuatorTypes = 'defaultForceDirectedGraph';
        }
        console.log('decide', jsonData);

        // if (jsonData instanceof DefaultForceDirectedGraph) {
        //     return 'defaultForceDirectedGraph';
        // }
        return actuatorTypes;
    }
}