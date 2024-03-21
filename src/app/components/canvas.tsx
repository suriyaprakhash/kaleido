import { ActuatorType } from "../actuators/actuatorTypes";
import { BeansJson } from "../actuators/endpoint-types/beansEndpoint";
import { TypeConverter } from "../diagrams/TypeConverter";
import { ToForceDirectedGraph } from "../diagrams/force-directed-graph/ToForceDirectedGraph";
import ForceDirectedGraph from "../diagrams/force-directed-graph/forceDirectedGraph";
import { ForceDirectedGraphContainer } from "../diagrams/force-directed-graph/forceDirectedGraphTypes";

function Canvas({jsonData, actuatorType, parentCallback}: any) {

  const forceDirectedGraphJsonData = convertJsonData(actuatorType, jsonData);

  function gotoDragAndDrop() {
    parentCallback(undefined)
  }

  function convertJsonData(actuatorType: ActuatorType, jsonData: any): ForceDirectedGraphContainer {
    if (actuatorType  === 'defaultForceDirectedGraph') {
        return jsonData;
    }
    if (actuatorType === 'actuatorBeansJson') {
      const typeConverter: TypeConverter<BeansJson, ForceDirectedGraphContainer> = new ToForceDirectedGraph();
      return typeConverter.convert(jsonData);
    }
    return {
      links: [],
      nodes: []
    };
  }


  return (
    <section>
      <section className="border-4 border-red-800">
        <div className="border-4 border-red-600 flex flex-col">
          <h2>Canvas</h2>
          Determined actuator type {actuatorType}
          <div>Select visulaization to switch</div>
          <button className="bg-teal-600 rounded-lg p-5 w-auto" onClick={gotoDragAndDrop}>
            <span className="p-2 text-white">Go Back</span>
          </button>
        </div>
   
      </section>
      <ForceDirectedGraph jsonData = {forceDirectedGraphJsonData}/>
    </section>

  )
}

export default Canvas