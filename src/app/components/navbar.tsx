import Link from "next/link"

const Navbar = () => {
  return (
    <nav className="text-2xl p-4 pl-12 shadow-xl">
        <span className = "text-orange-400">
         <Link href="/">Kaleido</Link>
        </span>
    </nav>
    // <div>The is my na
    //   v bar is working hello</div>
  )
}

export default Navbar