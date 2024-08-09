import { describe, expect, it, test } from 'vitest'

import { MemberRepositoryMock } from '../../../../../src/member/shared/infra/repos/member_repository_mock'
import { Member } from '../../../../../src/shared/domain/entities/member'
import { Availability } from '../../../../../src/shared/domain/entities/availability'

describe('Test createMember', () => {
  it('create a member', () => {
    const repo = new MemberRepositoryMock()
    const lengthBefore = MemberRepositoryMock.events[2].members.length
    repo.createMember(
      '9b2f4e8c-8d59-11eb-8dcd-0242ac130003',
      'Adam Leviner',
      'Brownas123!'
    )
    const lengthAfter = MemberRepositoryMock.events[2].members.length
    expect(lengthAfter).toBe(lengthBefore + 1)
    expect(MemberRepositoryMock.events[2].members[lengthAfter - 1].name).toBe(
      'Adam Leviner'
    )
    expect(
      MemberRepositoryMock.events[2].members[lengthAfter - 1].password
    ).toBe('Brownas123!')
    expect(
      MemberRepositoryMock.events[2].members[lengthAfter - 1].availabilities
        .length
    ).toBe(0)

    repo.resetMock()
  })

  it('create a member without password', () => {
    const repo = new MemberRepositoryMock()
    const lengthBefore = MemberRepositoryMock.events[2].members.length
    repo.createMember('9b2f4e8c-8d59-11eb-8dcd-0242ac130003', 'Flavio Brownas')
    const lengthAfter = MemberRepositoryMock.events[2].members.length
    expect(lengthAfter).toBe(lengthBefore + 1)
    expect(MemberRepositoryMock.events[2].members[lengthAfter - 1].name).toBe(
      'Flavio Brownas'
    )
    expect(
      MemberRepositoryMock.events[2].members[lengthAfter - 1].password
    ).toBe(undefined)
    expect(
      MemberRepositoryMock.events[2].members[lengthAfter - 1].availabilities
        .length
    ).toBe(0)

    repo.resetMock()
  })
})

describe('Test createMember failure', () => {
  it('eventId not found', () => {
    const repo = new MemberRepositoryMock()
    expect(
      async () =>
        await repo.createMember('123', 'Flavio Brownas', 'Brownas123!')
    ).rejects.toThrowError('Event not found for eventId: 123')
    repo.resetMock()
  })

  it('duplicate member', () => {
    const repo = new MemberRepositoryMock()
    expect(
      async () =>
        await repo.createMember(
          '9b2f4e8c-8d59-11eb-8dcd-0242ac130003',
          'Adam Levine'
        )
    ).rejects.toThrowError('Member already exists with name: Adam Levine')
    repo.resetMock()
  })
})

describe('Test getMemberByName', () => {
  it('get a member', async () => {
    const repo = new MemberRepositoryMock()
    const member = await repo.getMemberByName(
      'Adam Levine',
      '9b2f4e8c-8d59-11eb-8dcd-0242ac130003'
    )
    expect(member?.name).toBe('Adam Levine')
    expect(member?.password).toBe('Brownas')
    repo.resetMock()
  })

  it('event not found', () => {
    const repo = new MemberRepositoryMock()
    expect(
      async () => await repo.getMemberByName('Adam Levine', '123')
    ).rejects.toThrowError('Event not found for eventId: 123')
    repo.resetMock()
  })

  it('member not found', () => {
    const repo = new MemberRepositoryMock()
    const member = repo.getMemberByName(
      'Flavio Brownas',
      '9b2f4e8c-8d59-11eb-8dcd-0242ac130003'
    )
    expect(member).toBeInstanceOf(Promise)
    repo.resetMock()
  })
})

test('Test createEvent', () => {
  const repo = new MemberRepositoryMock()
  const lengthBefore = MemberRepositoryMock.events.length

  repo.createEvent(
    'adhuhuadhuasd',
    'Show do M5',
    [1719392400000],
    32400000,
    75600000,
    'description'
  )

  const lengthAfter = MemberRepositoryMock.events.length

  expect(lengthAfter).toBe(lengthBefore + 1)
  expect(MemberRepositoryMock.events[lengthAfter - 1].name).toBe('Show do M5')
  expect(MemberRepositoryMock.events[lengthAfter - 1].dates).toStrictEqual([
    1719392400000
  ])
  expect(MemberRepositoryMock.events[lengthAfter - 1].notEarlier).toBe(32400000)
  expect(MemberRepositoryMock.events[lengthAfter - 1].notLater).toBe(75600000)
  expect(MemberRepositoryMock.events[lengthAfter - 1].description).toBe(
    'description'
  )

  repo.resetMock()
})

describe('Test getMember', () => {
  it('get a member', async () => {
    const repo = new MemberRepositoryMock()
    const member = await repo.getMember(
      '9b2f4e8c-8d59-11eb-8dcd-0242ac130003',
      'a4f6b2b8-7f2a-4702-91f5-12d9c05d6b3d',
    )
    expect(member?.name).toBe('Adam Levine')
    expect(member?.password).toBe('Brownas')
    repo.resetMock()
  })

  it('event not found', () => {
    const repo = new MemberRepositoryMock()
    expect(
      async () => await repo.getMember('123', 'a4f6b2b8-7f2a-4702-91f5-12d9c05d6b3d')
    ).rejects.toThrowError('Event not found for eventId: 123')
    repo.resetMock()
  })

  it('member not found', () => {
    const repo = new MemberRepositoryMock()
    expect(
      async () => await repo.getMember('9b2f4e8c-8d59-11eb-8dcd-0242ac130003',
      '123!')
    ).rejects.toThrowError('Member not found for memberId: 123')
    repo.resetMock()
  })
})

describe('Test update availability', () => {
  it('success', async () => {
    const repo = new MemberRepositoryMock()
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
      MemberRepositoryMock.events[2].id,
      MemberRepositoryMock.events[2].members[0].id,
      new_availabilities
    )
    
    expect(new_availabilities.length).toStrictEqual(MemberRepositoryMock.events[2].members[0].availabilities.length)
    repo.resetMock()
  })

  it('event not found', async () => {
    const repo = new MemberRepositoryMock()
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
          MemberRepositoryMock.events[2].members[0].id,
          new_availabilities
        )
      ).rejects.toThrowError('Event not found for eventId: 123')
      
      repo.resetMock()
  })

  it('member not found', async () => {
    const repo = new MemberRepositoryMock()
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
          MemberRepositoryMock.events[2].id,
          '123',
          new_availabilities
        )
      ).rejects.toThrowError('Member not found for memberId: 123')
      
      repo.resetMock()
  })
})