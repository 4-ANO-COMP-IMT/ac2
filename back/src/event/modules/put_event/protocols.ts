import { EventJsonProps } from '../../../shared/domain/entities/event'

export type PutEventRequest = {
  id: string
  name?: string
  startDate?: number
  endDate?: number
  timeInterval?: number
}

export type PutEventResponse = {
  status: number
  message: string
  event?: EventJsonProps
}
