import { Card } from '@/components/ui/card'
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

  const handleMouseDown = () => {
    setIsDragging(true)
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
    <Card className="flex gap-[1px] p-2" onMouseUp={handleMouseUp}>
      {intervals.map((interval, id) => (
        <div
          key={id}
          className="flex w-24 flex-col items-center justify-center"
        >
          <p>{interval.startDate.toLocaleDateString()}</p>
          <div
            onMouseUp={handleMouseUp}
            onMouseDown={handleMouseDown}
            className="flex w-24 select-none flex-col items-center justify-center rounded-sm border-[1px] border-primary/30"
          >
            {Array.from({
              length:
                ((interval.endDate.getHours() - interval.startDate.getHours()) *
                  60) /
                15
            }).map((_, index) => (
              <div
                key={index}
                onMouseOver={() => handleMouseOver(id, index)}
                className={`flex h-[13px] w-full border-primary/30 ${paintedDivs[id] && paintedDivs[id].includes(index) ? 'bg-blue-300/60' : 'bg-transparent'} ${
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
