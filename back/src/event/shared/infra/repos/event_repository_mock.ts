import { EventRepositoryInterface } from './event_repository_interface'
import { Event } from '../../../../shared/domain/entities/event'
import { NotFoundError } from '../../../../shared/domain/helpers/errors/not_found'

export class EventRepositoryMock implements EventRepositoryInterface {
  static events: Event[] = [
    new Event(
      '1',
      'Meeting for the project',
      1632950400000,
      1632954000000,
      600000
    ),
    new Event('2', 'Academy Chest Day', 1632950200000, 1632954000000, 300000),
    new Event(
      '3',
      'Studying Software Engineering',
      1632950000000,
      1632954000000,
      100000
    )
  ]

  async getEvent(id: string): Promise<Event> {
    const event = EventRepositoryMock.events.find((event) => event.id === id)

    if (!event) {
      throw new NotFoundError('event')
    }

    return event
  }

  async putEvent(event: Event) {
    const eventIndex = EventRepositoryMock.events.findIndex(
      (e) => e.id === event.id
    )

    if (eventIndex === -1) {
      throw new NotFoundError('event')
    }

    EventRepositoryMock.events[eventIndex] = event

    return EventRepositoryMock.events[eventIndex]
  }

  async createEvent(event: Event) {
    EventRepositoryMock.events.push(event)
    return event
  }

  async deleteEvent(id: string) {
    const event = EventRepositoryMock.events.find((event) => event.id === id)
    if (event) {
      EventRepositoryMock.events = EventRepositoryMock.events.filter(
        (event) => event.id !== id
      )
      return event
    }
    throw new NotFoundError('event')
  }
}
