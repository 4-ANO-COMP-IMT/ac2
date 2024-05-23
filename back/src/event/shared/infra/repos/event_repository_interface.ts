import { Event } from '../../../../shared/domain/entities/event'

export interface EventRepositoryInterface {
  getEvent(id: string): Promise<Event>
  putEvent(event: Event): Promise<Event>
  createEvent(event: Event): Promise<Event>
  deleteEvent(id: string): Promise<Event>
}
