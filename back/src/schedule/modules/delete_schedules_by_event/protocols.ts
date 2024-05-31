import { ScheduleJsonProps } from '../../../shared/domain/entities/schedule'

export type DeleteScheduleRequest = {
  id: string
}

export type DeleteScheduleResponse = {
  status: number
  message: string
  schedule?: ScheduleJsonProps
}
