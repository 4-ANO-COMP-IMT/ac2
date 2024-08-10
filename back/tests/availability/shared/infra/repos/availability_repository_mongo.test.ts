import { describe, expect, it, test } from 'vitest'

import { AvailabilityRepositoryMongo } from '../../../../../src/availability/shared/infra/repos/availability_repository_mongo'
import { Availability } from '../../../../../src/shared/domain/entities/availability'

describe.skip('Test create event', () => {
  it('create event', async () => {
    const repo = new AvailabilityRepositoryMongo()

    const event = {
      id: '5fd56f9a-4b75-4bb3-8b1b-e3abeb923fb4',
      name: 'Treino Popeye',
      dates: [1719392400000],
      notEarlier: 32400000,
      notLater: 75600000,
      description: 'Treino do Popeye'
    }

    const eventCreated = await repo.createEvent(
      event.id,
      event.name,
      event.dates,
      event.notEarlier,
      event.notLater,
      event.description
    )

    expect(eventCreated.name).toBe('Treino Popeye')
    expect(eventCreated.dates).toEqual([1719392400000])
    expect(eventCreated.notEarlier).toBe(32400000)
    expect(eventCreated.notLater).toBe(75600000)
  })
})

describe.skip('Test get event', async () => {
  it('get event', async () => {
    const repo = new AvailabilityRepositoryMongo()

    const eventFound = await repo.getEvent(
      '5fd56f9a-4b75-4bb3-8b1b-e3abeb923fb4'
    )

    expect(eventFound.name).toBe('Treino Popeye')
    expect(eventFound.dates).toEqual([1719392400000])
    expect(eventFound.notEarlier).toBe(32400000)
    expect(eventFound.notLater).toBe(75600000)
  })
})

describe.skip('Test create member', async () => {
  it('create member', async () => {
    const repo = new AvailabilityRepositoryMongo()

    const member = {
      eventId: '5fd56f9a-4b75-4bb3-8b1b-e3abeb923fb4',
      id: '5fd56f9a-4b75-4bb3-8b1b-e3abeb923fb5',
      name: 'Popeye',
      password: 'popeye123'
    }

    const memberCreated = await repo.createMember(
      member.eventId,
      member.id,
      member.name,
      member.password
    )

    expect(memberCreated.name).toBe('Popeye')
    expect(memberCreated.password).toBe('popeye123')
  })

  it('event not found', async () => {
    const repo = new AvailabilityRepositoryMongo()

    expect(
      async () =>
        await repo.createMember(
          '5fd56f9a-4b75-4bb3-8b1b-e3abeb923fb5',
          '5fd56f9a-4b75-4bb3-8b1b-e3abeb923fb4',
          'Popeye',
          'popeye123'
        )
    ).rejects.toThrowError(
      'Event not found for eventId: 5fd56f9a-4b75-4bb3-8b1b-e3abeb923fb5'
    )
  })
})

describe.skip('Test get member', async () => {
  it('get member', async () => {
    const repo = new AvailabilityRepositoryMongo()

    const memberFound = await repo.getMember(
      '5fd56f9a-4b75-4bb3-8b1b-e3abeb923fb4',
      '5fd56f9a-4b75-4bb3-8b1b-e3abeb923fb5'
    )

    expect(memberFound.name).toBe('Popeye')
    expect(memberFound.password).toBe('popeye123')
  })

  it('event not found', async () => {
    const repo = new AvailabilityRepositoryMongo()

    expect(
      async () =>
        await repo.getMember(
          '5fd56f9a-4b75-4bb3-8b1b-e3abeb923fb5',
          '5fd56f9a-4b75-4bb3-8b1b-e3abeb923fb4'
        )
    ).rejects.toThrowError(
      'Event not found for eventId: 5fd56f9a-4b75-4bb3-8b1b-e3abeb923fb5'
    )
  })

  it('member not found', async () => {
    const repo = new AvailabilityRepositoryMongo()

    expect(
      async () =>
        await repo.getMember(
          '5fd56f9a-4b75-4bb3-8b1b-e3abeb923fb4',
          '5fd56f9a-4b75-4bb3-8b1b-e3abeb923fb6'
        )
    ).rejects.toThrowError(
      'Member not found for memberId: 5fd56f9a-4b75-4bb3-8b1b-e3abeb923fb6'
    )
  })
})

describe.skip('TestUpdate availabilities', () => {
  it('Update availabilities', async () => {
    const repo = new AvailabilityRepositoryMongo()

    const availabilitiesToUpdate: Availability[] = [
      new Availability(
        '5fd56f9a-4b75-4bb3-8b1b-e3abeb923fb4',
        1719403200000,
        1719405000000
      )
    ]

    const availabilities = await repo.updateAvailabilities(
      '5fd56f9a-4b75-4bb3-8b1b-e3abeb923fb4',
      '5fd56f9a-4b75-4bb3-8b1b-e3abeb923fb5',
      availabilitiesToUpdate
    )

    expect(availabilities.length).toBe(1)
    expect(availabilities[0].startDate).toBe(1719403200000)
  })

  it('Event not found', async () => {
    const repo = new AvailabilityRepositoryMongo()

    try {
      await repo.updateAvailabilities(
        '4e67f6c8-c5db-41ed-996c-6031bb8e0b02',
        '5fd56f9a-4b75-4bb3-8b1b-e3abeb923fb5',
        []
      )
    } catch (error) {
      expect(error.message).toBe(
        'Event not found for eventId: 4e67f6c8-c5db-41ed-996c-6031bb8e0b02'
      )
    }
  })

  it('Member not found', async () => {
    const repo = new AvailabilityRepositoryMongo()

    try {
      await repo.updateAvailabilities(
        '5fd56f9a-4b75-4bb3-8b1b-e3abeb923fb4',
        '5fd56f9a-4b75-4bb3-8b1b-e3abeb923fb7',
        []
      )
    } catch (error) {
      expect(error.message).toBe(
        'Member not found for memberId: 5fd56f9a-4b75-4bb3-8b1b-e3abeb923fb7'
      )
    }
  })
})
