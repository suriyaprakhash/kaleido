import { DefaultForceDirectedGraph } from "../diagrams/forceDirectedGraphTypes";

export function isDefaultForceDirectedGraphTypeGuard(data: any): data is DefaultForceDirectedGraph {
    // Type guard using type assertions and checks
    return (typeof data === 'object') && ('nodes' in data) && ('links' in data);
}

// export function isDataLink(data: any[]): data is DataLink[] {
//     // Type guard using type assertions and checks
//     return (typeof data === 'object') && ('soruce' in data) && ('target' in data) && ('value' in data);
// }

// export function isDataNode(nodes: any[]): nodes is DataNode[] {
    
//     // Type guard using type assertions and checks
//     return (typeof node === 'object') && ('id' in data) && ('group' in data) && ('x' in data) && ('y' in data);
// }