import { v4 as uuid } from 'uuid'

import { Availability } from '../../../../shared/domain/entities/availability'
import { Event } from '../../../../shared/domain/entities/event'
import { Member } from '../../../../shared/domain/entities/member'
import { EventRepositoryInterface } from './event_repository_interface'

export class EventRepositoryMock implements EventRepositoryInterface {
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
          'a5d4e18f6383ef9f264d615498179fdded0814b99320193376ce7b75bebc556f'
        )
      ],
      'Descrição do evento'
    ),
    new Event(
      '883f5cf2-96dd-48e2-9ba9-24df8f01fb79', 
      'Evento para Soller', 
      [1725350400000], 
      32400000, 
      75600000, 
      [
        new Member(
          '883f5cf2-96dd-48e2-9ba9-24df8f01fb79',
          'soller',
          [
            new Availability(
              '0b2771a4-8021-463f-a385-b6c2c7289d41',
              1725350400000,
              1725366600000
            ),
            new Availability(
              'bd956287-9357-485a-8989-2776b1edbfa6',
              1725436800000,
              1725451200000
            ),
            new Availability(
              '0f1092b4-b73c-45c8-8aa7-9263164f1a37',
              1725523200000,
              1725537600000
            ),
            new Availability(
              'a3ae2360-d140-495f-bd34-1b4d0e4223f8',
              1725609600000,
              1725622200000
            )
          ],
          ''
        ),
        new Member(
          'ad820ed9-a3fb-4b1e-92b4-57c1b1d55070',
          'joaobranco',
          [
            new Availability(
              'a9aa7701-d3f2-4b17-928e-3a57eda1ff66',
              1725350400000,
              1725363000000
            ),
            new Availability(
              'b01a8e68-a6a7-4f4a-bdf6-3922881d22d7',
              1725436800000,
              1725447600000
            )
          ],
          ''
        ),
        new Member(
          '13f9e31c-b800-4583-b1df-e4ab8e35e90e',
          'saka',
          [
            new Availability(
              '104c04c8-9cff-4ad7-aad2-c6d434762a7a',
              1725350400000,
              1725352200000
            )
          ],
          ''
        )
      ],
      'Descrição do evento' // Descrição do evento (ajuste conforme necessário)
    )
  ]

  async createEvent(
    name: string,
    dates: number[],
    notEarlier: number,
    notLater: number,
    description?: string | undefined
  ): Promise<Event> {
    const createdEvent = new Event(
      uuid(),
      name,
      dates,
      notEarlier,
      notLater,
      [],
      description
    )

    EventRepositoryMock.events.push(createdEvent)
    return createdEvent
  }

  async getEvent(eventId: string): Promise<Event> {
    const event = EventRepositoryMock.events.find(
      (event) => event.id === eventId
    )
    if (!event) {
      throw new Error('Event not found for eventId: ' + eventId)
    }
    return event
  }

  async createMember(
    eventId: string,
    memberId: string,
    name: string,
    password?: string | undefined
  ): Promise<Member> {
    const event = EventRepositoryMock.events.find(
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

  async updateAvailabilities(
    eventId: string,
    memberId: string,
    availabilities: Availability[]
  ): Promise<Availability[]> {
    const event = EventRepositoryMock.events.find(
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

  resetMock() {
    EventRepositoryMock.events = [
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
            'a5d4e18f6383ef9f264d615498179fdded0814b99320193376ce7b75bebc556f'
          )
        ],
        'Descrição do evento'
      )
    ]
  }
}
