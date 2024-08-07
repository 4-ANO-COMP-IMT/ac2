import { useEffect, useState } from 'react'

export function AnimatedBalls() {
  const [fade, setFade] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setFade(true)
    }, 200)
  }, [])
  return (
    <div
      className={`absolute inset-0 -z-10 grid h-full w-full grid-cols-2 justify-items-center gap-4 transition-all duration-1000 ${fade ? 'opacity-100' : 'opacity-0'}`}
    >
      <div className="h-[320px] w-[320px] animate-one self-end justify-self-end rounded-full bg-blue-900 opacity-50 blur-[7rem]"></div>
      <div className="h-[320px] w-[320px] animate-two rounded-full  bg-blue-500 opacity-50 blur-[7rem]"></div>
      <div className="h-[320px] w-[320px] animate-two rounded-full  bg-blue-300 opacity-50 blur-[7rem]"></div>
      <div className="h-[320px] w-[320px] animate-one self-start justify-self-start rounded-full  bg-blue-600 opacity-50 blur-[7rem]"></div>
    </div>
  )
}
