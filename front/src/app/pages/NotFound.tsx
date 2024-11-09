import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'

export function NotFound() {
  const [fade, setFade] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setFade(true)
    }, 100)
  }, [])

  return (
    <main className="flex w-full flex-col items-center justify-center gap-6 overflow-x-hidden bg-background py-24 text-center font-geist transition-all duration-500">
      <div className="flex w-full flex-col items-center justify-center gap-2 px-12 py-48 text-center md:px-0">
        <div
          className={`absolute grid h-full w-full grid-cols-2 justify-items-center gap-12 transition-all duration-2000 ${fade ? 'opacity-100' : 'opacity-0'}`}
        >
          <div className="h-[320px] w-[320px] animate-one self-end justify-self-end rounded-full bg-blue-900 opacity-50 blur-[7rem]"></div>
          <div className="h-[320px] w-[320px] animate-two rounded-full  bg-blue-500 opacity-50 blur-[7rem]"></div>
          <div className="h-[320px] w-[320px] animate-two rounded-full  bg-blue-300 opacity-50 blur-[7rem]"></div>
          <div className="h-[320px] w-[320px] animate-one self-start justify-self-start rounded-full  bg-blue-600 opacity-50 blur-[7rem]"></div>
        </div>
        <h1
          className={`transform text-6xl font-bold transition-all duration-1000 sm:text-7xl lg:text-9xl ${fade ? 'translate-x-0 opacity-100' : 'translate-x-96 opacity-0'}`}
        >
          404
        </h1>

        <p
          className={`mt-8 w-full transform text-center text-sm transition-all duration-3000 sm:w-3/5 lg:w-2/5 lg:text-base ${fade ? 'translate-x-0 opacity-100' : 'translate-x-96 opacity-0'}`}
        >
          O evento que você procura não foi encontrado, mas você pode criar um
          novo evento!
        </p>
        <a href="/event">
          <Button
            // size="lg"
            variant="default"
            className={`mt-4 transform transition-all duration-4000 ${fade ? 'translate-x-0 opacity-100' : 'translate-x-96 opacity-0'}`}
          >
            Criar evento
          </Button>
        </a>
      </div>

      <div
        className={`flex w-full transform items-center justify-center transition-all duration-7000 ${fade ? 'opacity-100' : 'opacity-0'}`}
      ></div>
    </main>
  )
}
