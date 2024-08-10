import { Availability } from '../../../../shared/domain/entities/availability'
import { Event } from '../../../../shared/domain/entities/event'
import { Member } from '../../../../shared/domain/entities/member'

export interface AvailabilityRepositoryInterface {
  updateAvailabilities(
    eventId: string,
    memberId: string,
    availabilities: Availability[]
  ): Promise<Availability[]>

  getEvent(
    eventId: string
  ): Promise<Event>

  getMember(
    eventId: string,
    memberId: string
  ): Promise<Member>

  createEvent(
    id: string,
    name: string,
    dates: number[],
    notEarlier: number,
    notLater: number,
    description?: string | undefined
  ): Promise<Event>

  createMember(
    eventId: string,
    name: string,
    password?: string | undefined
  ): Promise<Member>

}
