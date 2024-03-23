import { BeanInfo, Beans, BeansJson } from "@/app/actuators/endpoint-types/beansEndpointTypes";
import { TypeConverter } from "../TypeConverter";
import { TreeGraphNode } from "./treeGraphTypes";

export class ToTreeGraph extends TypeConverter<BeansJson, TreeGraphNode> {

    convert(data: BeansJson): TreeGraphNode {

        const treeGraphNode: TreeGraphNode = {
            name: 'contexts',
            children: []
        }

        const contextMap: Map<string, Beans> = new Map(Object.entries(data.contexts));

        contextMap.forEach((contextValue: Beans, contextName: string) => {
            const contextTreeNode: TreeGraphNode = {
                name: contextName,
                children: []
            }
            
            const beanMap: Map<string, BeanInfo> = new Map(Object.entries(contextValue.beans));
            beanMap.forEach((beanInfo: BeanInfo, beanName: string) => {

                const beanTreeNode: TreeGraphNode = {
                    name: beanName,
                    children: treeNodeFromDependencies(beanMap, beanInfo)
                };

                contextTreeNode.children.push(beanTreeNode);
            });

            treeGraphNode.children.push(contextTreeNode);
        });

        return treeGraphNode;

        // return {
        //     name: "myroot",
        //     children: []
        // };
    }
}

function treeNodeFromDependencies(beanMap: Map<string, BeanInfo>, beanInfo: BeanInfo) {

    const tempDependencyTreeNodes: TreeGraphNode[] = [];

    beanInfo?.dependencies.forEach(dependencyBeanName => {
        const beanDependencyTreeNode: TreeGraphNode = {
            name: dependencyBeanName,
            children: treeNodeFromDependencies(beanMap, beanMap.get(dependencyBeanName)!),
        };
        tempDependencyTreeNodes.push(beanDependencyTreeNode);
    });

    return tempDependencyTreeNodes;
    
}

export function filter(beanJson: BeansJson, filterText: string) {
   
    const treeGraphNode: TreeGraphNode = {
        name: 'contexts',
        children: []
    }

    const contextMap: Map<string, Beans> = new Map(Object.entries(beanJson.contexts));

    contextMap.forEach((contextValue: Beans, contextName: string) => {
        const contextTreeNode: TreeGraphNode = {
            name: contextName,
            children: []
        }
        
        const beanMap: Map<string, BeanInfo> = new Map(Object.entries(contextValue.beans));
        beanMap.forEach((beanInfo: BeanInfo, beanName: string) => {
            if (beanName.toLocaleLowerCase().includes(filterText?.toLocaleLowerCase())) {
                const beanTreeNode: TreeGraphNode = {
                    name: beanName,
                    children: treeNodeFromDependencies(beanMap, beanInfo)
                };
    
                contextTreeNode.children.push(beanTreeNode);
            }
        });

        treeGraphNode.children.push(contextTreeNode);
    });

    return treeGraphNode;
}