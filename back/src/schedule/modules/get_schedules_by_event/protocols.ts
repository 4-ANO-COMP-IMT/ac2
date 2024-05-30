import { ScheduleJsonProps } from '../../../shared/domain/entities/schedule'

export type GetSchedulesByEventRequest = {
  eventId: string
}

export type GetSchedulesByEventResponse = {
  status: number
  message: string
  schedules?: ScheduleJsonProps
}
