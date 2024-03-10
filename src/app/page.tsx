'use client'

import Link from "next/link";
import Canvas from "./canvas/page";
import { FormEvent, useEffect, useState } from "react";
import DragAndDrop from "./components/dragAndDrop";
import { ValidationType } from "./shared/fileValidator";

export default function Page() {
  const [count, setHello] = useState(0);
  const [type] = useState<ValidationType>('SpringBeanJson');
  // var effectCount = 5;
  // useEffect(setCount);

  // function setCount() {
  //   console.log(effectCount)
  //   effectCount = count + 1;
  // }


  return (

    // <main className="flex min-h-screen flex-col items-center justify-between p-24">
    //   <Navbar />
    //   hello world
    //   <Footer />
    // </main>
    <main className="flex flex-col border-8 border-blue-500">
      {/* <h1 className="font-bold text-red-700 text-2xl"> */}
      <section className="border-8 border-red-500 text-center items-center">
          Visualize your spring dependencies
          <h1>data gogg - check not getting applied</h1>
          {/* <button onClick={handleClick('/Canvas')}>Show Canvas</button> */}
      </section>
      <section className="border-8 border-red-300 max-w-lg p-3">
          <DragAndDrop validationTypeFromParent = {type}/>
      </section>
      <section className="border-8 border-red-400 p-2">
        {/* <button onClick={handleClick('/canvas')}>Show Canvas</button> */}
        <div className="text-center items-center">
          <p>Click counter - You clicked {count} times</p>
          <button onClick={() => setHello(count + 1)}>Click me</button>
        </div>
        {/* <Link href="/canvas">Show Canvas</Link> */}
      </section>
    </main>
  );
}
