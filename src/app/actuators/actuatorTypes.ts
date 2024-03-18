export type ActuatorType = 'defaultForceDirectedGraph' | 'actuatorBeansJson' | 'unknown';


export interface ActuatorBean {
    contexts: BeanContextItem;
}

export interface BeanContextItem {
    beans: Map<string, BeanInfo>;
}

export interface BeanInfo {
    aliases: string[],
    scope: string,
    type: string,
    resource: string,
    dependencies: string[]
}

export interface BeanDataNode {
    id: string;
    group: string;
    x: number;
    y: number;
}