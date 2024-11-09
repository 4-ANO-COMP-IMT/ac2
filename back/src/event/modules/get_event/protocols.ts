import { EventJsonProps } from '../../../shared/domain/entities/event'

export type GetEventRequest = {
  eventId: string
}

export type GetEventResponse = {
  status: number
  message: string
  event?: EventJsonProps
}
