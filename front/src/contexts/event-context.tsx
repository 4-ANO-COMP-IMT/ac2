import { createContext, ReactNode, useState } from 'react'

type PaintedDivs = {
  [id: number]: number[]
}

type EventContext = {
  isLogged: boolean
  setIsLogged: React.Dispatch<React.SetStateAction<boolean>>
  paintedDivs: PaintedDivs
  setPaintedDivs: React.Dispatch<React.SetStateAction<PaintedDivs>>
}

export const EventContext = createContext<EventContext | undefined>(undefined)

export const EventProvider = ({ children }: { children: ReactNode }) => {
  const [isLogged, setIsLogged] = useState(false)
  const [paintedDivs, setPaintedDivs] = useState<PaintedDivs>({})

  return (
    <EventContext.Provider
      value={{ isLogged, setIsLogged, paintedDivs, setPaintedDivs }}
    >
      {children}
    </EventContext.Provider>
  )
}
