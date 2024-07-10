import { EventCard } from '@/components/event-card'
import { useEffect, useState } from 'react'

export function CreateEvent() {
  const [fade, setFade] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setFade(true)
    }, 200)
  }, [])

  return (
    <main className="flex items-center justify-center overflow-x-hidden bg-background py-28 transition-all duration-500">
      <div
        className={`absolute grid h-full w-full grid-cols-2 justify-items-center gap-12 transition-all duration-1000 ${fade ? 'opacity-100' : 'opacity-0'}`}
      >
        <div className="h-[320px] w-[320px] animate-one self-end justify-self-end rounded-full bg-blue-900 opacity-50 blur-[7rem]"></div>
        <div className="h-[320px] w-[320px] animate-two rounded-full  bg-blue-500 opacity-50 blur-[7rem]"></div>
        <div className="h-[320px] w-[320px] animate-two rounded-full  bg-blue-300 opacity-50 blur-[7rem]"></div>
        <div className="h-[320px] w-[320px] animate-one self-start justify-self-start rounded-full  bg-blue-600 opacity-50 blur-[7rem]"></div>
      </div>
      <div
        className={`transition-all duration-500 ${fade ? 'translate-x-0 opacity-100' : 'translate-x-28 opacity-0'}`}
      >
        <EventCard />
      </div>
    </main>
  )
}
