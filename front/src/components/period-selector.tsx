import { Card } from '@/components/ui/card'
import { useState } from 'react'
import { toast } from '@/components/ui/use-toast'
import { useEvent } from '@/hooks/use-event'
import { Interval } from '@/types/interval'
import { useTheme } from '@/hooks/use-theme'

type PeriodSelectorProps = {
  dates: number[]
  notEarlier: number
  notLater: number
  timezone: number
  membersDispatch: React.Dispatch<
    React.SetStateAction<
      {
        name: string
        available: boolean
        availabilities: { [id: number]: number[] }
      }[]
    >
  >
}

export function PeriodSelector({
  dates,
  notEarlier,
  notLater,
  // timezone,
  membersDispatch
}: PeriodSelectorProps) {
  const { isLogged, paintedDivs, setPaintedDivs, next, countDivs } = useEvent()
  const { theme } = useTheme()
  const [isDragging, setIsDragging] = useState(false)

  const intervals: Interval[] = dates
    .sort((a, b) => a - b)
    .map((date) => {
      const startDate = new Date(date)
      startDate.setHours(notEarlier)
      const endDate = new Date(date)
      endDate.setHours(notLater)
      return {
        // Add timezone offset
        startDate,
        endDate
      }
    })

  const handleMouseUp = () => {
    setIsDragging(false)
    membersDispatch((prev) => {
      return prev.map((member) => {
        return {
          ...member,
          available: true
        }
      })
    })
  }

  const handleMouseDown = (id: number, index: number) => {
    if (isLogged) {
      setIsDragging(true)
      setPaintedDivs((prev) => {
        const currentIndices = prev[id] || []
        const isIndexPainted = currentIndices.includes(index)

        return {
          ...prev,
          [id]: isIndexPainted
            ? currentIndices.filter((i) => i !== index).sort((a, b) => a - b) // Remove o index se já estiver pintado
            : [...currentIndices, index].sort((a, b) => a - b) // Adiciona o index se não estiver pintado
        }
      })
    } else {
      toast({
        title: 'Você precisa estar logado para selecionar um horário',
        description: 'Clique no botão "Editar" para fazer login'
      })
    }
  }

  const handleMouseOver = (id: number, index: number) => {
    if (isDragging) {
      setPaintedDivs((prev) => {
        const currentIndices = prev[id] || []
        const isIndexPainted = currentIndices.includes(index)

        return {
          ...prev,
          [id]: isIndexPainted
            ? currentIndices.filter((i) => i !== index).sort((a, b) => a - b) // Remove o index se já estiver pintado
            : [...currentIndices, index].sort((a, b) => a - b) // Adiciona o index se não estiver pintado
        }
      })
    } else {
      membersDispatch((prev) => {
        return prev.map((member) => {
          const memberAvailabilities = member.availabilities[id] || []
          const isIndexAvailable = memberAvailabilities.includes(index)

          return {
            ...member,
            available: isIndexAvailable
          }
        })
      })
    }
  }

  return (
    <Card className="relative flex w-full py-2 pl-2 pr-4 transition-all duration-500">
      <div
        className="absolute left-0 top-0 z-[5] flex h-full w-full"
        onMouseOver={handleMouseUp}
      ></div>
      <div className="flex h-full flex-col items-center pl-1 pr-2 pt-12">
        {Array.from({
          length:
            intervals[0].endDate.getHours() -
            intervals[0].startDate.getHours() +
            1
        }).map((_, index) => {
          return (
            <p
              key={index}
              className={`text-sm text-foreground ${index !== 0 ? `pt-8` : ''}`}
            >
              {(index + intervals[0].startDate.getHours())
                .toString()
                .padStart(2, '0') + ':00'}
            </p>
          )
        })}
      </div>
      {intervals.map((interval, id) => {
        if (window.innerWidth < 768 ? id >= next && id < next + 3 : true)
          return (
            <div
              key={id}
              className="z-10 flex w-full flex-col items-center justify-center gap-2"
            >
              <div className="flex flex-col items-center justify-center">
                <p className={`text-sm text-foreground`}>
                  {interval.startDate.toLocaleDateString('pt-BR', {
                    day: '2-digit',
                    month: 'short'
                  })}
                </p>
                <p className={`text-sm font-bold text-foreground`}>
                  {interval.startDate
                    .toLocaleDateString('pt-BR', {
                      weekday: 'long'
                    })
                    .charAt(0)
                    .toUpperCase() +
                    interval.startDate
                      .toLocaleDateString('pt-BR', {
                        weekday: 'short'
                      })
                      .slice(1)}
                </p>
              </div>
              <div
                className={`flex w-full select-none flex-col items-center justify-center border-y-[1px] border-foreground/20 ${id === 0 ? 'rounded-l-md border-l-[1px] border-r-[1px]' : 'border-l-[1px] border-r-[1px] md:border-l-[0px]'} ${id === intervals.length - 1 ? 'rounded-r-md' : ''}`}
              >
                {Array.from({
                  length:
                    ((interval.endDate.getHours() -
                      interval.startDate.getHours()) *
                      60) /
                    30
                }).map((_, index) => (
                  <div
                    key={index}
                    onMouseUp={handleMouseUp}
                    onMouseDown={() => handleMouseDown(id, index)}
                    onMouseOver={() => handleMouseOver(id, index)}
                    style={{
                      backgroundColor: isLogged
                        ? paintedDivs[id] && paintedDivs[id].includes(index)
                          ? theme === 'light'
                            ? 'rgba(210, 200, 255, 0.8)'
                            : 'rgba(50, 78, 158, 0.8)'
                          : 'transparent'
                        : countDivs[id] &&
                            countDivs[id].find((c) => c.index === index)!
                              .count > 0
                          ? theme === 'light'
                            ? `rgba(${210 - 30 * countDivs[id].find((c) => c.index === index)!.count}, ${200 - 30 * countDivs[id].find((c) => c.index === index)!.count}, 255, 0.8)`
                            : `rgba(50, 78, 158, ${1 - 0.15 * countDivs[id].find((c) => c.index === index)!.count})`
                          : 'transparent'
                    }}
                    className={`flex h-[26px] w-full border-foreground/20 transition-all duration-0 ${
                      index === 0
                        ? 'border-t-0'
                        : index % 2 === 0
                          ? 'border-t-[1px] border-solid'
                          : 'border-t-[1px] border-dashed'
                    }`}
                  ></div>
                ))}
              </div>
            </div>
          )
      })}
    </Card>
  )
}
