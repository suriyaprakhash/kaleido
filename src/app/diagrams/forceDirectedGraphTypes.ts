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





