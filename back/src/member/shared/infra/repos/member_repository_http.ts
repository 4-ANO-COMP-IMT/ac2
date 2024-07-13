import { Member } from '../../../../shared/domain/entities/member'
import { MemberRepositoryInterface } from './member_repository_interface'

export class MemberRepositoryHttp implements MemberRepositoryInterface {
  async createMember(): Promise<Member> {
    throw new Error('Method not implemented.')
  }
}
