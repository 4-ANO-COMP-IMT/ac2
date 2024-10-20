import { Availability } from '../../../../shared/domain/entities/availability'
import { Event } from '../../../../shared/domain/entities/event'
import { Member } from '../../../../shared/domain/entities/member'
import { MemberRepositoryInterface } from './member_repository_interface'

export class MemberRepositoryHttp implements MemberRepositoryInterface {
  async createMember(): Promise<Member> {
    throw new Error('Method not implemented.')
  }
  async getEvent(): Promise<Event> {
    throw new Error('Method not implemented.')
  }

  async getMemberByName(): Promise<Member | null> {
    throw new Error('Method not implemented.')
  }

  async createEvent(): Promise<Event> {
    throw new Error('Method not implemented.')
  }

  async getMember(): Promise<Member> {
    throw new Error('Method not implemented.')
  }

  async updateAvailabilities(): Promise<Availability[]> {
    throw new Error('Method not implemented.')
  }
}
