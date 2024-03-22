import * as d3 from 'd3';
import { D3DragEvent, color } from 'd3';
import { link } from 'fs';
import { useEffect, useRef, useState } from 'react';
import { DataLink, DataNode, ForceDirectedGraphContainer } from './forceDirectedGraphTypes';
import { Baloo_Da_2 } from 'next/font/google';
import { clearAllSvgG, createForceDirectedGraph } from './forceDirectedGraphCore';

const ForceDirectedGraph = ({ jsonData }: { jsonData: ForceDirectedGraphContainer }) => {
    // this is for the counter
    const [count, setHello] = useState(0);

    // used to restrict the createForceDirectedGraph called twice due to React.strict in dev environment
    const initalized = useRef<boolean>(false);

    const [tempJsonData, updateTempJsonData] = useState<ForceDirectedGraphContainer>(jsonData);
    const [filterInput, setFilterInput] = useState<string>('');

    // this is reference object referred in the html tag
    const svgRef = useRef<SVGSVGElement | null>(null);
    // let svg: d3.Selection<SVGSVGElement | null, unknown, null, undefined>;

    // const [nodeIdFilter, setNodeIdFilter]= useState<string>('o');

    // using useEffects to paint the ForceDirectedGraph
    useEffect(() => {
        console.log("use Effects called")
        if (!initalized.current) {
            console.log("use Effects called - init");
            clearAllSvgG()
            createForceDirectedGraph({
                jsonData: tempJsonData,
                svgRef: svgRef,
                // svgRefElementString: 'svg'
            });
            initalized.current = true;
        }
    }, [tempJsonData]);


    function filterInputChange(event: any): void {
        setFilterInput(event.target.value);
    }


    function filterParentNodes(event: any): void {
        // const filteredNodeId: string = event.target.value;

        // filter the node based on the input from the UI
        const filteredSoruceNodes: DataNode[] = jsonData.nodes.filter(node => node.id.toLocaleLowerCase().includes(filterInput.toLocaleLowerCase()))
                                                        .map(filteredNodes => filteredNodes);


        // hold the jsonData in the map for convinience 
        const nodesMap: Map<string, DataNode> = new Map();
        jsonData.nodes.forEach((node: DataNode) => nodesMap.set(node.id, node));                                                        

        if (filteredSoruceNodes?.length > 0) {

            // find all the dataLinks corresponding to the filteredNodes as a dependency for other nodes 
            const filteredSourceDataLinks: DataLink[] = jsonData.links.filter(link => filteredSoruceNodes.filter(filterNode => link.source === filterNode.id).length > 0).map(link => link);

            // const filteredSourceDataLinks: DataLink[] = jsonData.links.filter(link => link.source.includes(filteredNodeId)).map(link => link);

            // find all the targetNode depandents for the filteredNode
            const filteredTargetNodes: (DataNode | undefined)[] =  filteredSourceDataLinks.map(dataLink => nodesMap.get(dataLink.target));

            // All the filteredNode soruce parent along with all the targetNode dependencies
            // Set used - to filter duplicates  
            let combinedSourceAndTargetNodes: Set<DataNode> = new Set();
            filteredTargetNodes.forEach(targetNode => {
                if (targetNode) {
                    combinedSourceAndTargetNodes.add(targetNode);
                }
            })

            filteredSoruceNodes.forEach(soruceNode => {
                combinedSourceAndTargetNodes.add(soruceNode)
            })
            
            // this update will re-trigger the useEffects as tempJsonData is its dependency 
            updateTempJsonData({
                nodes: Array.from(combinedSourceAndTargetNodes),
                links: filteredSourceDataLinks
            });

        } else {
            updateTempJsonData({
                nodes: [],
                links: []
            });
        }
        initalized.current = false;
    } 

    function filterChildNodes(event: any): void {
        // const filteredNodeId: string = event.target.value;

        // filter the node based on the input from the UI
        const filteredSoruceNodes: DataNode[] = jsonData.nodes.filter(node => node.id.toLocaleLowerCase().includes(filterInput.toLocaleLowerCase()))
                                                        .map(filteredNodes => filteredNodes);


        // hold the jsonData in the map for convinience 
        const nodesMap: Map<string, DataNode> = new Map();
        jsonData.nodes.forEach((node: DataNode) => nodesMap.set(node.id, node));                                                        

        if (filteredSoruceNodes?.length > 0) {

            // find all the dataLinks corresponding to the filteredNodes as a dependency for other nodes 
            const filteredSourceDataLinks: DataLink[] = jsonData.links.filter(link => filteredSoruceNodes.filter(filterNode => link.target === filterNode.id).length > 0).map(link => link);


            // find all the targetNode depandents for the filteredNode
            const filteredTargetNodes: (DataNode | undefined)[] =  filteredSourceDataLinks.map(dataLink => nodesMap.get(dataLink.source));

            // All the filteredNode soruce parent along with all the targetNode dependencies
            // Set used - to filter duplicates  
            let combinedSourceAndTargetNodes: Set<DataNode> = new Set();
            filteredTargetNodes.forEach(targetNode => {
                if (targetNode) {
                    combinedSourceAndTargetNodes.add(targetNode);
                }
            })

            filteredSoruceNodes.forEach(soruceNode => {
                combinedSourceAndTargetNodes.add(soruceNode)
            })
            
            // this update will re-trigger the useEffects as tempJsonData is its dependency 
            updateTempJsonData({
                nodes: Array.from(combinedSourceAndTargetNodes),
                links: filteredSourceDataLinks
            });

        } else {
            updateTempJsonData({
                nodes: [],
                links: []
            });
        }
        initalized.current = false;
    } 

    return (
        <section className="border-8 border-orange-600">
            
            <section className="grid gap-4 border-8 border-red-100 p-2 sm:grid-cols-4">
                {/* <svg ref={svgRef} className="border-4 border-green-800 md:w-[800px] sm:h-[800px]"> */}
                <div className="sm:col-span-1 border-4 border-green-800 grid grid-cols-2 p-4">
                    <div className="text-center col-span-2">Data Window</div>
                    <div className="col-span-2">ForceDirectedGraph</div>
                    <div>
                        <p>Nodes found - {tempJsonData.nodes.length}</p>
                        <p>Links found - {tempJsonData.links.length}</p>
                    </div>
                    <div className="col-span-2">
                        <h3 className="">NODES</h3>
                        <ul className="list-disc overflow-y-auto h-56">
                            {tempJsonData.nodes.map(node => <li>{node.id}</li>)}
                        </ul>
                    </div>
                </div>    
                <div className="sm:col-span-2 border-4 border-green-800 rounded-lg">
                    <svg ref={svgRef} className="border-4 border-green-400 rounded-lg">
                    </svg>
                </div>
                <div className="sm:col-span-1 border-4 border-green-800 grid grid-cols-2 p-4 h-1/2 ">
                    <div className="col-span-2 text-center">Search Window</div>
                    <div className="col-span-2 border-4 border-green-800">
                        <input className="border-4 border-green-600 w-full" placeholder="search" onChange={filterInputChange}/>
                    </div>
                    <div className="col-span-2 grid grid-cols-2 gap-2 p-2">
                        <button className="col-span-1 bg-teal-600 rounded-lg" onClick={filterParentNodes}>
                            <span className="text-white">Filter Depandents</span>
                        </button>
                        <button className="col-span-1 bg-teal-600 rounded-lg" onClick={filterChildNodes}>
                            <span className="p-2 text-white">Filter Child</span>
                        </button>
                    </div>
                </div>
            </section>
   
            {/* <section className="border-8 border-red-400 p-2">
                <div className="text-center items-center">
                    <p>Click counter - You clicked {count} times</p>
                    <button onClick={() => setHello(count + 1)}>Click me</button>
                </div>
            </section> */}
        </section>
    )
}

export default ForceDirectedGraph


