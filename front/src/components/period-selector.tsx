import { Card } from '@/components/ui/card'
import { useTheme } from '@/hooks/use-theme'
import { useState } from 'react'

type PeriodSelectorProps = {
  dates: Date[]
  notEarlierThan: number
  notLaterThan: number
  timezone: number
}

type Interval = {
  startDate: Date
  endDate: Date
}

export function PeriodSelector({
  dates,
  notEarlierThan,
  notLaterThan,
  timezone
}: PeriodSelectorProps) {
  const { theme } = useTheme()
  const intervals: Interval[] = dates
    .sort((a, b) => a.getTime() - b.getTime())
    .map((date) => {
      const startDate = new Date(date)
      startDate.setHours(notEarlierThan)
      const endDate = new Date(date)
      endDate.setHours(notLaterThan)
      return {
        // Add timezone offset
        startDate: new Date(startDate.getTime() + timezone * 60 * 60 * 1000),
        endDate: new Date(endDate.getTime() + timezone * 60 * 60 * 1000)
      }
    })

  const [isDragging, setIsDragging] = useState(false)
  const [paintedDivs, setPaintedDivs] = useState<{
    [id: number]: number[]
  }>({})

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleMouseDown = (id: number, index: number) => {
    setIsDragging(true)
    setPaintedDivs((prev) => {
      const currentIndices = prev[id] || []
      const isIndexPainted = currentIndices.includes(index)

      return {
        ...prev,
        [id]: isIndexPainted
          ? currentIndices.filter((i) => i !== index) // Remove o index se já estiver pintado
          : [...currentIndices, index] // Adiciona o index se não estiver pintado
      }
    })
  }

  const handleMouseOver = (id: number, index: number) => {
    if (isDragging) {
      setPaintedDivs((prev) => {
        const currentIndices = prev[id] || []
        const isIndexPainted = currentIndices.includes(index)

        return {
          ...prev,
          [id]: isIndexPainted
            ? currentIndices.filter((i) => i !== index) // Remove o index se já estiver pintado
            : [...currentIndices, index] // Adiciona o index se não estiver pintado
        }
      })
    }
  }

  return (
    <Card className="relative flex py-2 pl-2 pr-3">
      <div
        className="absolute left-0 top-0 z-[5] flex h-full w-full"
        onMouseOver={handleMouseUp}
      ></div>
      <div className="flex h-full flex-col items-center pl-1 pr-2 pt-4">
        {Array.from({
          length:
            intervals[0].endDate.getHours() -
            intervals[0].startDate.getHours() +
            1
        }).map((_, index) => (
          <p
            key={index}
            className={`text-sm ${theme === 'light' ? 'text-primary/60' : 'text-primary'} ${index !== 0 ? `pt-[32px]` : ''}`}
          >
            {(index + intervals[0].startDate.getHours() - timezone)
              .toString()
              .padStart(2, '0') + ':00'}
          </p>
        ))}
      </div>
      {intervals.map((interval, id) => (
        <div
          key={id}
          className="z-10 flex w-28 flex-col items-center justify-center"
        >
          <p
            className={`text-sm ${theme === 'light' ? 'text-primary/60' : 'text-primary'}`}
          >
            {interval.startDate.toLocaleDateString('pt-BR', {
              weekday: 'short',
              month: 'short',
              day: 'numeric'
            })}
          </p>
          <div
            className={`flex w-full select-none flex-col items-center justify-center border-y-[1px] ${theme === 'light' ? 'border-primary/20' : 'border-primary'} ${id === 0 ? 'rounded-l-md border-l-[1px] border-r-[1px]' : 'border-r-[1px]'} ${id === intervals.length - 1 ? 'rounded-r-md' : ''}`}
          >
            {Array.from({
              length:
                ((interval.endDate.getHours() - interval.startDate.getHours()) *
                  60) /
                30
            }).map((_, index) => (
              <div
                key={index}
                onMouseUp={handleMouseUp}
                onMouseDown={() => handleMouseDown(id, index)}
                onMouseOver={() => handleMouseOver(id, index)}
                className={`flex h-[26px] w-full ${theme === 'light' ? 'border-primary/20' : 'border-primary'} ${paintedDivs[id] && paintedDivs[id].includes(index) ? 'bg-blue-400/80' : 'bg-transparent'} ${
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
      ))}
    </Card>
  )
}
