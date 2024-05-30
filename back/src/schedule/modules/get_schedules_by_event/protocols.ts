import { ScheduleJsonProps } from '../../../shared/domain/entities/schedule'

export type GetEventRequest = {
  id: string
}

export type GetEventResponse = {
  status: number
  message: string
  event?: ScheduleJsonProps
}
