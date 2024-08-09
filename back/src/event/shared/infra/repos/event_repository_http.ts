import { Availability } from '../../../../shared/domain/entities/availability'
import { Event } from '../../../../shared/domain/entities/event'
import { NotFoundError } from '../../../../shared/domain/helpers/errors/not_found'
import { EventRepositoryInterface } from './event_repository_interface'

export class EventRepositoryHttp implements EventRepositoryInterface {
  async createEvent(): Promise<Event> {
    throw new Error('Method not implemented.')
  }

  async getEvent(): Promise<Event> {
    throw new NotFoundError('Event not found')
  }

  async createMember(): Promise<Event> {
    throw new Error('Method not implemented.')
  }

  async updateAvailabilities(): Promise<Availability[]> {
    throw new Error('Method not implemented.')
  }
}
