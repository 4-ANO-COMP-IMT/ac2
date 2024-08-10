import { Availability } from '../../../../shared/domain/entities/availability'
import { Event } from '../../../../shared/domain/entities/event'
import { Member } from '../../../../shared/domain/entities/member'

export interface EventRepositoryInterface {
  createEvent(
    name: string,
    dates: number[],
    notEarlier: number,
    notLater: number,
    description?: string | undefined
  ): Promise<Event>

  getEvent(eventId: string): Promise<Event>

  createMember(
    eventId: string,
    memberId: string,
    name: string,
    password?: string | undefined
  ): Promise<Member>

  updateAvailabilities(
    eventId: string,
    memberId: string,
    availabilities: Availability[]
  ): Promise<Availability[]>
}
