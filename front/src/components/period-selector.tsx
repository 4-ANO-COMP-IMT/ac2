import { Card } from '@/components/ui/card'

export function PeriodSelector({ dates }: { dates: Date[] }) {
  return (
    <Card className="flex gap-[2px] p-2">
      {dates.map((date, index) => (
        <div
          key={index}
          className="flex h-[500px] w-[150px] flex-col items-center justify-center rounded-sm border-[1px] border-primary/30 bg-primary/10"
        ></div>
      ))}
    </Card>
  )
}
