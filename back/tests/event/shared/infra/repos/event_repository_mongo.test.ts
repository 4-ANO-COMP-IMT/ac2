import { expect, it, test } from 'vitest'
import { EventRepositoryMongo } from '../../../../../src/event/shared/infra/repos/event_repository_mongo'
import { describe } from 'node:test'
import { Availability } from '../../../../../src/shared/domain/entities/availability'

test.skip('Test create event', async () => {
  const repo = new EventRepositoryMongo()

  const event = await repo.createEvent(
    'Treino Popeye',
    [1719392400000],
    32400000,
    75600000,
    'Treino apenas de antebraço, para os braços ficarem fortes como os do Popeye'
  )

  expect(event.name).toBe('Treino Popeye')
  expect(event.dates).toEqual([1719392400000])
  expect(event.notEarlier).toBe(32400000)
  expect(event.notLater).toBe(75600000)
})

test.skip('Test get event', async () => {
  const repo = new EventRepositoryMongo()

  const eventFound = await repo.getEvent('5fd56f9a-4b75-4bb3-8b1b-e3abeb923fb4')

  expect(eventFound.name).toBe('Treino Popeye')
  expect(eventFound.dates).toEqual([1719392400000])
  expect(eventFound.notEarlier).toBe(32400000)
  expect(eventFound.notLater).toBe(75600000)
})

test.skip('Test get event not found', async () => {
  const repo = new EventRepositoryMongo()

  try {
    await repo.getEvent('89545585-fece-40c3-a5c5-eb7523c08d16')
  } catch (error) {
    expect(error.message).toBe(
      'Event not found for eventId: 89545585-fece-40c3-a5c5-eb7523c08d16'
    )
  }
})

test.skip('Test create member', async () => {
  const repo = new EventRepositoryMongo()

  const event = await repo.createMember(
    '5fd56f9a-4b75-4bb3-8b1b-e3abeb923fb4',
    'a4f6b2b8-7f2a-4702-91f5-12d9c05d6b3d',
    'Adam Levine',
    'Brownas'
  )

  expect(event.members[0].name).toBe('Adam Levine')
  expect(event.members[0].password).toBe('Brownas')
})

describe.skip('Test update availability', () => {
  it('Update availabilities', async () => {
    const repo = new EventRepositoryMongo()

    const availabilitiesToUpdate: Availability[] = [
      new Availability(
        '9276e4ba-3f72-4c47-ae7d-987ec3d6f3cd',
        1719403200000,
        1719405000000
      )
    ]

    const availabilities = await repo.updateAvailabilities(
      '4e67f6c8-c5db-41ed-996c-6031bb8e0b07',
      'f6744f65-23a4-45dc-bf3a-9d2e5a541d37',
      availabilitiesToUpdate
    )

    expect(availabilities.length).toBe(1)
    expect(availabilities[0].startDate).toBe(1719403200000)
  })

  it('Event not found', async () => {
    const repo = new EventRepositoryMongo()

    try {
      await repo.updateAvailabilities(
        '4e67f6c8-c5db-41ed-996c-6031bb8e0b02',
        'bae0ce09-8e73-4bf9-b9f1-c3fcdf41b2bf',
        []
      )
    } catch (error) {
      expect(error.message).toBe(
        'Event not found for eventId: 4e67f6c8-c5db-41ed-996c-6031bb8e0b02'
      )
    }
  })

  it('Member not found', async () => {
    const repo = new EventRepositoryMongo()

    try {
      await repo.updateAvailabilities(
        '4e67f6c8-c5db-41ed-996c-6031bb8e0b07',
        'bae0ce09-8e73-4bf9-b9f1-c3fcdf41b2bf',
        []
      )
    } catch (error) {
      expect(error.message).toBe(
        'Member not found for memberId: bae0ce09-8e73-4bf9-b9f1-c3fcdf41b2bf'
      )
    }
  })
})
