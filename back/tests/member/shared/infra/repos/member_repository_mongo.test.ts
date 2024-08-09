import { describe, expect, it, test } from 'vitest'

import { MemberRepositoryMongo } from '../../../../../src/member/shared/infra/repos/member_repository_mongo'

describe.skip('TestCreate event', () => {
  it('Create event', async () => {
    const repo = new MemberRepositoryMongo()

    const event = await repo.createEvent(
      '9b2f4e8c-8d59-11eb-8dcd-0242ac130003',
      'Event 1',
      [1616434800000, 1616521200000],
      32400000,
      75600000,
      'Description'
    )

    expect(event.id).toBe('9b2f4e8c-8d59-11eb-8dcd-0242ac130003')
    expect(event.name).toBe('Event 1')
    expect(event.dates.length).toBe(2)
    expect(event.dates[0]).toBe(1616434800000)
  })
})

describe.skip('TestCreate member', () => {
  it('Create member', async () => {
    const repo = new MemberRepositoryMongo()

    const member = await repo.createMember(
      '9b2f4e8c-8d59-11eb-8dcd-0242ac130003',
      'Member 1',
      'password'
    )

    expect(member.name).toBe('Member 1')
    expect(member.password).toBe('password')
  })

  it('Event not found', async () => {
    const repo = new MemberRepositoryMongo()

    try {
      await repo.createMember(
        '9b2f4e8c-8d59-11eb-8dcd-0242ac130003',
        'Member 1',
        'password'
      )
    } catch (error) {
      expect(error.message).toBe(
        'Event not found for eventId: 9b2f4e8c-8d59-11eb-8dcd-0242ac130003'
      )
    }
  })
})

describe.skip('TestGet event', () => {
  it('Get event', async () => {
    const repo = new MemberRepositoryMongo()

    const event = await repo.getEvent('9b2f4e8c-8d59-11eb-8dcd-0242ac130003')

    expect(event.id).toBe('9b2f4e8c-8d59-11eb-8dcd-0242ac130003')
    expect(event.name).toBe('Event 1')
    expect(event.dates.length).toBe(2)
    expect(event.dates[0]).toBe(1616434800000)
  })

  it('Event not found', async () => {
    const repo = new MemberRepositoryMongo()

    try {
      await repo.getEvent('9b2f4e8c-8d59-11eb-8dcd-0242ac130003')
    } catch (error) {
      expect(error.message).toBe(
        'Event not found for eventId: 9b2f4e8c-8d59-11eb-8dcd-0242ac130003'
      )
    }
  })
})
