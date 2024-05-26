import { EventJsonProps } from '../../../shared/domain/entities/event'

export type DeleteEventRequest = {
  id: string
}

export type DeleteEventResponse = {
  status: number
  message: string
  event?: EventJsonProps
}
