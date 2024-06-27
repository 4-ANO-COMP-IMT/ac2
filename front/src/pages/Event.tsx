import { EventCard } from '@/components/EventCard'
import { useEffect, useState } from 'react'

export function Event() {
  const [fade, setFade] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setFade(true)
    }, 100)
  }, [])

  return (
    <main className="flex items-center justify-center overflow-x-hidden py-28">
      <div
        className={`transition-all duration-500 ${fade ? 'translate-x-0 opacity-100' : 'translate-x-28 opacity-0'}`}
      >
        <EventCard />
      </div>
    </main>
  )
}
