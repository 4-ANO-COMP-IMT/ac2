import { EventJsonProps } from '../../../shared/domain/entities/event'

export type PutEventRequest = {
  id: string
  name?: string
  start_date?: number
  end_date?: number
  time_interval?: number
}

export type PutEventResponse = {
  status: number
  message: string
  event?: EventJsonProps
}
