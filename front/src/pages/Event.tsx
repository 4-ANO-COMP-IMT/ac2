import { PeriodSelector } from '@/components/period-selector'
// import { useParams } from 'react-router-dom'

export function Event() {
  // const { id } = useParams()
  const mockDates: Date[] = [
    '2024-07-12T03:00:00.000Z',
    '2024-07-11T03:00:00.000Z',
    '2024-07-10T03:00:00.000Z',
    '2024-07-09T03:00:00.000Z',
    '2024-07-13T03:00:00.000Z',
    '2024-07-14T03:00:00.000Z',
    '2024-07-15T03:00:00.000Z'
  ].map((date) => new Date(date))

  return (
    <main className="flex h-screen w-full flex-col items-center justify-center">
      <PeriodSelector
        dates={mockDates}
        notEarlierThan={8}
        notLaterThan={18}
        timezone={-3}
      />
    </main>
  )
}
