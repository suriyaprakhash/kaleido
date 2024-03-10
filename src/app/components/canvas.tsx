import ForceDirectedGraph from "./forceDirectedGraph";

function Canvas({jsonData, parentCallback}: any) {

  interface MyNode {
    id: string;
    group: number;
  }
  const nodes: MyNode[] = jsonData.nodes;

  const nodeList = nodes?.map((node) => (
    <div key={node.id}>
      <p>Node: {node.id}</p>
      <p>Group: {node.group}</p>
    </div>
  ));

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
      <ForceDirectedGraph jsonData = {jsonData}/>
      {/* {nodeList} */}
    </section>

  )
}

export default Canvas