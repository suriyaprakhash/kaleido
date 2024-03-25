import d3 from 'd3';
import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import { clearAllSvgG, createTreeGraph } from './treeGraphCore';
import { TreeGraphNode } from './treeGraphTypes';
import { filter } from './ToTreeGraph';
import { BeansJson } from '@/app/actuators/endpoint-types/beansEndpointTypes';

const TreeGraph = ({ convertedJsonData, actualJsonData }: { convertedJsonData: TreeGraphNode, actualJsonData: BeansJson }) => {

  // used to restrict the createForceDirectedGraph called twice due to React.strict in dev environment
  const initalized = useRef<boolean>(false);

  const [tempJsonData, updateTempJsonData] = useState<TreeGraphNode>(convertedJsonData);
  const [filterInput, setFilterInput] = useState<string>('');

  // this is reference object referred in the html tag
  const svgRef = useRef<SVGSVGElement | null>(null);

  // using useEffects to paint the ForceDirectedGraph
  useEffect(() => {
    console.log("use Effects called")
    if (!initalized.current) {
      console.log("use Effects called - init");
      clearAllSvgG();
      createTreeGraph({
        jsonData: tempJsonData,
        svgRef: svgRef,
      })
      initalized.current = true;
    }
  }, [tempJsonData]);



  function filterInputChange(event: ChangeEvent<HTMLInputElement>): void {
    setFilterInput(event.target.value);
  }

  function filterParentNodes(event: any): void {
    updateTempJsonData(filter(actualJsonData, filterInput));
    initalized.current = false;
  }

  return (
    // <div className="border-4 border-green-800 rounded-lg">
    //   Under Development
    //   <svg ref={svgRef} className="border-4 border-green-400 rounded-lg">
    //   </svg>
    // </div>

    <section className="border-8 border-orange-600">

      <section className="grid gap-4 border-8 border-red-100 p-2 sm:grid-cols-4">

        <div className="sm:col-span-1 border-4 border-green-800 grid grid-cols-2 p-4 h-1/2 ">
          <div className="col-span-2 text-center">Search Window</div>
          <div className="col-span-2 border-4 border-green-800">
            <input className="border-4 border-green-600 w-full" placeholder="search" onChange={filterInputChange} />
          </div>
          <div className="col-span-2 grid grid-cols-2 gap-2 p-2">
            <button className="col-span-1 bg-teal-600 rounded-lg" onClick={filterParentNodes}>
              <span className="text-white">Find Path</span>
            </button>
          </div>
        </div>

        <div className="sm:col-span-3 border-4 border-green-800 rounded-lg">
          <svg ref={svgRef} className="border-4 border-green-400 rounded-lg">
          </svg>
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

export default TreeGraph

