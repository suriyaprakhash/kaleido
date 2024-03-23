import d3 from 'd3';
import React, { useEffect, useRef } from 'react'
import { clearAllSvgG, createTreeGraph } from './treeGraphCore';

const TreeGraph = ({ jsonData }: any) => {

  // used to restrict the createForceDirectedGraph called twice due to React.strict in dev environment
  const initalized = useRef<boolean>(false);

  // this is reference object referred in the html tag
  const svgRef = useRef<SVGSVGElement | null>(null);

  // using useEffects to paint the ForceDirectedGraph
  useEffect(() => {
    console.log("use Effects called")
    if (!initalized.current) {
      console.log("use Effects called - init");
      // clearAllSvgG();
      createTreeGraph({
        jsonData: jsonData,
        svgRef: svgRef,
      })
      initalized.current = true;
    }
  }, [jsonData]);



  return (
    <div className="border-4 border-green-800 rounded-lg">
      Under Development
      <svg ref={svgRef} className="border-4 border-green-400 rounded-lg">
      </svg>
    </div>

  )
}

export default TreeGraph

