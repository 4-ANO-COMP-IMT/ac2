import { createContext, ReactNode, useState } from 'react'

type PaintedDivs = {
  [id: number]: number[]
}

type EventContext = {
  isLogged: boolean
  setIsLogged: React.Dispatch<React.SetStateAction<boolean>>
  paintedDivs: PaintedDivs
  setPaintedDivs: React.Dispatch<React.SetStateAction<PaintedDivs>>
  next: number
  setNext: React.Dispatch<React.SetStateAction<number>>
}

export const EventContext = createContext<EventContext | undefined>(undefined)

export const EventProvider = ({ children }: { children: ReactNode }) => {
  const [isLogged, setIsLogged] = useState(false)
  const [paintedDivs, setPaintedDivs] = useState<PaintedDivs>({})
  const [next, setNext] = useState(0)

  return (
    <EventContext.Provider
      value={{
        isLogged,
        setIsLogged,
        paintedDivs,
        setPaintedDivs,
        next,
        setNext
      }}
    >
      {children}
    </EventContext.Provider>
  )
}
