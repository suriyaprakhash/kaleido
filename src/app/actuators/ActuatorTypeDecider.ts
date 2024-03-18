import { ActuatorType } from './actuatorTypes';
import { isActuatorBeansJson, isDefaultForceDirectedGraphTypeGuard } from './globalActuatorTypeGuard';

export class ActuatorTypeDecider {

    static decide(jsonData: any): ActuatorType {
        let actuatorTypes: ActuatorType = 'unknown';
        // let defaultForceDirectedGraph: DefaultForceDirectedGraph = jsonData as DefaultForceDirectedGraph;
        if(isDefaultForceDirectedGraphTypeGuard(jsonData)) {
            actuatorTypes = 'defaultForceDirectedGraph';
        }

        if(isActuatorBeansJson(jsonData)) {
            actuatorTypes = 'actuatorBeansJson';
        }
        console.log('decide', jsonData);

        // if (jsonData instanceof DefaultForceDirectedGraph) {
        //     return 'defaultForceDirectedGraph';
        // }
        return actuatorTypes;
    }
}