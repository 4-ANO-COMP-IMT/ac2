import { ScheduleJsonProps } from '../../../shared/domain/entities/schedule'

export type PostScheduleRequest = {
  eventId: string
  time: number
  name: string
}

export type PostScheduleResponse = {
  status: number
  message: string
  schedule?: ScheduleJsonProps
}
