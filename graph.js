// Your JSON data
// const data = {
//     "nodes": [
//         { "name": "myBean", "label": "My Bean" },
//         { "name": "anotherBean", "label": "Another Bean" }
//     ],
//     "links": [
//         { "source": "anotherBean", "target": "myBean" }
//     ]
// };


/////////////////////////////// VESTOIN 4 //////////////////////////////////////////////

// var svg = d3.select("svg"),
// width = +svg.attr("width"),
// height = +svg.attr("height");

// var color = d3.scaleOrdinal(d3.schemeCategory20);

// var simulation = d3.forceSimulation()
// .force("link", d3.forceLink().id(function (d) { return d.id; }))
// .force("charge", d3.forceManyBody())
// .force("center", d3.forceCenter(width / 2, height / 2));

// d3.json("test2.json", function (error, graph) {
//     console.log(graph);
// if (error) {
//     console.log('error', error);
//     throw error;
// }
// var link = svg.append("g")
//     .attr("class", "links")
//     .selectAll("line")
//     .data(graph.links)
//     .enter().append("line")
//     .attr("stroke-width", function (d) { return Math.sqrt(d.value); });

// var node = svg.append("g")
//     .attr("class", "nodes")
//     .selectAll("circle")
//     .data(graph.nodes)
//     .enter().append("circle")
//     .attr("r", 10)
//     .attr("fill", function (d) { return color(d.group); })
//     .call(d3.drag()
//         // .on("start", dragstarted)
//         .on("drag", dragged)
//         .on("end", dragended));

// // node.append("title")
// //     .text(function (d) { return d.id; });

// simulation
//     .nodes(graph.nodes)
//     .on("tick", ticked);

// simulation.force("link")
//     .links(graph.links);

// function ticked() {
//     link
//         .attr("x1", function (d) { return d.source.x; })
//         .attr("y1", function (d) { return d.source.y; })
//         .attr("x2", function (d) { return d.target.x; })
//         .attr("y2", function (d) { return d.target.y; });

//     node
//         .attr("cx", function (d) { return d.x; })
//         .attr("cy", function (d) { return d.y; });
// }

// });

// function dragstarted(d) {

// // d.fx = d.x;
// // d.fy = d.y;
// // console.log('dragstarted',d.x, d.y)
// }

// function dragged(d) {
//     console.log('dragged',d3.event.x, d3.event.y);
// d.fx = d3.event.x;
// d.fy = d3.event.y;

// }

// function dragended(d) {
// if (!d3.event.active) simulation.alphaTarget(0);
// d.fx = d.x;
// d.fy = d.y;
// // console.log('dragended',d.fx, d.fy)

// }

/////////////////////////////////////////////////////////////////////////////

// function dragstarted(d) {
//     // if (!d3?.event?.active) simulation.alphaTarget(0.3).restart();
//     d.fx = d.dx;
//     d.fy = d.dy;
// }

// function dragged(d) {
//     console.log(d);
//     d.fx = d3.event.x;
//     d.fy = d3.event.y;
// }

// function dragended(d) {
//     // if (!d3.event.active) simulation.alphaTarget(0);
//     d.fx = null;
//     d.fy = null;
// }

/////////////////////////////// VESTOIN 7 //////////////////////////////////////////////

// const svg = d3.select("svg");
// const width = +svg.attr("width");
// const height = +svg.attr("height");

// const color = d3.scaleOrdinal(d3.schemeCategory20);

// const simulation = d3.forceSimulation()
//   .force("link", d3.forceLink().id(d => d.id))
//   .force("charge", d3.forceManyBody())
//   .force("center", d3.forceCenter(width / 2, height / 2));

// d3.json("test2.json")
//   .then(graph => {
//     const link = svg.append("g")
//       .attr("class", "links")
//       .selectAll("line")
//       .data(graph.links)
//       .enter()
//       .append("line")
//       .attr("stroke-width", d => Math.sqrt(d.value));

//     const node = svg.append("g")
//       .attr("class", "nodes")
//       .selectAll("circle")
//       .data(graph.nodes)
//       .enter()
//       .append("circle")
//       .attr("r", 5)
//       .attr("fill", d => color(d.group))
//       .call(d3.drag()
//         .on("start", dragstarted)
//         .on("drag", dragged)
//         .on("end", dragended));

//     node.append("title")
//       .text(d => d.id);

//     simulation
//       .nodes(graph.nodes)
//       .on("tick", ticked);

//     simulation.force("link")
//       .links(graph.links);

//     function ticked() {
//       link
//         .attr("x1", d => d.source.x)
//         .attr("y1", d => d.source.y)
//         .attr("x2", d => d.target.x)
//         .attr("y2", d => d.target.y);

//       node
//         .attr("cx", d => d.x)
//         .attr("cy", d => d.y);
//     }
//   })
//   .catch(error => {
//     console.error("Error loading data:", error);
//   });

// function dragstarted(d) {
//   d.fx = d.x;
//   d.fy = d.y;
//   console.log("dragstarted", d.x, d.y);
// }

// function dragged(d) {
//   d.fx = d3.event.x;
//   d.fy = d3.event.y;
//   console.log("dragged", d.x, d.y);
// }

// function dragended(d) {
//   if (!d3.event.active) simulation.alphaTarget(0);
//   d.fx = d.x;
//   d.fy = d.y;
//   console.log("dragended", d.fx, d.fy);
// }


//////////////////////////////////////////////////////////////////////

var svg = d3.select("svg"),
width = +svg.attr("width"),
height = +svg.attr("height");

data = FileAttachment("miserables.json").json();
function chart() {
    // Specify the dimensions of the chart.
    const width = 928;
    const height = 600;
  
    // Specify the color scale.
    const color = d3.scaleOrdinal(d3.schemeCategory10);
  
    // The force simulation mutates links and nodes, so create a copy
    // so that re-evaluating this cell produces the same result.
    const links = data.links.map(d => ({...d}));
    const nodes = data.nodes.map(d => ({...d}));
  
    // Create a simulation with several forces.
    const simulation = d3.forceSimulation(nodes)
        .force("link", d3.forceLink(links).id(d => d.id))
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
        .attr("fill", d => color(d.group));
  
    node.append("title")
        .text(d => d.id);
  
    // Add a drag behavior.
    node.call(d3.drag()
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended));
  
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
    function dragstarted(event) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      event.subject.fx = event.subject.x;
      event.subject.fy = event.subject.y;
    }
  
    // Update the subject (dragged node) position during drag.
    function dragged(event) {
      event.subject.fx = event.x;
      event.subject.fy = event.y;
    }
  
    // Restore the target alpha so the simulation cools after dragging ends.
    // Unfix the subject position now that it’s no longer being dragged.
    function dragended(event) {
      if (!event.active) simulation.alphaTarget(0);
      event.subject.fx = null;
      event.subject.fy = null;
    }
  
    // When this cell is re-run, stop the previous simulation. (This doesn’t
    // really matter since the target alpha is zero and the simulation will
    // stop naturally, but it’s a good practice.)
    invalidation.then(() => simulation.stop());
  
    return svg.node();
  });