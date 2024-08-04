import { Member } from '../../../../shared/domain/entities/member'
import { MemberRepositoryInterface } from './member_repository_interface'
import { Event } from '../../../../shared/domain/entities/event'


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
}
