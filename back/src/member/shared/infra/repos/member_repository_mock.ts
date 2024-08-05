import { v4 as uuid } from 'uuid'

import { Availability } from '../../../../shared/domain/entities/availability'
import { Event } from '../../../../shared/domain/entities/event'
import { Member } from '../../../../shared/domain/entities/member'
import { MemberRepositoryInterface } from './member_repository_interface'

export class MemberRepositoryMock implements MemberRepositoryInterface {
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
      [
        new Member(
          '66b2a2dc-7c7b-4f21-a7d5-4b798207a022',
          'Adam Levine',
          [],
          'Brownas'
        )
      ],
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

  async createMember(
    eventId: string,
    name: string,
    password?: string
  ): Promise<Member> {
    const createdMember = new Member(uuid(), name, [], password)
    const createEvent = MemberRepositoryMock.events.find(
      (event) => event.id === eventId
    )
    if (!createEvent) {
      throw new Error('Event not found for eventId: ' + eventId)
    }
    const duplicatedMember = createEvent.members.find(
      (member) => member.name === name
    )
    if (duplicatedMember) {
      throw new Error(
        'Member already exists with name: ' + duplicatedMember.name
      )
    }
    createEvent.members.push(createdMember)
    return createdMember
  }

  async getEvent(eventId: string): Promise<Event> {
    const event = MemberRepositoryMock.events.find(
      (event) => event.id === eventId
    )
    if (!event) {
      throw new Error('Event not found for eventId: ' + eventId)
    }
    return event
  }

  async getMemberByName(name: string, eventId: string): Promise<Member | null> {
    const event = MemberRepositoryMock.events.find(
      (event) => event.id === eventId
    )
    if (!event) {
      throw new Error('Event not found for eventId: ' + eventId)
    }
    const member = event.members.find((member) => member.name === name)
    if (!member) {
      return null
    }
    return member
  }

  resetMock() {
    MemberRepositoryMock.events = [
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
        [
          new Member(
            '66b2a2dc-7c7b-4f21-a7d5-4b798207a022',
            'Adam Levine',
            [],
            'Brownas'
          )
        ],
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
