import { FaGithub } from 'react-icons/fa'
import { IoSunnyOutline } from 'react-icons/io5'

export function Navbar() {
  return (
    <nav className="fixed left-0 top-0 flex w-full select-none items-center justify-between border-b-[1px] border-gray-300 px-16 py-3 font-geist text-[15px]">
      <div className="absolute left-0 top-0 -z-10 h-full w-full bg-white/30 backdrop-blur-sm"></div>
      <div className="flex items-center justify-center gap-10">
        <h1 className="font-bold text-primary">BoraMarcar</h1>
        <a
          href="/"
          className="font-light text-secondary transition-all duration-200 hover:text-primary"
        >
          Home
        </a>
        <a
          href="/about"
          className="font-light text-secondary transition-all duration-200 hover:text-primary"
        >
          Sobre nós
        </a>
      </div>
      <div className="flex items-center justify-center gap-6">
        <button className="rounded-md border-[1px] border-gray-300 p-1 px-3 text-primary transition-all duration-300 hover:bg-primary hover:text-white">
          Criar evento
        </button>
        <a
          href="https://github.com/4-ANO-COMP-IMT/ac2"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGithub className="cursor-pointer text-xl text-primary" />
        </a>
        <IoSunnyOutline className="cursor-pointer text-xl text-primary" />
      </div>
    </nav>
  )
}
