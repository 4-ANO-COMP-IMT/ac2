import { FormEventValues } from '@/components/event-card'
import { api } from '@/utils/http/api'
import { CreateEventResponse, Event } from '@/utils/types/event'

export const useEvent = () => {
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
      'event/', // TODO: change to env
      eventFormated
    )

    return response.data
  }

  return {
    createEvent
  }
}
