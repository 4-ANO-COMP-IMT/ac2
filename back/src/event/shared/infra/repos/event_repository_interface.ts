import { Event } from '../../../../shared/domain/entities/event'

export interface EventRepositoryInterface {
  getEvent(id: string): Promise<Event>
  putEvent(event: Event): Promise<Event>
  createEvent(event: {
    name: string
    startDate: number
    endDate: number
    timeInterval: number
  }): Promise<Event>
  deleteEvent(id: string): Promise<Event>
}
