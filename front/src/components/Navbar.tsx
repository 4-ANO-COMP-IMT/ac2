import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { useTheme } from '@/hooks/use_theme'
import { useState } from 'react'
import { FaGithub } from 'react-icons/fa'
import { IoSunnyOutline } from 'react-icons/io5'
import { RiMenu2Fill } from 'react-icons/ri'
import { IoClose } from 'react-icons/io5'

export function Navbar() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [fade, setFade] = useState(false)

  const { theme, setTheme } = useTheme()

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
    <nav className="fixed left-0 top-0 z-10 flex w-full select-none items-center justify-between border-b-[1px] px-8 py-3 font-geist text-[15px] sm:px-16">
      <div
        className={`absolute left-0 top-0 -z-10 h-full w-full border-gray-300 backdrop-blur-sm ${theme === 'light' ? 'bg-white/30' : theme === 'dark' ? 'bg-black/30' : 'bg-white/30'}`}
      ></div>
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
            className={`absolute left-0 top-0 z-20 flex h-screen w-3/5 min-w-72 transform flex-col gap-12 p-8 transition-all duration-200 ${theme === 'light' ? 'bg-white' : theme === 'dark' ? 'border-[1px] border-r-gray-300 bg-black' : 'bg-white'} ${fade ? 'translate-x-0' : '-translate-x-96'}`}
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
      <div className="flex items-center justify-center gap-2">
        <Button variant="outline" className="px-3 text-primary" size="sm">
          <a href="/event">Criar evento</a>
        </Button>
        <Button variant="ghost" size="icon">
          <a
            href="https://github.com/4-ANO-COMP-IMT/ac2"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub className="cursor-pointer text-xl text-blue-primary" />
          </a>
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <IoSunnyOutline className="cursor-pointer text-xl text-blue-primary" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="z-50">
            <DropdownMenuItem onClick={() => setTheme('light')}>
              Light
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme('dark')}>
              Dark
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme('system')}>
              System
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  )
}
