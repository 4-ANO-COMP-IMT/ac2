import { Event } from '../../../../shared/domain/entities/event'

export interface EventRepositoryInterface {
  createEvent(
    name: string,
    dates: number[],
    notEarlier: number,
    notLater: number,
    description?: string | undefined
  ): Promise<Event>

  getEvent(eventId: string): Promise<Event>
}
