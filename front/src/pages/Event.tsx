import { PeriodSelector } from '@/components/period-selector'
import { useParams } from 'react-router-dom'

export function Event() {
  const { id } = useParams()
  console.log(id)
  const mockDates: Date[] = [
    '2024-07-12T03:00:00.000Z',
    '2024-07-11T03:00:00.000Z',
    '2024-07-10T03:00:00.000Z',
    '2024-07-09T03:00:00.000Z',
    '2024-07-13T03:00:00.000Z',
    '2024-07-14T03:00:00.000Z',
    '2024-07-15T03:00:00.000Z'
  ].map((date) => new Date(date))

  console.log(mockDates[0].toISOString())

  return (
    <main className="flex h-screen w-full flex-col items-center justify-center">
      <PeriodSelector dates={mockDates} />
    </main>
  )
}
