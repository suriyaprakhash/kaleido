import * as d3 from 'd3';
import { D3DragEvent, color } from 'd3';
import { link } from 'fs';
import { useEffect, useRef, useState } from 'react';
import { DataLink, DataNode, ForceDirectedGraphContainer } from './forceDirectedGraphTypes';
import { Baloo_Da_2 } from 'next/font/google';

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
            // this removes the existing nodes & link
            d3.selectAll('svg g')?.remove();
            // svg = createForceDirectedGraph(tempJsonData, svg);
            createForceDirectedGraph(tempJsonData);
            initalized.current = true;
        }
    }, [tempJsonData]);

    /**
     * The primary function thats gets called during useEffect
     * 
     * @param data 
     * @returns 
     */
    function createForceDirectedGraph(
        data: {
            links: DataLink[],
            nodes: DataNode[]
        }
    ): d3.Selection<SVGSVGElement | null, unknown, null, undefined> {

        // Select the SVG container.
        const svg: d3.Selection<SVGSVGElement | null, unknown, null, undefined> = d3.select(svgRef.current)
        // svg = d3.select(svgRef.current);
        // .attr("width", width).attr("height", height).attr("viewBox", [0, 0, width, height])
        // .attr("style", "max-width: 100%; height: auto");

        // Dimensions based on svg element size
        // const svgNode: SVGSVGElement | null = svg.node();
        // const width: number = svgNode?.clientWidth ?  svgNode?.clientWidth : 0;
        // const height: number = svgNode?.clientHeight ? svgNode?.clientHeight : 0;
        const width = 1600;
        const height = 800;

        // Update the size on window resize
        svg.attr("width", width).attr("height", height).attr("viewBox", [0, 0, width, height])
         .attr("style", "max-width: 100%; height: auto");


        // Specify the color scale.
        const color = d3.scaleOrdinal(d3.schemeCategory10);

        // The force simulation mutates links and nodes, so create a copy
        // so that re-evaluating this cell produces the same result.
        const links = data.links.map(d => ({ ...d }));
        const nodes = data.nodes.map(d => ({ ...d }));


        // const svg = d3.create("svg")
        //     .attr("width", width)
        //     .attr("height", height)
        //     .attr("viewBox", [0, 0, width, height])
        //     .attr("style", "max-width: 100%; height: auto;");

        // Add a line for each link, and a circle for each node.
        const link = svg.append("g")
        // const link = zoomContainer
            .attr("stroke", "#999")
            .attr("stroke-opacity", 0.6)
            .selectAll()
            .data(links)
            .join("line")
            .attr("stroke-width", d => Math.sqrt(d.value));

        const node = svg.append("g")
        // const node = zoomContainer
            .attr("stroke", "#fff")
            .attr("stroke-width", 1.5)
            .selectAll()
            .data(nodes)
            .join("circle")
            // .filter(node => {
            //     console.log(node.id + ' - ' + node.id === 'Napoleon');
            //     return node.id.includes('le')}
            // )
            .attr("r", 5)
            .attr("fill", d => color(d.group));

        node.append("title")
            .text(d => d.id);


            
        // Create a simulation with several forces.
        let simulation = d3.forceSimulation(nodes)
        .force("link", d3.forceLink(links).id((d: any) => d.id))
        .force("charge", d3.forceManyBody())
        .force("center", d3.forceCenter(width / 2, height / 2))
        .on("tick", ticked);

        // Set the position attributes of links and nodes each time the simulation ticks.
        function ticked() {
            link
                .attr("x1", (d: any) => d.source.x)
                .attr("y1", (d: any) => d.source.y)
                .attr("x2", (d: any) => d.target.x)
                .attr("y2", (d: any) => d.target.y);

            node
                .attr("cx", d => d.x? d.x : 0)
                .attr("cy", d => d.y? d.y : 0);
        }    

        // Add a zoom/pan behavior.
        const zoom = d3.zoom<any, any>();
        zoom.on("zoom", zoomListener);

        const zoomContainer: d3.Selection<SVGSVGElement | null, unknown, null, undefined> = svg.call(zoom);
        zoomContainer.append('g');

        function zoomListener(e: any) {
            node
            .attr('transform', e.transform);
            link
            .attr('transform', e.transform);
        }    

        // Add a drag behavior.
        // node.call(d3.drag()
        //     .on("start", dragstarted)
        //     .on("drag", dragged)
        //     .on("end", dragended));

        // Add a drag behavior.
        const drag = d3.drag<any, any>();
        drag
            .on("start", (event: D3DragEvent<SVGGElement, any, any>) => {
                dragstarted(event); // Assuming dragstarted takes these arguments
            })
            .on("drag", (event: any) => {
                dragged(event); // Assuming dragged takes these arguments
            })
            .on("end", (event: any) => {
                dragended(event); // Assuming dragended takes these arguments
            });
        node.call(drag);


        // Reheat the simulation when drag starts, and fix the subject position.
        function dragstarted(event: any) {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            event.subject.fx = event.subject.x;
            event.subject.fy = event.subject.y;
        }

        // Update the subject (dragged node) position during drag.
        function dragged(event: any) {
            event.subject.fx = event.x;
            event.subject.fy = event.y;
        }

        // Restore the target alpha so the simulation cools after dragging ends.
        // Unfix the subject position now that it’s no longer being dragged.
        function dragended(event: any) {
            if (!event.active) simulation.alphaTarget(0);
            event.subject.fx = null;
            event.subject.fy = null;
        }

        // When this cell is re-run, stop the previous simulation. (This doesn’t
        // really matter since the target alpha is zero and the simulation will
        // stop naturally, but it’s a good practice.)
        // invalidation.then(() => simulation.stop());

        return svg;
    }

    function filterInputChange(event: any): void {
        setFilterInput(event.target.value);
    }


    function filterNodes(event: any): void {
        // const filteredNodeId: string = event.target.value;

        // hold the jsonData in the map for convinience 
        const nodesMap: Map<string, DataNode> = new Map();
        jsonData.nodes.forEach((node: DataNode) => nodesMap.set(node.id, node));

        // filter the node based on the input from the UI
        const filteredSoruceNodes: DataNode[] = jsonData.nodes.filter(node => node.id.toLocaleLowerCase().includes(filterInput.toLocaleLowerCase()))
                                                        .map(filteredNodes => filteredNodes);

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

            initalized.current = false;

        }
    }

    return (
        <section className="border-8 border-orange-600">
            <div>ForceDirectedGraph</div>
            <section className="grid gap-4 border-8 border-red-100 p-2 sm:grid-cols-4">
                {/* <svg ref={svgRef} className="border-4 border-green-800 md:w-[800px] sm:h-[800px]"> */}
                <div className="sm:col-span-1 border-4 border-green-800">
                <div className="text-center">Data Window</div>
                    <p>Nodes found - {tempJsonData.nodes.length}</p>
                    <p>Links found - {tempJsonData.links.length}</p>
                    {/* <div>
                        {tempJsonData.nodes.map(node => <li>{node.id}</li>)}
                    </div> */}
                </div>
                <div className="sm:col-span-2 border-4 border-green-800 rounded-lg">
                    <svg ref={svgRef} className="border-4 border-green-400 rounded-lg">
                    </svg>
                </div>
                <div className="sm:col-span-1 border-4 border-green-800 grid sm:grid-col-2 items-center">
                    <div className="text-center">Search Window</div>
                    <div className="relative w-full h-16">
                        <input className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-teal-500"
                        placeholder="" onChange={filterInputChange}/>
                        <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-blue-gray-400 peer-focus:text-teal-500 before:border-blue-gray-200 peer-focus:before:!border-teal-500 after:border-blue-gray-200 peer-focus:after:!border-teal-500">
                            Parent Node Search
                        </label>
                    </div>
                    <div className="">
                        <button className="bg-teal-600 rounded-lg p-5 w-full" onClick={filterNodes}>
                            <span className="p-2 text-white">Filter</span>
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


