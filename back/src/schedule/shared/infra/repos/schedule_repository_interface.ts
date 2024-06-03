import { Schedule } from '../../../../shared/domain/entities/schedule'

export interface ScheduleRepositoryInterface {
  getSchedulesByEventId(eventId: string): Promise<Schedule[]>
  createSchedule(schedule: {
    id: string
    eventId: string
    time: number
    name: string
  }): Promise<Schedule>
  deleteSchedule(scheduleId: string): Promise<Schedule>
  // Batch operations?
}
