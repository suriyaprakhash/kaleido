import { DefaultForceDirectedGraph, DefaultForceDirectedGraphTypeGuard } from "../diagrams/forceDirectedGraphTypes";
import { BeanJson, ActuatorBeansJsonTypeGuard } from "./endpoint-types/beansEndpoint";

export function isDefaultForceDirectedGraphTypeGuard(data: any): data is DefaultForceDirectedGraph {
   return DefaultForceDirectedGraphTypeGuard.isDefaultForceDirectedGraphTypeGuard(data);
}

export function isActuatorBeansJson(data: any): data is BeanJson {
   // Type guard using type assertions and checks
   return ActuatorBeansJsonTypeGuard.isBeansJson(data);
}
