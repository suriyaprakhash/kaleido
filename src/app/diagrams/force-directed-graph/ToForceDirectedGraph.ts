import { BeanInfo } from "@/app/actuators/actuatorTypes";
import { BeansJson, Beans } from "@/app/actuators/endpoint-types/beansEndpointTypes";
import { TypeConverter } from "../TypeConverter";
import { DataLink, DataNode, ForceDirectedGraphContainer } from "./forceDirectedGraphTypes";
import { log } from "console";

export class ToForceDirectedGraph extends TypeConverter<BeansJson, ForceDirectedGraphContainer> {

    convert(data: BeansJson): ForceDirectedGraphContainer {

        const dataNodes: DataNode[] = [];
        const dataLinks: DataLink[] = [];
        const missingLinks: DataLink[] = [];

        const contextMap: Map<string, Beans> = new Map(Object.entries(data.contexts));

        // this is primarily for the color
        const beanTypeForColor: Map<string, number> = new Map();
        let colorValueCounter: number = 0;

        contextMap.forEach((contextValue: Beans, contextName: string) => {
            // console.log(contextName);
            const beanMap: Map<string, BeanInfo> = new Map(Object.entries(contextValue.beans));
            beanMap.forEach((beanValue: BeanInfo, beanName: string) => {
                // console.log(beanName);
                // console.log(beanValue.dependencies);
                colorValueCounter = colorValueCounter + 1
                beanTypeForColor.has(beanValue.type) ? beanTypeForColor.get(beanValue.type) : beanTypeForColor.set(beanValue.type, colorValueCounter + 1);
                
                dataNodes.push({
                    id: beanName,
                    group: beanTypeForColor.get(beanValue.type)!,

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
                        missingLinks.push({
                            source: dependency,
                            target: beanName,
                            value: 1
                        });
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
            nodes: dataNodes,
            missingLinks: missingLinks
        };
        return defaultForceDirectedGraph;
    }

}