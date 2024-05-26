import { Event } from '../../../../shared/domain/entities/event'

export interface EventRepositoryInterface {
  getEvent(id: string): Promise<Event>
  putEvent(
    id: string,
    event: {
      name?: string
      start_date?: number
      end_date?: number
      time_interval?: number
    }
  ): Promise<Event>
  createEvent(event: Event): Promise<Event>
  deleteEvent(id: string): Promise<Event>
}
