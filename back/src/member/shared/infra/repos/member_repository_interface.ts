import { Member } from '../../../../shared/domain/entities/member'
import { Event } from '../../../../shared/domain/entities/event'


export interface MemberRepositoryInterface {
  createMember(
    eventId: string,
    name: string,
    password?: string | undefined
  ): Promise<Member>

  getEvent(
    eventId: string
  ): Promise<Event>

  getMemberByName(
    name: string,
    eventId: string
  ): Promise<Member | null>
}
