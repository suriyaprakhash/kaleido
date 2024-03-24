import * as d3 from 'd3';
import { MutableRefObject } from "react";
import { ForceDirectedGraphInput } from "../force-directed-graph/forceDirectedGraphCore";
import { ForceDirectedGraphContainer } from "../force-directed-graph/forceDirectedGraphTypes";
import { TreeGraphNode } from "./treeGraphTypes";

export interface TreeGraphInput {
    jsonData: TreeGraphNode,
    svgRef?: MutableRefObject<SVGSVGElement | null>,
    svgRefElementString?: string,
    height?: number,
    width?: number
}

export function clearAllSvgG() {
    // this removes the existing nodes & link
    d3.selectAll('svg g')?.remove();
}


/**
     * The primary function thats gets called during useEffect
     * 
     * @param data 
     * @returns 
     */
export function createTreeGraph(
    treeGraphInput: TreeGraphInput
): d3.Selection<SVGSVGElement | null, unknown, (null | HTMLElement), undefined> {

    const data: TreeGraphNode = treeGraphInput.jsonData;
    const svgRef: MutableRefObject<SVGSVGElement | null> = treeGraphInput.svgRef!;
    const svgRefElementString: string = treeGraphInput.svgRefElementString!;

    const fontSize = 12;
    const fontSizeDuringTransition = 15;
    const fontFamily = 'sans-serif';
    const nodeCircleRadius = 5;
    const nodeCircleRadiusDuringTransition = 8;

    // Select the SVG container.
    let svg: d3.Selection<SVGSVGElement | null, unknown, (null | HTMLElement), undefined>;
    if (svgRef) {
        svg = d3.select(svgRef.current);
    }
    else {
        svg = d3.select(svgRefElementString);
    }

    const width = treeGraphInput.width ? treeGraphInput.width : 1600;

    // Specify the color scale.
    const color = d3.scaleOrdinal(d3.schemeCategory10);


    // Compute the tree height; this approach will allow the height of the
    // SVG to scale according to the breadth (width) of the tree layout.
    const root: any = d3.hierarchy(data);
    const dx = 50;
    const dy = width / (root.height + 1);

    // Create a tree layout.
    const tree = d3.cluster().nodeSize([dx, dy]);

    // Sort the tree and apply the layout.
    root.sort((a: any, b: any) => d3.ascending(a.data.name, b.data.name));
    tree(root);

    // Compute the extent of the tree. Note that x and y are swapped here
    // because in the tree layout, x is the breadth, but when displayed, the
    // tree extends right rather than down.
    // let x0 = Infinity;
    // let x1 = -x0;
    // root.each((d: any) => {
    //     if (d.x > x1) x1 = d.x;
    //     if (d.x < x0) x0 = d.x;
    // });

    let x0 = Infinity;
    let x1 = -x0;
    root.each((d: any) => {
        if (d.x > x1) x1 = d.x;
        if (d.x < x0) x0 = d.x;
    });

    // Compute the adjusted height of the tree.
    const height = (x1 - x0 + dx * 2) > 1600 ? 800 : 800;

    svg.attr("width", width)
        .attr("height", height)
        .attr("viewBox", [-dy / 3, x0 - dx, width, height])
        // .attr("viewBox", [dy, dx, width, height])
        .attr("style", "max-width: 100%; height: auto; font: " + fontSize + "px " + fontFamily + ";");
    // .attr("viewBox", [0, 0, width, height])
    // Update the size on window resize
    // svg.attr("width", width).attr("height", height).attr("viewBox", [0, 0, width, height])
    // .attr("style", "max-width: 100%; height: auto");



    const linkHorizontal: any = d3.linkHorizontal()
        .x((d: any) => d.y)
        .y((d: any) => d.x);



    const container = svg.append("g");

    const link = container.append("g")
        .attr("fill", "none")
        .attr("stroke", "#009fb8")
        .attr("stroke-opacity", 0.4)
        .attr("stroke-width", 5)
        .selectAll()
        .data(root.links())
        .join("path")
        .attr("d", linkHorizontal)
        .on('mouseover', function (d, i) {
            d3.select(this).transition()
                 .duration(3)
                 .attr("stroke-width", 10);
        })
        .on('mouseout', function (d, i) {
            d3.select(this).transition()
                 .duration(2)
                 .attr("stroke-width", 5);
       });

    const node = container.append("g")
        .attr("stroke-linejoin", "round")
        .attr("stroke-width", 3)
        .selectAll()
        .data(root.descendants())
        .join("g")
        // .attr("transform", (d: any) => `translate(${d.y},${d.x})`);
        .attr("transform", (d: any) => {
            return `translate(${d.y},${d.x})`;
        });

    node.append("circle")
        .attr("fill", (d: any) => d.children ? "#00b834" : "#b80000")
        .attr("r", nodeCircleRadius)
        .on('mouseover', function (d, i) {
            d3.select(this).transition()
                 .duration(3)
                 .attr("r", nodeCircleRadiusDuringTransition);
        })
        .on('mouseout', function (d, i) {
            d3.select(this).transition()
                 .duration(2)
                 .attr("r", nodeCircleRadius);
       });

    node.append("text")
        .attr("dy", "0.31em")
        .attr("x", (d: any) => d.children ? -25 : 25)
        .attr("text-anchor", (d: any) => d.children ? "end" : "start")
        .text((d: any) => d.data.name)
        .attr("stroke", "white")
        .attr("paint-order", "stroke")
        .on('mouseover', function (d, i) {
            d3.select(this).transition()
                 .duration(3)
                 .attr("style", "font: " + fontSizeDuringTransition + "px " + fontFamily + ";");
        })
        .on('mouseout', function (d, i) {
            d3.select(this).transition()
                 .duration(2)
                 .attr("style", "font: " + fontSize + "px " + fontFamily + ";");
       });


    node
    // Add a zoom/pan behavior.
    const zoom = d3.zoom<any, any>();
    zoom.on("zoom", zoomListener);

    // const zoomContainer: d3.Selection<SVGSVGElement | null, unknown, (null | HTMLElement), undefined> = 
    // if ((x1 - x0 + dx * 2) > 800) {
    //     svg.call(zoom);
    // } else {
    //     container.call(zoom);
    // }
    svg.call(zoom);

    // zoomContainer.append('g');

    function zoomListener(e: any) {
        // node
        //     .attr('transform', (d: any) => {
        //         return `translate(${d.y + e.transform.x},${d.x + e.transform.y})`;
        //     });

        //  link
        //     .attr('transform', (d: any) =>{
        //         console.log(d.source.x)
        //         return `translate(${d.source.y + e.transform.x},${d.source.x + e.transform.y})`;
        //     });

        //     link
        //     .attr('transform', (d: any) => 
        //         `translate(${d.target.y + e.transform.x},${d.target.x + e.transform.y})`
        //     );    
        container
            .attr('transform', e.transform);
        // node.attr("transform", (event: any, d: any) => {
        //     return `translate(${event.y + e.transform.x},${event.x + e.transform.y})`
        // });
        // link.attr("transform", (event: any, d: any) => {
        //     return `translate(${e.transform.x},${e.transform.y})`;
        // });
        // link.attr("transform", (event: any, d: any) => {
        //     return `translate(${e.transform.x},${ e.transform.y})`;
        // });
    }

    return svg;
}