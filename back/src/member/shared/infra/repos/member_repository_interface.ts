import { Member } from '../../../../shared/domain/entities/member'

export interface MemberRepositoryInterface {
  createMember(
    eventId: string,
    name: string,
    password?: string | undefined
  ): Promise<Member>
}
