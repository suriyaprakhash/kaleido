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

    <section className="">

      <section className="grid gap-4 p-2 sm:grid-cols-4">

        <div className="sm:col-span-1 grid grid-cols-2 p-4 shadow-[0_3px_10px_rgb(0,0,0,0.2)] h-[150px] sm:h-[250px]">
          <div className="col-span-2 text-center text-xl text-gray-500">Tree Search</div>
          <div className="col-span-2">
            <input className="border-2 border-orange-600 w-full rounded-md h-10 p-4" placeholder="search" onChange={filterInputChange} />
          </div>
          <div className="col-span-2 grid grid-cols-2 p-2">
            <button className="col-span-2 bg-orange-600 rounded-lg hover:bg-orange-800" onClick={filterParentNodes}>
              <span className="text-white">Find Path</span>
            </button>
          </div>
        </div>

        {/* <div className="sm:col-span-3">
          <svg ref={svgRef} className="border-4 border-green-400 rounded-lg">
          </svg>
        </div> */}

        <div className="sm:col-span-3 rounded-lg">
          <svg ref={svgRef} className="shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-lg">
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

