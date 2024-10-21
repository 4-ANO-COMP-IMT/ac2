import { EventJsonProps } from '../../../shared/domain/entities/event'

export type CreateEventRequest = {
  name: string
  dates: number[]
  notEarlier: number
  notLater: number
  description?: string | undefined
}

export type CreateEventResponse = {
  status: number
  message: string
  event?: EventJsonProps
}
