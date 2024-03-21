import { ForceDirectedGraphContainer, DefaultForceDirectedGraphTypeGuard } from "../diagrams/force-directed-graph/forceDirectedGraphTypes";
import { BeansJson, ActuatorBeansJsonTypeGuard } from "./endpoint-types/beansEndpoint";

export function isDefaultForceDirectedGraphTypeGuard(data: any): data is ForceDirectedGraphContainer {
   return DefaultForceDirectedGraphTypeGuard.isDefaultForceDirectedGraphTypeGuard(data);
}

export function isActuatorBeansJson(data: any): data is BeansJson {
   // Type guard using type assertions and checks
   return ActuatorBeansJsonTypeGuard.isBeansJson(data);
}
