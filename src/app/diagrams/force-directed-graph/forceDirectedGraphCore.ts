import * as d3 from 'd3';
import { ForceDirectedGraphContainer } from "./forceDirectedGraphTypes";
import { MutableRefObject } from "react";
import { D3DragEvent } from 'd3';



export interface ForceDirectedGraphInput {
    jsonData: ForceDirectedGraphContainer,
    svgRef?: MutableRefObject<SVGSVGElement | null>,
    svgRefElementString?: string,
    height?: number,
    width?: number
}

export function clearAllSvgG() {
    // this removes the existing nodes & link
    d3.selectAll('g')?.remove();
}

/**
     * The primary function thats gets called during useEffect
     * 
     * @param data 
     * @returns 
     */
export function createForceDirectedGraph(
    forceDirectedGraphInput: ForceDirectedGraphInput
): d3.Selection<SVGSVGElement | null, unknown,  (null|HTMLElement), undefined> {

    const data: ForceDirectedGraphContainer = forceDirectedGraphInput.jsonData;
    const svgRef: MutableRefObject<SVGSVGElement | null> = forceDirectedGraphInput.svgRef!;
    const svgRefElementString: string = forceDirectedGraphInput.svgRefElementString!;
   
    // Select the SVG container.
    let svg: d3.Selection<SVGSVGElement | null, unknown, (null|HTMLElement), undefined>;
    if (svgRef) {
        svg = d3.select(svgRef.current);
    }
    else {
        svg = d3.select(svgRefElementString);
    }

    // d3.select(svgRef.current) ? d3.select(svgRef.current) :svgRefElementString)
    // svg = d3.select(svgRef.current);
    // .attr("width", width).attr("height", height).attr("viewBox", [0, 0, width, height])
    // .attr("style", "max-width: 100%; height: auto");

    // Dimensions based on svg element size
    // const svgNode: SVGSVGElement | null = svg.node();
    // const width: number = svgNode?.clientWidth ?  svgNode?.clientWidth : 0;
    // const height: number = svgNode?.clientHeight ? svgNode?.clientHeight : 0;
    const width = forceDirectedGraphInput.width ? forceDirectedGraphInput.width : 1600;
    const height = forceDirectedGraphInput.height ? forceDirectedGraphInput.height : 1200;

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
        .attr("fill", d => color(d.group + ''));

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
    const zoomContainer: d3.Selection<SVGSVGElement | null, unknown,  (null|HTMLElement), undefined> = svg.call(zoom);
    zoomContainer.append('g');
    
    reset();

    function reset() {
        svg.transition()
            .duration(750)
            .call(zoom.transform, d3.zoomIdentity);
    }

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