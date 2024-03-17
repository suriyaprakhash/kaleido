import * as d3 from 'd3';
import { D3DragEvent, color } from 'd3';
import { link } from 'fs';
import { useEffect, useRef, useState } from 'react';
import { DataLink, DataNode } from './forceDirectedGraphTypes';

const ForceDirectedGraph = ({ jsonData }: any) => {
    // this is for the counter
    const [count, setHello] = useState(0);

    // used to restrict the createForceDirectedGraph called twice due to React.strict in dev environment
    const initalized = useRef<boolean>(false);

    // this is reference object referred in the html tag
    const svgRef = useRef<SVGSVGElement | null>(null);

    // using useEffects to paint the ForceDirectedGraph
    useEffect(() => {
        console.log("use Effects called")
        if (!initalized.current) {
            console.log("use Effects called - init")
            createForceDirectedGraph(jsonData);
            initalized.current = true;
        }
    }, [jsonData]);

    function createForceDirectedGraph(
        data: {
            links: DataLink[],
            nodes: DataNode[]
        }

    ): SVGSVGElement | null {
        // Dimensions
        const width = 600;
        const height = 600;

        // Specify the color scale.
        const color = d3.scaleOrdinal(d3.schemeCategory10);

        // The force simulation mutates links and nodes, so create a copy
        // so that re-evaluating this cell produces the same result.
        const links = data.links.map(d => ({ ...d }));
        const nodes = data.nodes.map(d => ({ ...d }));

        // Create a simulation with several forces.
        const simulation = d3.forceSimulation(nodes)
            .force("link", d3.forceLink(links).id((d: any) => d.id))
            .force("charge", d3.forceManyBody())
            .force("center", d3.forceCenter(width / 2, height / 2))
            .on("tick", ticked);

        // Create the SVG container.
        const svg = d3.select(svgRef.current).attr("width", width).attr("height", height).attr("viewBox", [0, 0, width, height]).attr("style", "max-width: 100%; height: auto;");
        // const svg = d3.create("svg")
        //     .attr("width", width)
        //     .attr("height", height)
        //     .attr("viewBox", [0, 0, width, height])
        //     .attr("style", "max-width: 100%; height: auto;");

        // Add a line for each link, and a circle for each node.
        const link = svg.append("g")
            .attr("stroke", "#999")
            .attr("stroke-opacity", 0.6)
            .selectAll()
            .data(links)
            .join("line")
            .attr("stroke-width", d => Math.sqrt(d.value));

        const node = svg.append("g")
            .attr("stroke", "#fff")
            .attr("stroke-width", 1.5)
            .selectAll()
            .data(nodes)
            .join("circle")
            .attr("r", 5)
            .attr("fill", d => color(d.group));

        node.append("title")
            .text(d => d.id);

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

        // Set the position attributes of links and nodes each time the simulation ticks.
        function ticked() {
            link
                .attr("x1", (d: any) => d.source.x)
                .attr("y1", (d: any) => d.source.y)
                .attr("x2", (d: any) => d.target.x)
                .attr("y2", (d: any) => d.target.y);

            node
                .attr("cx", d => d.x)
                .attr("cy", d => d.y);
        }

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

        return svg.node();
    }



    // const returnSvg = createForceDirectedGraph(jsonData);

    return (
        <section>
            <div>ForceDirectedGraph</div>
            <svg ref={svgRef} className="border-4 border-green-800 w-screen h-screen">

            </svg>
            {/* {createForceDirectedGraph(jsonData.links, jsonData.nodes.slice(0, 2))} */}
            {/* {returnSvg} */}
            <section className="border-8 border-red-400 p-2">
                {/* <button onClick={handleClick('/canvas')}>Show Canvas</button> */}
                <div className="text-center items-center">
                    <p>Click counter - You clicked {count} times</p>
                    <button onClick={() => setHello(count + 1)}>Click me</button>
                </div>
                {/* <Link href="/canvas">Show Canvas</Link> */}
            </section>
        </section>
    )
}

export default ForceDirectedGraph