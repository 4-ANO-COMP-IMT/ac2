import { createContext, ReactNode, useState } from 'react'

type PaintedDivs = {
  [id: number]: number[]
}

type CountDivs = {
  [id: number]: {
    index: number
    count: number
    members: string[]
  }[]
}

type EventContext = {
  isLogged: boolean
  setIsLogged: React.Dispatch<React.SetStateAction<boolean>>
  paintedDivs: PaintedDivs
  setPaintedDivs: React.Dispatch<React.SetStateAction<PaintedDivs>>
  next: number
  setNext: React.Dispatch<React.SetStateAction<number>>
  countDivs: CountDivs
  setCountDivs: React.Dispatch<React.SetStateAction<CountDivs>>
}

export const EventContext = createContext<EventContext | undefined>(undefined)

export const EventProvider = ({ children }: { children: ReactNode }) => {
  const [isLogged, setIsLogged] = useState(false)
  const [paintedDivs, setPaintedDivs] = useState<PaintedDivs>({})
  const [countDivs, setCountDivs] = useState<CountDivs>({})
  const [next, setNext] = useState(0)

  return (
    <EventContext.Provider
      value={{
        isLogged,
        setIsLogged,
        paintedDivs,
        setPaintedDivs,
        next,
        setNext,
        countDivs,
        setCountDivs
      }}
    >
      {children}
    </EventContext.Provider>
  )
}
