import { ForceDirectedGraphContainer, DefaultForceDirectedGraphTypeGuard } from "../diagrams/force-directed-graph/forceDirectedGraphTypes";
import { DefaultTreeGraphTypeGuard, TreeGraphNode } from "../diagrams/tree-graph/treeGraphTypes";
import { BeansJson, ActuatorBeansJsonTypeGuard } from "./endpoint-types/beansEndpointTypes";

export function isDefaultForceDirectedGraphTypeGuard(data: any): data is ForceDirectedGraphContainer {
   return DefaultForceDirectedGraphTypeGuard.isDefaultForceDirectedGraphTypeGuard(data);
}

export function isActuatorBeansJsonGuard(data: any): data is BeansJson {
   // Type guard using type assertions and checks
   return ActuatorBeansJsonTypeGuard.isBeansJson(data);
}

export function isDefaultTreeGraphTypeGuard(data: any): data is TreeGraphNode {
   return DefaultTreeGraphTypeGuard.isDefaultTreeGraphTypeGuard(data);
}
