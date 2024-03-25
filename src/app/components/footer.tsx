const Footer = () => {
  return (
    <section className="flex flex-col">
      <footer className="bg-white rounded-lg shadow m-4 dark:bg-white-800">
        <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
          <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">©2023  <a href="https://suriyaprakhash.com/" className="hover:underline">
            Suriya Prakhash Deenadayalan</a>. All Rights Reserved.
          </span>
          <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
            <li>
              <a href="https://www.suriyaprakhash.com/#about" className="hover:underline hover:text-orange-400 me-4 md:me-6">About me</a>
            </li>
            <li>
              <a href="https://www.linkedin.com/in/suriya-prakhash-deenadayalan/" className="hover:underline hover:text-orange-400 me-4 md:me-6">LinkedIn</a>
            </li>
            <li>
              <a href="https://www.suriyaprakhash.com/#contact" className="hover:underline hover:text-orange-400">Contact</a>
            </li>
          </ul>
        </div>
      </footer>
    </section>
  )
}

export default Footer