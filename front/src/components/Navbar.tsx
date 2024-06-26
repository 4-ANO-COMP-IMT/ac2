import { useState } from 'react'
import { FaGithub } from 'react-icons/fa'
import { IoSunnyOutline } from 'react-icons/io5'
import { RiMenu2Fill } from 'react-icons/ri'
import { IoClose } from 'react-icons/io5'

export function Navbar() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [fade, setFade] = useState(false)

  const handleOpenDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen)
    setTimeout(() => {
      setFade(true)
    }, 100)
  }

  const handleCloseDrawer = () => {
    setTimeout(() => {
      setIsDrawerOpen(!isDrawerOpen)
    }, 100)
    setFade(false)
  }

  return (
    <nav className="font-geist fixed left-0 top-0 flex w-full select-none items-center justify-between border-b-[1px] border-gray-300 px-8 py-3 text-[15px] sm:px-16">
      <div className="absolute left-0 top-0 -z-10 h-full w-full bg-white/30 backdrop-blur-sm"></div>
      <div className="hidden items-center justify-center gap-10 sm:flex">
        <h1 className="font-bold text-blue-primary">BoraMarcar</h1>
        <a
          href="/"
          className="font-light text-blue-secondary transition-all duration-200 hover:text-blue-primary"
        >
          Home
        </a>
        <a
          href="/about"
          className="font-light text-blue-secondary transition-all duration-200 hover:text-blue-primary"
        >
          Sobre nós
        </a>
      </div>
      <div className="flex items-center justify-center gap-10 sm:hidden">
        <RiMenu2Fill
          className="cursor-pointer text-xl text-blue-primary"
          onClick={handleOpenDrawer}
        />
      </div>
      {isDrawerOpen && (
        <>
          <div
            className={`absolute left-0 top-0 z-10 h-screen w-full bg-black transition-all duration-200 ${fade ? 'opacity-80' : 'opacity-0'}`}
            onClick={handleCloseDrawer}
          ></div>
          <div
            className={`absolute left-0 top-0 z-20 flex h-screen w-3/5 min-w-72 transform flex-col gap-12 bg-white p-8 transition-all duration-200 ${fade ? 'translate-x-0' : '-translate-x-96'}`}
          >
            <div className="flex items-center justify-between gap-8">
              <h1 className="text-2xl font-bold text-blue-primary">
                BoraMarcar
              </h1>
              <IoClose
                className="cursor-pointer text-2xl text-blue-primary"
                onClick={handleCloseDrawer}
              />
            </div>
            <div className="flex flex-col gap-4">
              <a
                href="/"
                className="text-xl font-light text-blue-secondary transition-all duration-200 hover:text-blue-primary"
              >
                Home
              </a>
              <a
                href="/about"
                className="text-xl font-light text-blue-secondary transition-all duration-200 hover:text-blue-primary"
              >
                Sobre nós
              </a>
            </div>
          </div>
        </>
      )}
      <div className="flex items-center justify-center gap-6">
        <button className="rounded-md border-[1px] border-gray-300 p-1 px-3 text-blue-primary transition-all duration-300 hover:bg-blue-primary hover:text-white">
          Criar evento
        </button>
        <a
          href="https://github.com/4-ANO-COMP-IMT/ac2"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGithub className="cursor-pointer text-xl text-blue-primary" />
        </a>
        <IoSunnyOutline className="cursor-pointer text-xl text-blue-primary" />
      </div>
    </nav>
  )
}
