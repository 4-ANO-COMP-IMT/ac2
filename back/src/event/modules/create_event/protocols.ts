import { EventJsonProps } from '../../../shared/domain/entities/event'

export type CreateEventRequest = {
  name: string
  dates: number[]
  startDate: number
  endDate: number
  timeInterval: number
}

export type CreateEventResponse = {
  status: number
  message: string
  event?: EventJsonProps
}