import { describe, expect, it, test } from 'vitest'

import { EventRepositoryMock } from '../../../../../src/event/shared/infra/repos/event_repository_mock'
import { Event } from '../../../../../src/shared/domain/entities/event'
import { Availability } from '../../../../../src/shared/domain/entities/availability'

test('Test create event', () => {
  const repo = new EventRepositoryMock()
  const lengthBefore = EventRepositoryMock.events.length

  repo.createEvent(
    'Treino Popeye',
    [1719392400000],
    32400000,
    75600000,
    'Treino apenas de antebraço, para os braços ficarem fortes como os do Popeye'
  )

  const lengthAfter = EventRepositoryMock.events.length
  expect(lengthAfter).toBe(lengthBefore + 1)
  expect(EventRepositoryMock.events[lengthAfter - 1].name).toBe('Treino Popeye')
  expect(EventRepositoryMock.events[lengthAfter - 1].dates).toStrictEqual([
    1719392400000
  ])
  expect(EventRepositoryMock.events[lengthAfter - 1].notEarlier).toBe(32400000)
  expect(EventRepositoryMock.events[lengthAfter - 1].notLater).toBe(75600000)
  expect(EventRepositoryMock.events[lengthAfter - 1].description).toBe(
    'Treino apenas de antebraço, para os braços ficarem fortes como os do Popeye'
  )

  repo.resetMock()
})

describe('Test get event', () => {
  it('success', async () => {
    const repo = new EventRepositoryMock()
    const lengthBefore = EventRepositoryMock.events.length

    repo.createEvent(
      'Treino Popeye',
      [1719392400000],
      32400000,
      75600000,
      'Treino apenas de antebraço, para os braços ficarem fortes como os do Popeye'
    )

    const lengthAfter = EventRepositoryMock.events.length
    const event = await repo.getEvent(
      EventRepositoryMock.events[lengthAfter - 1].id
    )
    expect(event.toJson()).toStrictEqual(
      EventRepositoryMock.events[lengthAfter - 1].toJson()
    )

    repo.resetMock()
  })

  it('not found', () => {
    const repo = new EventRepositoryMock()

    expect(
      async () => await repo.getEvent(
        '123!'
      )
    ).rejects.toThrowError('Event not found for eventId: 123!')

    repo.resetMock()
  })
})

describe('Test update availability', () => {
  it('success', async () => {
    const repo = new EventRepositoryMock()
    const new_availabilities = [
      new Availability(
        '9276e4ba-3f72-4c47-ae7d-977ec3d6f3cd',
        1719403200000,
        1719405000000
      ),
      new Availability(
        '9276e4ba-3f72-4c47-ae7d-967ec3d6f3cd',
        1719405200000,
        1719407000000
      )
    ]
    repo.updateAvailabilities(
      EventRepositoryMock.events[2].id,
      EventRepositoryMock.events[2].members[0].id,
      new_availabilities
    )
    
    expect(new_availabilities.length).toStrictEqual(EventRepositoryMock.events[2].members[0].availabilities.length)
    repo.resetMock()
  })

  it('event not found', async () => {
    const repo = new EventRepositoryMock()
    const new_availabilities = [
      new Availability(
        '9276e4ba-3f72-4c47-ae7d-977ec3d6f3cd',
        1719403200000,
        1719405000000
      ),
      new Availability(
        '9276e4ba-3f72-4c47-ae7d-967ec3d6f3cd',
        1719405200000,
        1719407000000
      )
    ]
    
    expect(
      async () =>
        repo.updateAvailabilities(
          '123',
          EventRepositoryMock.events[2].members[0].id,
          new_availabilities
        )
      ).rejects.toThrowError('Event not found for eventId: 123')
      
      repo.resetMock()
  })

  it('member not found', async () => {
    const repo = new EventRepositoryMock()
    const new_availabilities = [
      new Availability(
        '9276e4ba-3f72-4c47-ae7d-977ec3d6f3cd',
        1719403200000,
        1719405000000
      ),
      new Availability(
        '9276e4ba-3f72-4c47-ae7d-967ec3d6f3cd',
        1719405200000,
        1719407000000
      )
    ]
    
    expect(
      async () =>
        repo.updateAvailabilities(
          EventRepositoryMock.events[2].id,
          '123',
          new_availabilities
        )
      ).rejects.toThrowError('Member not found for memberId: 123')
      
      repo.resetMock()
  })
})

describe('Test create member', () => {
  it('success', async () => {
    const repo = new EventRepositoryMock()
    const lengthBefore = EventRepositoryMock.events.length

    repo.createMember(
      EventRepositoryMock.events[0].id,
      '123',
      'Brownas'
    )

    const lengthMembersAfter = EventRepositoryMock.events[0].members.length
    expect(EventRepositoryMock.events[0].members[lengthMembersAfter-1].name).toBe('Brownas')
    repo.resetMock()
  })

  it('event not found', async () => {
    const repo = new EventRepositoryMock()

    expect(
      async () =>
        repo.createMember(
          '123',
          '123',
          'Brownas'
        )
      ).rejects.toThrowError('Event not found for eventId: 123')
      
      repo.resetMock()
  })

  it('member already exists', async () => {
    const repo = new EventRepositoryMock()

    repo.createMember(
      EventRepositoryMock.events[0].id,
      '123',
      'Brownas'
    )

    expect(
      async () =>
        repo.createMember(
          EventRepositoryMock.events[0].id,
          '123',
          'Brownas'
        )
      ).rejects.toThrowError('Member already exists with name: Brownas')
      
      repo.resetMock()
  })
})