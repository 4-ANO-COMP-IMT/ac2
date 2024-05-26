import { Event } from '../../../../shared/domain/entities/event'

export interface EventRepositoryInterface {
  getEvent(id: string): Promise<Event>
  putEvent(
    id: string,
    event: {
      name?: string
      startDate?: number
      endDate?: number
      timeInterval?: number
    }
  ): Promise<Event>
  createEvent(event: Event): Promise<Event>
  deleteEvent(id: string): Promise<Event>
}
