import { Event } from '../../../../shared/domain/entities/event'
import { NotFoundError } from '../../../../shared/domain/helpers/errors/not_found'
import { EventRepositoryInterface } from './event_repository_interface'

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

  async putEvent(
    id: string,
    event: {
      name?: string
      startDate?: number
      endDate?: number
      timeInterval?: number
    }
  ) {
    const eventIndex = EventRepositoryMock.events.findIndex((e) => e.id === id)

    if (eventIndex === -1) {
      throw new NotFoundError('event')
    }

    if (event.name) {
      EventRepositoryMock.events[eventIndex].name = event.name
    }
    if (event.startDate) {
      EventRepositoryMock.events[eventIndex].startDate = event.startDate
    }
    if (event.endDate) {
      EventRepositoryMock.events[eventIndex].endDate = event.endDate
    }
    if (event.timeInterval) {
      EventRepositoryMock.events[eventIndex].timeInterval = event.timeInterval
    }

    return EventRepositoryMock.events[eventIndex]
  }

  async createEvent(event: {
    name: string
    startDate: number
    endDate: number
    timeInterval: number
  }): Promise<Event> {
    const createdEvent = new Event(
      this.getLastId(),
      event.name,
      event.startDate,
      event.endDate,
      event.timeInterval
    )

    EventRepositoryMock.events.push(createdEvent)
    return createdEvent
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

  resetMock() {
    EventRepositoryMock.events = [
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
  }

  getLastId() {
    return (
      +EventRepositoryMock.events[EventRepositoryMock.events.length - 1].id + 1
    ).toString()
  }
}
