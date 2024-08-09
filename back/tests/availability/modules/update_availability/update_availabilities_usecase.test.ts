import { expect, test, describe, it } from 'vitest'

import { UpdateAvailabilitiesUsecase } from '../../../../src/availability/modules/update_availabilities/update_availabilities_usecase'
import { AvailabilityRepositoryMock } from '../../../../src/availability/shared/infra/repos/availability_repository_mock'
import { Availability } from '../../../../src/shared/domain/entities/availability'

test('Test update availabilities success', async () => {
  const repo = new AvailabilityRepositoryMock()
  const lengthBefore = AvailabilityRepositoryMock.events.length
  const usecase = new UpdateAvailabilitiesUsecase(repo)
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
  const availabilities = await usecase.call(
    AvailabilityRepositoryMock.events[2].id,
    AvailabilityRepositoryMock.events[2].members[0].id,
    new_availabilities
  )

  expect(availabilities[0]).toBeInstanceOf(Availability)
  expect(availabilities.length).toBe(AvailabilityRepositoryMock.events[2].members[0].availabilities.length)
  repo.resetMock()
})

describe('Test update availabilities fail', async () => {
  it('Event not found', async () => {
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

  it('Member not found', async () => {
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
