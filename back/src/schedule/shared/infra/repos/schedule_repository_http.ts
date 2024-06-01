import { Schedule } from '../../../../shared/domain/entities/schedule'
import { ScheduleRepositoryInterface } from './schedule_repository_interface'

export class ScheduleRepositoryHttp implements ScheduleRepositoryInterface {
  getSchedulesByEventId(eventId: string): Promise<Schedule[]> {
    throw new Error('Method not implemented.')
  }
  createSchedule(schedule: {
    eventId: string
    time: number
    name: string
  }): Promise<Schedule> {
    throw new Error('Method not implemented.')
  }
  deleteSchedule(scheduleId: string): Promise<Schedule> {
    throw new Error('Method not implemented.')
  }
}
