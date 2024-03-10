import * as d3 from "d3";
import { SimulationNodeDatum } from "d3-force";
import { SimulationLinkDatum } from 'd3-force';
import { drag } from 'd3-drag';

const node1: Node = { "id": "Napoleon", "group": 1, x: 0, y: 0 };
const node2: Node = { "id": "Myriel", "group": 2, x: 0, y: 0 };

const data: Data = {
  nodes: [
    node1,
    node2,
  ],
  links: [
    { "source": node1, "target": node2, "value": 1},
    // { "source": "Mlle.Baptistine", "target": "Myriel", "value": 8 },
    // { "source": "Mme.Magloire", "target": "Myriel", "value": 10 },
    // { "source": "Mme.Magloire", "target": "Mlle.Baptistine", "value": 6 }
  ]
};

export interface Link extends SimulationLinkDatum<Node> {
  source: Node;  // ID of the source node
  target: Node;  // ID of the target node
  value: number;  // Optional value for influencing link thickness
}

export interface Node extends SimulationNodeDatum {
  id: any;
  group: number;
    x: number;
  y: number;
  // id: string;  // Unique identifier for each node
  // x?: number;   // Initial x-position (optional, defaults to 0)
  // y?: number;   // Initial y-position (optional, defaults to 0)
  // group?: number; // Optional property for node grouping
}

export interface Data {
  links: Link[];
  nodes: Node[];
}

const colorMap = new Map<number, string>();
colorMap.set(1, "red");
colorMap.set(1, "green");

export function chart() {
  // Specify the dimensions of the chart.
  const width = 928;
  const height = 600;

  // Specify the color scale.
  const color = d3.scaleOrdinal(d3.schemeCategory10);

  // The force simulation mutates links and nodes, so create a copy
  // so that re-evaluating this cell produces the same result.
  const links: Link[] = data.links.map(d => ({ ...d }));
  const nodes: Node[] = data.nodes.map(d => ({ ...d }));

  // Create a simulation with several forces.
  const simulation = d3.forceSimulation(nodes)
    .force("link", d3.forceLink(links))
    .force("charge", d3.forceManyBody())
    .force("center", d3.forceCenter(width / 2, height / 2))
    .on("tick", ticked);

  // Create the SVG container.
  const svg = d3.create("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", [0, 0, width, height])
    .attr("style", "max-width: 100%; height: auto;");

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
    .attr("fill", d => color(getColor(d.group)));

  node.append("title")
    .text(d => d.id);

  // Add a drag behavior.
  // node.call(d3.drag()
  //   .on("start", dragstarted)
  //   .on("drag", dragged)
  //   .on("end", dragended));

  var drrrag = node.call(drag) as any;
  drrrag // Generic type for Node and no event data
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended);

    // Drag event handler functions (assuming Node interface is defined)
    function dragstarted(d: any) {
      // Optional: Fix node position to prevent jittering during drag
      d.fx = d.x;
      d.fy = d.y;
    }
    
    function dragged(d: Node, event: any) {
      // Update node position based on drag delta
      d.fx = event.x;
      d.fy = event.y;
      // Optional: Update simulation to reflect changes during drag
      simulation.alphaTarget(0.7); // Increase alpha for faster simulation response
      simulation.restart();
    }
    
    function dragended(d: any) {
      // Optional: Release fixed position after drag
      if (!d.fixed) {
        d.fx = null;
        d.fy = null;
      }
    }
  


  // Set the position attributes of links and nodes each time the simulation ticks.
  function ticked() {
    link
      .attr("x1", d => d.source.x)
      .attr("y1", d => d.source.y)
      .attr("x2", d => d.target.x)
      .attr("y2", d => d.target.y);

    node
      .attr("cx", d => d.x)
      .attr("cy", d => d.y);
  }

  // Reheat the simulation when drag starts, and fix the subject position.
  // function dragstarted(event: any) {
  //   if (!event.active) simulation.alphaTarget(0.3).restart();
  //   event.subject.fx = event.subject.x;
  //   event.subject.fy = event.subject.y;
  // }

  // // Update the subject (dragged node) position during drag.
  // function dragged(event: any) {
  //   event.subject.fx = event.x;
  //   event.subject.fy = event.y;
  // }

  // // Restore the target alpha so the simulation cools after dragging ends.
  // // Unfix the subject position now that it’s no longer being dragged.
  // function dragended(event: any) {
  //   if (!event.active) simulation.alphaTarget(0);
  //   event.subject.fx = null;
  //   event.subject.fy = null;
  // }

  // When this cell is re-run, stop the previous simulation. (This doesn’t
  // really matter since the target alpha is zero and the simulation will
  // stop naturally, but it’s a good practice.)
  // invalidation.then(() => simulation.stop());

  return svg.node();
}


function ensureNode(node: string | number | Node): Node {
  if (typeof node === 'string' || typeof node === 'number') {
    // Handle cases where node is a string or number (e.g., convert to ID)
    // Assuming you have a way to convert IDs to Node objects (replace with your logic)
    return findNodeById(node);
  } else {
    // Node is already a Node object, return it directly
    return node;
  }
}

// Example usage (replace findNodeById with your actual logic)
function someFunction(potentialNode: string | number | Node): number | undefined {
  const actualNode = ensureNode(potentialNode);
  // Use actualNode as a Node object
  return actualNode.x; // Assuming Node has an id property
}

// Replace this with your actual function to find a Node by ID
function findNodeById(id: string | number): Node {
  // Implement logic to search for and return a Node object based on the ID
  throw new Error("findNodeById not implemented");
}

function getColor(group: number) {
  var color: string | undefined = colorMap.get(group);
  return color !== undefined ? color : "blue";
}


