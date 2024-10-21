import { EventContext } from '@/contexts/event-context'
import { api } from '@/utils/http/api'
import { Event } from '@/types/event'
import { Response } from '@/types/response'
import { useContext } from 'react'
import { v4 as uuid } from 'uuid'
import { FormEventValues } from '@/types/schemas/event-form-schema'

export const useEvent = () => {
  const context = useContext(EventContext)

  if (!context) {
    throw new Error('useEvent must be used within an EventProvider')
  }

  const {
    isLogged,
    setIsLogged,
    paintedDivs,
    setPaintedDivs,
    next,
    setNext,
    countDivs,
    setCountDivs
  } = context

  const createEvent = async (
    data: FormEventValues
  ): Promise<Response<Event>> => {
    const event: Event = {
      id: uuid(),
      name: data.eventName,
      description: data.description,
      dates: data.dates.map((date) => new Date(date).getTime()),
      notEarlier: parseInt(data.notEarlier) * 60 * 60 * 1000,
      notLater: parseInt(data.notLater) * 60 * 60 * 1000,
      members: []
      // timezone: parseInt(event.timezone) * 60 * 60 * 1000
    }

    const response = await api.post('/event/', event)

    return response.data
  }

  const getEvent = async (id: string): Promise<Response<Event>> => {
    const response = await api.get(`/event/?eventId=${id}`)

    return response.data
  }

  return {
    createEvent,
    getEvent,
    isLogged,
    setIsLogged,
    paintedDivs,
    setPaintedDivs,
    next,
    setNext,
    countDivs,
    setCountDivs
  }
}
