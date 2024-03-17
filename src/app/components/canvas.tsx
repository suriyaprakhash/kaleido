import ForceDirectedGraph from "../diagrams/forceDirectedGraph";

function Canvas({jsonData, actuatorType, parentCallback}: any) {

  function gotoDragAndDrop() {
    parentCallback(undefined)
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
      <h2>Canvas</h2>
      Determined actuator type {actuatorType}
      <ForceDirectedGraph jsonData = {jsonData}/>
      {/* {nodeList} */}
    </section>

  )
}

export default Canvas