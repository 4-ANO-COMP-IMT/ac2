import { describe, expect, it, test } from 'vitest'

import { UpdateAvailabilitiesController } from '../../../../src/availability/modules/update_availabilities/update_availabilities_controller'
import { UpdateAvailabilitiesUsecase } from '../../../../src/availability/modules/update_availabilities/update_availabilities_usecase'
import { UpdateAvailabilitiesRequest } from '../../../../src/availability/modules/update_availabilities/protocols'
import { AvailabilityRepositoryMock } from '../../../../src/availability/shared/infra/repos/availability_repository_mock'
import { HttpRequest } from '../../../../src/shared/domain/helpers/http/http_request'
import { HTTP_STATUS_CODE } from '../../../../src/shared/domain/helpers/http/http_status_code'
import { Availability } from '../../../../src/shared/domain/entities/availability'

test('update avalabilities controller ok', async () => {
  const repo = new AvailabilityRepositoryMock()
  const usecase = new UpdateAvailabilitiesUsecase(repo)
  const controller = new UpdateAvailabilitiesController(usecase)
  const new_availabilities_json = [
    {
      startDate: 1719403200000,
      endDate: 1719405000000
    },
    {
      startDate: 1719405200000,
      endDate: 1719407000000
    }
  ]
  const request = new HttpRequest('put', {
    eventId: AvailabilityRepositoryMock.events[2].id,
    memberId: AvailabilityRepositoryMock.events[2].members[0].id,
    availabilities: new_availabilities_json,
  })
  const response = await controller.call(request)
  expect(response.status).toBe(HTTP_STATUS_CODE.OK)
  expect(response.message).toBe('availabilities updated')
  expect(AvailabilityRepositoryMock.events[2].members[0].availabilities.length).toBe(new_availabilities_json.length)
})

describe('update avalabilities controller body', () => {
  it('should return BAD REQUEST if body is missing', async () => {
    const repo = new AvailabilityRepositoryMock()
    const usecase = new UpdateAvailabilitiesUsecase(repo)
    const controller = new UpdateAvailabilitiesController(usecase)
    const request = new HttpRequest('put', {
    } as UpdateAvailabilitiesRequest)
    const response = await controller.call(request)
    expect(response.status).toBe(HTTP_STATUS_CODE.BAD_REQUEST)
    expect(response.message).toBe('missing body')
    expect(response.data).toBe(undefined)
  })

  it('should return BAD REQUEST if eventId is missing', async () => {
    const repo = new AvailabilityRepositoryMock()
    const usecase = new UpdateAvailabilitiesUsecase(repo)
    const controller = new UpdateAvailabilitiesController(usecase)
    const new_availabilities_json = [
      {
        startDate: 1719403200000,
        endDate: 1719405000000
      },
      {
        startDate: 1719405200000,
        endDate: 1719407000000
      }
    ]
    const request = new HttpRequest('put', {
      memberId: AvailabilityRepositoryMock.events[2].members[0].id,
      availabilities: new_availabilities_json,
    } as UpdateAvailabilitiesRequest)
    const response = await controller.call(request)
    expect(response.status).toBe(HTTP_STATUS_CODE.BAD_REQUEST)
    expect(response.message).toBe('missing eventId')
    expect(response.data).toBe(undefined)
  })

  it('should return BAD REQUEST if memberId is missing', async () => {
    const repo = new AvailabilityRepositoryMock()
    const usecase = new UpdateAvailabilitiesUsecase(repo)
    const controller = new UpdateAvailabilitiesController(usecase)
    const new_availabilities_json = [
      {
        startDate: 1719403200000,
        endDate: 1719405000000
      },
      {
        startDate: 1719405200000,
        endDate: 1719407000000
      }
    ]
    const request = new HttpRequest('put', {
      eventId: AvailabilityRepositoryMock.events[2].id,
      availabilities: new_availabilities_json,
    } as UpdateAvailabilitiesRequest)
    const response = await controller.call(request)
    expect(response.status).toBe(HTTP_STATUS_CODE.BAD_REQUEST)
    expect(response.message).toBe('missing memberId')
    expect(response.data).toBe(undefined)
  })

  it('should return BAD REQUEST if availabilities is missing', async () => {
    const repo = new AvailabilityRepositoryMock()
    const usecase = new UpdateAvailabilitiesUsecase(repo)
    const controller = new UpdateAvailabilitiesController(usecase)
    const request = new HttpRequest('put', {
      eventId: AvailabilityRepositoryMock.events[2].id,
      memberId: AvailabilityRepositoryMock.events[2].members[0].id,
    } as UpdateAvailabilitiesRequest)
    const response = await controller.call(request)
    expect(response.status).toBe(HTTP_STATUS_CODE.BAD_REQUEST)
    expect(response.message).toBe('missing availabilities')
    expect(response.data).toBe(undefined)
  })
})

describe('update avalabilities controller not found', () => {
  it('eventId', async () => {
    const repo = new AvailabilityRepositoryMock()
    const usecase = new UpdateAvailabilitiesUsecase(repo)
    const controller = new UpdateAvailabilitiesController(usecase)
    const new_availabilities_json = [
      {
        startDate: 1719403200000,
        endDate: 1719405000000
      },
      {
        startDate: 1719405200000,
        endDate: 1719407000000
      }
    ]
    const request = new HttpRequest('put', {
      eventId: '123!',
      memberId: AvailabilityRepositoryMock.events[2].members[0].id,
      availabilities: new_availabilities_json,
    })
    const response = await controller.call(request)
    expect(response.status).toBe(HTTP_STATUS_CODE.NOT_FOUND)
    expect(response.message).toBe('Event not found for eventId: 123!')
    expect(response.data).toBe(undefined)
  })

  it('memberId', async () => {
    const repo = new AvailabilityRepositoryMock()
    const usecase = new UpdateAvailabilitiesUsecase(repo)
    const controller = new UpdateAvailabilitiesController(usecase)
    const new_availabilities_json = [
      {
        startDate: 1719403200000,
        endDate: 1719405000000
      },
      {
        startDate: 1719405200000,
        endDate: 1719407000000
      }
    ]
    const request = new HttpRequest('put', {
      eventId: AvailabilityRepositoryMock.events[2].id,
      memberId: '123!',
      availabilities: new_availabilities_json,
    })
    const response = await controller.call(request)
    expect(response.status).toBe(HTTP_STATUS_CODE.NOT_FOUND)
    expect(response.message).toBe('Member not found for memberId: 123!')
    expect(response.data).toBe(undefined)
  })

  
})
