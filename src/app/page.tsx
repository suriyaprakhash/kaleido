'use client'

import { useState } from "react";
import Canvas from "./components/canvas";
import DragAndDrop from "./components/dragAndDrop";
import { ActuatorType } from "./actuators/actuatorTypes";

export default function Page() {

  const callbackFromDragAndDrop = (jsonData: object, actuatorType: ActuatorType) => {
    // setData(jsonData)
    console.log('inside page dragNdrop callback')
    console.log(jsonData)
    setActuatorType(actuatorType)
    setJsonData(jsonData)

  }

  const callbackFromCanvas = (jsonData: object) => {
    // setData(jsonData)
    console.log('inside page canvas callback')
    console.log(jsonData)
    setJsonData(jsonData)
  }

  const [jsonData, setJsonData] = useState<object>();
  const [actuatorType, setActuatorType] = useState<ActuatorType>('unknown');

  return (

    <main className="flex flex-col min-h-[80vh] justify-center">

      <section className="">
        {jsonData === undefined ?
          <DragAndDrop validationTypeFromParent='json' parentCallback={callbackFromDragAndDrop} />
          :
          <Canvas actualJsonData={jsonData} actuatorType={actuatorType} parentCallback={callbackFromCanvas} />
        }
      </section>

    </main>
  );
}
