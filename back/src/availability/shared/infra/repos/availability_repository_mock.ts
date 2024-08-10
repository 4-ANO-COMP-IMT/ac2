import { v4 as uuid } from 'uuid'

import { Availability } from '../../../../shared/domain/entities/availability'
import { Event } from '../../../../shared/domain/entities/event'
import { Member } from '../../../../shared/domain/entities/member'
import { AvailabilityRepositoryInterface } from './availability_repository_interface'

export class AvailabilityRepositoryMock
  implements AvailabilityRepositoryInterface
{
  static events: Event[] = [
    new Event(
      '550e8400-e29b-41d4-a716-446655440000',
      'Criar nova música para o Maroon 5',
      [1719781200000],
      32400000,
      75600000,
      []
    ),
    new Event(
      '123e4567-e89b-12d3-a456-426614174000',
      'Criar nova música para o Maroon 5',
      [1719392400000],
      32400000,
      75600000,
      [new Member('66b2a2dc-7c7b-4f21-a7d5-4b798207a022', 'Adam Levine', [])],
      'Descrição do evento'
    ),
    new Event(
      '9b2f4e8c-8d59-11eb-8dcd-0242ac130003',
      'Criar nova música para o Maroon 5',
      [1719392400000],
      32400000,
      75600000,
      [
        new Member(
          'a4f6b2b8-7f2a-4702-91f5-12d9c05d6b3d',
          'Adam Levine',
          [
            new Availability(
              '9276e4ba-3f72-4c47-ae7d-987ec3d6f3cd',
              1719403200000,
              1719405000000
            )
          ],
          'Brownas'
        )
      ],
      'Descrição do evento'
    )
  ]

  async updateAvailabilities(
    eventId: string,
    memberId: string,
    availabilities: Availability[]
  ): Promise<Availability[]> {
    const event = AvailabilityRepositoryMock.events.find(
      (event) => event.id === eventId
    )
    if (!event) {
      throw new Error('Event not found for eventId: ' + eventId)
    }
    const member = event.members.find((member) => member.id === memberId)
    if (!member) {
      throw new Error('Member not found for memberId: ' + memberId)
    }
    member.availabilities = availabilities
    return availabilities
  }

  async getEvent(eventId: string): Promise<Event> {
    const event = AvailabilityRepositoryMock.events.find(
      (event) => event.id === eventId
    )
    if (!event) {
      throw new Error('Event not found for eventId: ' + eventId)
    }
    return event
  }

  async getMember(eventId: string, memberId: string): Promise<Member> {
    const event = AvailabilityRepositoryMock.events.find(
      (event) => event.id === eventId
    )
    if (!event) {
      throw new Error('Event not found for eventId: ' + eventId)
    }
    const member = event.members.find((member) => member.id === memberId)
    if (!member) {
      throw new Error('Member not found for memberId: ' + memberId)
    }
    return member
  }

  async createEvent(
    id: string,
    name: string,
    dates: number[],
    notEarlier: number,
    notLater: number,
    description?: string | undefined
  ): Promise<Event> {
    const createdEvent = new Event(
      id,
      name,
      dates,
      notEarlier,
      notLater,
      [],
      description
    )

    AvailabilityRepositoryMock.events.push(createdEvent)
    return createdEvent
  }

  async createMember(
    eventId: string,
    memberId: string,
    name: string,
    password?: string | undefined
  ): Promise<Member> {
    const event = AvailabilityRepositoryMock.events.find(
      (event) => event.id === eventId
    )
    if (!event) {
      throw new Error('Event not found for eventId: ' + eventId)
    }

    const member = new Member(memberId, name, [], password)

    const duplicateMember = event.members.find((member) => member.name === name)
    if (duplicateMember) {
      throw new Error('Member already exists with name: ' + name)
    }

    event.members.push(member)
    return member
  }

  resetMock() {
    AvailabilityRepositoryMock.events = [
      new Event(
        '550e8400-e29b-41d4-a716-446655440000',
        'Criar nova música para o Maroon 5',
        [1719781200000],
        32400000,
        75600000,
        []
      ),
      new Event(
        '123e4567-e89b-12d3-a456-426614174000',
        'Criar nova música para o Maroon 5',
        [1719392400000],
        32400000,
        75600000,
        [new Member('66b2a2dc-7c7b-4f21-a7d5-4b798207a022', 'Adam Levine', [])],
        'Descrição do evento'
      ),
      new Event(
        '9b2f4e8c-8d59-11eb-8dcd-0242ac130003',
        'Criar nova música para o Maroon 5',
        [1719392400000],
        32400000,
        75600000,
        [
          new Member(
            'a4f6b2b8-7f2a-4702-91f5-12d9c05d6b3d',
            'Adam Levine',
            [
              new Availability(
                '9276e4ba-3f72-4c47-ae7d-987ec3d6f3cd',
                1719403200000,
                1719405000000
              )
            ],
            'Brownas'
          )
        ],
        'Descrição do evento'
      )
    ]
  }
}
