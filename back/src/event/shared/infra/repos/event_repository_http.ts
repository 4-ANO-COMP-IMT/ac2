import { Event } from '../../../../shared/domain/entities/event'
import { NotFoundError } from '../../../../shared/domain/helpers/errors/not_found'
import { EventRepositoryInterface } from './event_repository_interface'

export class EventRepositoryHttp implements EventRepositoryInterface {
  async createEvent(): Promise<Event> {
    throw new Error('Method not implemented.')
  }
}
