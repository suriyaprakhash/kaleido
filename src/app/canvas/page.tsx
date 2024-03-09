import Link from 'next/link'
import React from 'react'

function Canvas() {
  return (
    <section>
      <section className="border-4 border-red-800 py-3 w-svw">
        Menu bar section
        <div className="float-right border-4 border-red-600  hover:animate-bounce">
          <Link href="/">Go Back</Link>
        </div>
      </section>
      <div>Canvas</div>
    </section>

  )
}

export default Canvas