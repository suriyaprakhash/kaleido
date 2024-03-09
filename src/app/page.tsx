'use client'

import Link from "next/link";
import Canvas from "./canvas/page";
import { FormEvent, useEffect, useState } from "react";
import DragAndDrop from "./components/dragAndDrop";

export default function Page() {


  const [count, setHello] = useState(0)
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
    <main className="border-8 border-blue-500">
      {/* <h1 className="font-bold text-red-700 text-2xl"> */}
      <section className="border-8 border-red-500">
        <h1>
          Kaleido
          {/* <button onClick={handleClick('/Canvas')}>Show Canvas</button> */}
        </h1>
        <div className="border-8 border-red-300 max-w-lg">
          <DragAndDrop />
        </div>
      </section>
      <section className="border-8 border-red-400 p-2">
        {/* <button onClick={handleClick('/canvas')}>Show Canvas</button> */}

        <div>
          <p>You clicked {count} times</p>
          <button onClick={() => setHello(count + 1)}>Click me</button>
        </div>
        {/* <Link href="/canvas">Show Canvas</Link> */}
      </section>


    </main>

  );
}
