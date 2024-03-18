export interface DataLink {
    source: string;
    target: string;
    value: number;
}

export interface DataNode {
    id: string;
    group: string;
    x: number;
    y: number;
}

export interface DefaultForceDirectedGraph {
    nodes: DataNode[];
    links: DataLink[];
}


export class DefaultForceDirectedGraphTypeGuard {
    static isDefaultForceDirectedGraphTypeGuard(data: any): data is DefaultForceDirectedGraph {
        // Type guard using type assertions and checks
        return (typeof data === 'object') && ('nodes' in data) && ('links' in data);
    }
    
    //private isDataLink(data: any[]): data is DataLink[] {
    //     // Type guard using type assertions and checks
    //     return (typeof data === 'object') && ('soruce' in data) && ('target' in data) && ('value' in data);
    // }
    
    // private isDataNode(nodes: any[]): nodes is DataNode[] {
        
    //     // Type guard using type assertions and checks
    //     return (typeof node === 'object') && ('id' in data) && ('group' in data) && ('x' in data) && ('y' in data);
    // }
}




