import { ActuatorType } from './actuatorTypes';
import { isActuatorBeansJsonGuard as isActuatorBeansJsonGuard, isDefaultForceDirectedGraphTypeGuard, isDefaultTreeGraphTypeGuard } from './globalActuatorTypeGuard';

export class ActuatorTypeDecider {

    static decide(jsonData: any): ActuatorType {
        let actuatorTypes: ActuatorType = 'unknown';
        // let defaultForceDirectedGraph: DefaultForceDirectedGraph = jsonData as DefaultForceDirectedGraph;
        if(isDefaultForceDirectedGraphTypeGuard(jsonData)) {
            actuatorTypes = 'defaultForceDirectedGraph';
        }

        if(isActuatorBeansJsonGuard(jsonData)) {
            actuatorTypes = 'actuatorBeansJson';
        }

        if(isDefaultTreeGraphTypeGuard(jsonData)) {
            actuatorTypes = 'defaultTreeGraph';
        }

        console.log('decided - ' +actuatorTypes, jsonData);

        // if (jsonData instanceof DefaultForceDirectedGraph) {
        //     return 'defaultForceDirectedGraph';
        // }
        return actuatorTypes;
    }
}