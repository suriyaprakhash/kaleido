export interface TreeGraphNode {
    name: string;
    children: TreeGraphNode[];
    size?: number;
}



export class DefaultTreeGraphTypeGuard {
    static isDefaultTreeGraphTypeGuard(data: any): data is TreeGraphNode {
        // Type guard using type assertions and checks
        return (typeof data === 'object') && ('name' in data) && 
            DefaultTreeGraphTypeGuard.checkChildren(data);
    }

    static checkChildren(data: any): boolean {
        return ('children' in data);
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


