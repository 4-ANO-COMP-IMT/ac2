import { EventJsonProps } from '../../shared/domain/entities/event'

export type GetEventRequest = {
  params: {
    id: string
  }
}

export type GetEventResponse = {
  status: number
  message: string
  event?: EventJsonProps
}
