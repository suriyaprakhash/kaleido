import { ActuatorType } from "../actuators/actuatorTypes";
import { BeansJson } from "../actuators/endpoint-types/beansEndpoint";
import { TypeConverter } from "../diagrams/TypeConverter";
import { ToForceDirectedGraph } from "../diagrams/force-directed-graph/ToForceDirectedGraph";
import ForceDirectedGraph from "../diagrams/force-directed-graph/forceDirectedGraph";
import { DefaultForceDirectedGraph } from "../diagrams/force-directed-graph/forceDirectedGraphTypes";

function Canvas({jsonData, actuatorType, parentCallback}: any) {

  const forceDirectedGraphJsonData = convertJsonData(actuatorType, jsonData);

  function gotoDragAndDrop() {
    parentCallback(undefined)
  }

  function convertJsonData(actuatorType: ActuatorType, jsonData: any): DefaultForceDirectedGraph {
    if (actuatorType  === 'defaultForceDirectedGraph') {
        return jsonData;
    }
    if (actuatorType === 'actuatorBeansJson') {
      const typeConverter: TypeConverter<BeansJson, DefaultForceDirectedGraph> = new ToForceDirectedGraph();
      return typeConverter.convert(jsonData);
    }
    return {
      links: [],
      nodes: []
    };
  }


  return (
    <section>
      <section className="border-4 border-red-800 py-3 w-svw">
        Menu bar section
        <div className="float-right border-4 border-red-600  hover:animate-bounce">
          {/* <Link href="/">Go Back</Link> */}
          <button onClick={gotoDragAndDrop}>
            Go Back
          </button>
        </div>
      </section>
      <section className="flex flex-col items-center">
        <h2 >Canvas</h2>
        Determined actuator type {actuatorType}
      </section>
      <ForceDirectedGraph jsonData = {forceDirectedGraphJsonData}/>
      {/* {nodeList} */}
    </section>

  )
}

export default Canvas