import { Availability } from '../../../../shared/domain/entities/availability'
import { AvailabilityRepositoryInterface } from './availability_repository_interface'
import { Event } from '../../../../shared/domain/entities/event'
import { Member } from '../../../../shared/domain/entities/member'

export class AvailabilityRepositoryHttp implements AvailabilityRepositoryInterface {
  async updateAvailabilities(): Promise<Availability[]> {
    throw new Error('Method not implemented.')
  }

  async getEvent(): Promise<Event> {
    throw new Error('Method not implemented.')
  }

  async getMember(): Promise<Member> {
    throw new Error('Method not implemented.')
  }

  async createEvent(): Promise<Event> {
    throw new Error('Method not implemented.')
  }

  async createMember(): Promise<Member> {
    throw new Error('Method not implemented.')
  }
}


