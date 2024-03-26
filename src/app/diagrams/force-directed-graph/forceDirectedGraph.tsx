import * as d3 from 'd3';
import { D3DragEvent, color } from 'd3';
import { link } from 'fs';
import { useEffect, useRef, useState } from 'react';
import { DataLink, DataNode, ForceDirectedGraphContainer } from './forceDirectedGraphTypes';
import { Baloo_Da_2 } from 'next/font/google';
import { clearAllSvgG, createForceDirectedGraph } from './forceDirectedGraphCore';

const ForceDirectedGraph = ({ jsonData }: { jsonData: ForceDirectedGraphContainer }) => {

    // used to restrict the createForceDirectedGraph called twice due to React.strict in dev environment
    const initalized = useRef<boolean>(false);

    const [tempJsonData, updateTempJsonData] = useState<ForceDirectedGraphContainer>(jsonData);
    const [filterInput, setFilterInput] = useState<string>('');
    const [showMissingLinks, setShowMissingLinks] = useState<boolean>(true);

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

    function filterInputChangeFromSelection(event: any): void {
        if (event.target.textContent === 'Clear Selection') {
            setFilterInput('');
        } else {
            setFilterInput(event.target.textContent);
        }
    }

    function filterNode(event: any, filterValue: string) {
        setFilterInput(filterValue);
        filterParentNodes(event);
    }

    function clearSelection(event: any) {
        setFilterInput('');
        filterParentNodes(event);
    }

    function toggleShowMissingLinks() {
        setShowMissingLinks(!showMissingLinks);
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
            const filteredTargetNodes: (DataNode | undefined)[] = filteredSourceDataLinks.map(dataLink => nodesMap.get(dataLink.target));

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
            const filteredTargetNodes: (DataNode | undefined)[] = filteredSourceDataLinks.map(dataLink => nodesMap.get(dataLink.source));

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
        <section className="">
            <section className="grid gap-6 p-2 sm:grid-cols-4">
                {/* <svg ref={svgRef} className="border-4 border-green-800 md:w-[800px] sm:h-[800px]"> */}
                {/*  */}
                <div className="sm:col-span-1 grid grid-cols-2 p-4 shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
                    <div className="col-span-2 text-center text-xl text-gray-500">Graph Search</div>
                    <div className="col-span-2 pt-3">
                        <input className="border-2 border-orange-600 w-full rounded-md h-10 p-4" placeholder="search" value={filterInput} onChange={filterInputChange} />
                    </div>
                    <div className="col-span-2 grid grid-cols-2 gap-2 pt-2 max-h-[100px]">
                        <button className="col-span-1 bg-orange-600 rounded-lg hover:bg-orange-800" onClick={filterParentNodes}>
                            <span className="text-white">Filter Depandents</span>
                        </button>
                        <button className="col-span-1 bg-orange-600 rounded-lg hover:bg-orange-800" onClick={filterChildNodes}>
                            <span className="p-2 text-white">Filter Child</span>
                        </button>
                    </div>
                    {jsonData.missingLinks &&
                        <div className="col-span-2 text-center hidden md:block">
                            <div className="pt-5">
                                <div onClick={toggleShowMissingLinks} className="cursor-pointer hover:text-orange-300">Show/hide missing links</div>
                                {showMissingLinks && <ul className="list-disc overflow-y-auto h-56 shadow-[inset_-12px_-8px_40px_#46464620] text-sm m-3">
                                    {jsonData.missingLinks?.map(link =>
                                        <li className="p-3 text-gray-400 hover:text-orange-300" key={link.source}>

                                            {/* <svg className="h-3 w- text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg> */}
                                            <span>{link.source} - {link.target}</span>
                                        </li>)}

                                </ul>}
                            </div>
                        </div>
                    }
                </div>

                <div className="sm:col-span-2 rounded-lg">
                    <svg ref={svgRef} className="shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-lg">
                    </svg>
                </div>

                <div className="sm:col-span-1 shadow-[0_3px_10px_rgb(0,0,0,0.2)] grid grid-cols-2 p-4">
                    <div className="text-center col-span-2 text-xl text-gray-400">Data Window</div>
                    <div className="">
                        <p><span className="text-sm text-orange-600">Nodes found </span>{tempJsonData.nodes.length}</p>
                        <p><span className="text-sm text-orange-600">Links found </span> {tempJsonData.links.length}</p>
                    </div>
                    <div className="col-span-2 hidden md:block">
                        <h3 className="text-sm text-gray-700">Select from available nodes</h3>
                        <ul className="list-disc overflow-y-auto h-56 shadow-[inset_-12px_-8px_40px_#46464620] text-sm m-3">
                            {tempJsonData.nodes.map(node =>
                                <li className="p-3 text-gray-400 cursor-pointer hover:text-orange-300" key={node.id} onClick={(e) => filterParentNodes(e)}>

                                    {/* <svg className="h-3 w- text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg> */}
                                    <span onMouseEnter={filterInputChangeFromSelection}>{node.id}</span>

                                </li>)}

                        </ul>
                    </div>
                    {/* <div className="border-2 border-orange-300 rounded-lg hidden lg:block col-span-2 items-center aligb-center h-10">
                        <p className=" text-orange-600 cursor-pointer text-center hover:text-orange-400" >
                            Clear Selection
                        </p>
                    </div> */}
                    <div className="col-span-2 grid grid-cols-2 gap-2">
                        <button className="col-span-2 border-2 border-orange-400 rounded-lg hover:bg-orange-500 pl-4 pr-4" onMouseEnter={filterInputChangeFromSelection} onClick={(e) => clearSelection(e)}>
                            <span className="p-2 text-gray-700 hover:text-white" >Clear Selection</span>
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


