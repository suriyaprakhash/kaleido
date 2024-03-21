import { BeansJson, Beans, BeanInfo } from "@/app/actuators/endpoint-types/beansEndpoint";
import { TypeConverter } from "../TypeConverter";
import { DataLink, DataNode, ForceDirectedGraphContainer } from "./forceDirectedGraphTypes";
import { log } from "console";

export class ToForceDirectedGraph extends TypeConverter<BeansJson, ForceDirectedGraphContainer> {

    convert(data: BeansJson) {

        const dataNodes: DataNode[] = [];

        const dataLinks: DataLink[] = [];
        const dependenciesMap: Map<string, string> = new Map(); 
        const contextMap: Map<string, Beans> = new Map(Object.entries(data.contexts));
        contextMap.forEach((contextValue: Beans, contextName: string) => {
            // console.log(contextName);
            const beanMap: Map<string, BeanInfo> = new Map(Object.entries(contextValue.beans));
            beanMap.forEach((beanValue: BeanInfo, beanName: string) => {
                // console.log(beanName);
                // console.log(beanValue.dependencies);
                dataNodes.push({
                    id: beanName,
                    group: contextName
                });
                beanValue.dependencies?.forEach((dependency: string) => {
                    if (beanMap.get(dependency) && beanMap.get(beanName)) {
                        dataLinks.push({
                            source: dependency,
                            target: beanName,
                            value: 1
                        });
                    } else {
                        console.error('Missing dependency node - ' + dependency + ' or bean Node -' + beanName);
                    }
                });
            });
        });

        // const dataNodes1: DataNode[] = [{
        //     group: 'g-one',
        //     id: 'one'
        // }];

        // const dataLink1: DataLink[] = [];

        const defaultForceDirectedGraph: ForceDirectedGraphContainer = {
            links: dataLinks,
            nodes: dataNodes
        };
        return defaultForceDirectedGraph;
    }

}