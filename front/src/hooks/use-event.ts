import { FormEventValues } from '@/components/event-card'
import { EventContext } from '@/contexts/event-context'
import { api } from '@/utils/http/api'
import { CreateEventResponse, Event } from '@/utils/types/event'
import { useContext } from 'react'

export const useEvent = () => {
  const context = useContext(EventContext)

  if (!context) {
    throw new Error('useEvent must be used within an EventProvider')
  }

  const { isLogged, setIsLogged, paintedDivs, setPaintedDivs } = context

  const createEvent = async (
    event: FormEventValues
  ): Promise<CreateEventResponse> => {
    const eventFormated: Event = {
      name: event.eventName,
      description: event.description,
      dates: event.dates.map((date) => new Date(date).getTime()),
      notEarlier: parseInt(event.notEarlierThan) * 60 * 60 * 1000,
      notLater: parseInt(event.notLaterThan) * 60 * 60 * 1000
      // timezone: parseInt(event.timezone) * 60 * 60 * 1000
    }

    const response = await api.post(
      'http://localhost:3000/event', // TODO: change to env
      eventFormated
    )

    return response.data
  }

  return {
    createEvent,
    isLogged,
    setIsLogged,
    paintedDivs,
    setPaintedDivs
  }
}
