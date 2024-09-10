import Link from "next/link";

export function Header() {
  return (
    <nav className="bg-fuchsia-900 border-gray-200 ">
      <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
        <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="./logo.png" className="h-20" alt="`PerfumePrime`" />
          <span className="self-center text-3xl font-semibold whitespace-nowrap dark:text-white">
            PerfumePrime
          </span>
        </Link>
        <div className="flex items-center space-x-6 rtl:space-x-reverse">
          <span className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors duration-300">
            (identifique-se)
          </span>
        <Link
          href="/login"
          className="inline-flex items-center px-6 py-3 font-semibold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-700 transition-all duration-300"
        >
          Entrar
        </Link>
      </div>
    </div>
    </nav >
  )
}
