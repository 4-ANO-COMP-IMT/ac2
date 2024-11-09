import { describe, expect, it, test } from 'vitest'

import { AvailabilityRepositoryMock } from '../../../../../src/availability/shared/infra/repos/availability_repository_mock'
import { Availability } from '../../../../../src/shared/domain/entities/availability'

describe('Test update availability', () => {
  it('success', async () => {
    const repo = new AvailabilityRepositoryMock()
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
      AvailabilityRepositoryMock.events[2].id,
      AvailabilityRepositoryMock.events[2].members[0].id,
      new_availabilities
    )
    
    expect(new_availabilities.length).toStrictEqual(AvailabilityRepositoryMock.events[2].members[0].availabilities.length)
    repo.resetMock()
  })

  it('event not found', async () => {
    const repo = new AvailabilityRepositoryMock()
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
          AvailabilityRepositoryMock.events[2].members[0].id,
          new_availabilities
        )
      ).rejects.toThrowError('Event not found for eventId: 123')
      
      repo.resetMock()
  })

  it('member not found', async () => {
    const repo = new AvailabilityRepositoryMock()
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
          AvailabilityRepositoryMock.events[2].id,
          '123',
          new_availabilities
        )
      ).rejects.toThrowError('Member not found for memberId: 123')
      
      repo.resetMock()
  })
})

describe('Test get event', () => {
  it('success', async () => {
    const repo = new AvailabilityRepositoryMock()
    const event = await repo.getEvent(
      AvailabilityRepositoryMock.events[0].id
    )
    expect(event.toJson()).toStrictEqual(
      AvailabilityRepositoryMock.events[0].toJson()
    )

    repo.resetMock()
  })

  it('not found', () => {
    const repo = new AvailabilityRepositoryMock()

    expect(
      async () => await repo.getEvent(
        '123!'
      )
    ).rejects.toThrowError('Event not found for eventId: 123!')

    repo.resetMock()
  })
})

describe('Test get member', () => {
  it('success', async () => {
    const repo = new AvailabilityRepositoryMock()
    const member = await repo.getMember(
      AvailabilityRepositoryMock.events[2].id,
      AvailabilityRepositoryMock.events[2].members[0].id
    )
    expect(member.toJson()).toStrictEqual(
      AvailabilityRepositoryMock.events[2].members[0].toJson()
    )

    repo.resetMock()
  })

  it('not found', () => {
    const repo = new AvailabilityRepositoryMock()

    expect(
      async () => await repo.getMember(
        AvailabilityRepositoryMock.events[0].id,
        '123!'
      )
    ).rejects.toThrowError('Member not found for memberId: 123!')

    repo.resetMock()
  })
})

describe('Test create member', () => {
  it('success', async () => {
    const repo = new AvailabilityRepositoryMock()
    const lengthBefore = AvailabilityRepositoryMock.events.length

    repo.createMember(
      AvailabilityRepositoryMock.events[0].id,
      '123',
      'Brownas'
    )

    const lengthMembersAfter = AvailabilityRepositoryMock.events[0].members.length
    expect(AvailabilityRepositoryMock.events[0].members[lengthMembersAfter-1].name).toBe('Brownas')
    repo.resetMock()
  })

  it('event not found', async () => {
    const repo = new AvailabilityRepositoryMock()

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
    const repo = new AvailabilityRepositoryMock()

    repo.createMember(
      AvailabilityRepositoryMock.events[0].id,
      '123',
      'Brownas'
    )

    expect(
      async () =>
        repo.createMember(
          AvailabilityRepositoryMock.events[0].id,
          '123',
          'Brownas'
        )
      ).rejects.toThrowError('Member already exists with name: Brownas')
      
      repo.resetMock()
  })
})

test('Test createEvent', () => {
  const repo = new AvailabilityRepositoryMock()
  const lengthBefore = AvailabilityRepositoryMock.events.length

  repo.createEvent(
    'adhuhuadhuasd',
    'Show do M5',
    [1719392400000],
    32400000,
    75600000,
    'description'
  )

  const lengthAfter = AvailabilityRepositoryMock.events.length

  expect(lengthAfter).toBe(lengthBefore + 1)
  expect(AvailabilityRepositoryMock.events[lengthAfter - 1].name).toBe('Show do M5')
  expect(AvailabilityRepositoryMock.events[lengthAfter - 1].dates).toStrictEqual([
    1719392400000
  ])
  expect(AvailabilityRepositoryMock.events[lengthAfter - 1].notEarlier).toBe(32400000)
  expect(AvailabilityRepositoryMock.events[lengthAfter - 1].notLater).toBe(75600000)
  expect(AvailabilityRepositoryMock.events[lengthAfter - 1].description).toBe(
    'description'
  )

  repo.resetMock()
})