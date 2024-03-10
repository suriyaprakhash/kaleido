import React from 'react'


const ForceDirectedGraph = ({ jsonData }: any) => {

    interface MyNode {
        id: string;
        group: number;
    }
    const nodes: MyNode[] = jsonData.nodes;

    const nodeList = nodes?.map((node) => (
        <div key={node.id}>
            <p>Node: {node.id}</p>
            <p>Group: {node.group}</p>
        </div>
    ));

    return (
        <section>
            <div>ForceDirectedGraph</div>
            {nodeList}
        </section>
    )
}

export default ForceDirectedGraph