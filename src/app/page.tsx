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

    <main className="flex flex-col">
      {/* <h1 className="font-bold text-red-700 text-2xl"> */}
      <section className="border-8 border-red-500">
          MAIN - Visualize your spring dependencies
          <h1>data gogg - check not getting applied</h1>
          {/* <button onClick={handleClick('/Canvas')}>Show Canvas</button> */}
      </section>

      {jsonData === undefined ? 
      <section className="border-8 border-red-300">
          <DragAndDrop validationTypeFromParent='json' parentCallback = {callbackFromDragAndDrop} />
      </section>
      :
      <section>
        <Canvas jsonData = {jsonData} actuatorType = {actuatorType} parentCallback = {callbackFromCanvas}/>
      </section>
      }

    </main>
  );
}
