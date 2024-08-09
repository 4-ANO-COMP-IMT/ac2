import { describe, expect, it } from 'vitest'

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
