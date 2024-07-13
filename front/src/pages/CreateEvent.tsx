import { AnimatedBalls } from '@/components/animated-balls'
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
    <main className="relative flex items-center justify-center overflow-x-hidden bg-background py-28 transition-all duration-500">
      <AnimatedBalls />
      <div
        className={`relative transition-all duration-500 ${fade ? 'translate-x-0 opacity-100' : 'translate-x-28 opacity-0'}`}
      >
        <EventCard />
      </div>
    </main>
  )
}
