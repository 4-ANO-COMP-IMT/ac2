import { describe, expect, it, test } from 'vitest'

import { GetBestAvailabilitiesController } from '../../../../src/availability/modules/get_best_availabilities/get_best_availabilities_controller'
import { GetBestAvailabilitiesUsecase } from '../../../../src/availability/modules/get_best_availabilities/get_best_availabilities_usecase'
import { BestAvailabilitiesProps, GetBestAvailabilitiesRequest } from '../../../../src/availability/modules/get_best_availabilities/protocols'
import { AvailabilityRepositoryMock } from '../../../../src/availability/shared/infra/repos/availability_repository_mock'
import { HttpRequest } from '../../../../src/shared/domain/helpers/http/http_request'
import { HTTP_STATUS_CODE } from '../../../../src/shared/domain/helpers/http/http_status_code'
import { Event } from '../../../../src/shared/domain/entities/event'
import { Availability } from '../../../../src/shared/domain/entities/availability'
import { Member } from '../../../../src/shared/domain/entities/member'
import { HttpResponse } from '../../../../src/shared/domain/helpers/http/http_response'


test('get best availabilities controller ok', async () => {
  const repo = new AvailabilityRepositoryMock()
  AvailabilityRepositoryMock.events = [
    new Event(
      'event-1',
      'Reunião Básica',
      [1719781200000], 
      32400000,
      75600000,
      [
        new Member('member-1', 'Membro 1', [
          new Availability('availability-1', 1719792000000, 1719795600000)
        ]),
        new Member('member-2', 'Membro 2', [
          new Availability('availability-1', 1719792000000, 1719795600000)
        ]),
        new Member('member-3', 'Membro 3', [
          new Availability('availability-1', 1719792000000, 1719795600000)
        ]),
      ]
    )
  ]

  const usecase = new GetBestAvailabilitiesUsecase(repo)
  const controller = new GetBestAvailabilitiesController(usecase)
  const request = new HttpRequest('get', {
    eventId: 'event-1',
  })
  const response = await controller.call(request)
  expect(response.status).toBe(HTTP_STATUS_CODE.OK)
  expect(response.message).toBe('best availabilities found')
  if ('availabilities' in response) {
    const availabilities = (response.availabilities as BestAvailabilitiesProps)
    expect(availabilities.length).toEqual(1)
    expect(availabilities[0].startDate).toEqual(1719792000000)
    expect(availabilities[0].endDate).toEqual(1719795600000)
    expect(availabilities[0].members.length).toEqual(3)
  }
  repo.resetMock()

})

test('should return BAD REQUEST if eventId is missing', async () => {
  const repo = new AvailabilityRepositoryMock()
  const usecase = new GetBestAvailabilitiesUsecase(repo)
  const controller = new GetBestAvailabilitiesController(usecase)
  const request = new HttpRequest('get', {
  } as GetBestAvailabilitiesRequest)
  const response = await controller.call(request)
  expect(response.status).toBe(HTTP_STATUS_CODE.BAD_REQUEST)
  expect(response.message).toBe('missing eventId')
  expect(response.data).toBe(undefined)
})


test('get best availabilities controller not found eventId', async () => {
  const repo = new AvailabilityRepositoryMock()
  const usecase = new GetBestAvailabilitiesUsecase(repo)
  const controller = new GetBestAvailabilitiesController(usecase)
  const request = new HttpRequest('get', {
    eventId: '123!',
  })
  const response = await controller.call(request)
  expect(response.status).toBe(HTTP_STATUS_CODE.NOT_FOUND)
  expect(response.message).toBe('Event not found for eventId: 123!')
  expect(response.data).toBe(undefined)
})

test('get best availabilities controller not found best availability', async () => {
  const repo = new AvailabilityRepositoryMock()
  AvailabilityRepositoryMock.events = [
    new Event(
      'event-9',
      'Reunião com Membros com Availabilities Distintas',
      [1719781200000],
      32400000,
      75600000,
      [
        new Member('member-1', 'Membro 1', [
          new Availability('availability-1', 1719792000000, 1719795600000),
        ]),
        new Member('member-2', 'Membro 2', [
          new Availability('availability-2', 1719800000000, 1719803600000),
        ]),
        new Member('member-3', 'Membro 3', [
          new Availability('availability-3', 1719807200000, 1719810800000),
        ]),
      ]
    )
  ]

  const usecase = new GetBestAvailabilitiesUsecase(repo)
  const controller = new GetBestAvailabilitiesController(usecase)
  const request = new HttpRequest('get', {
    eventId: 'event-9',
  })
  const response = await controller.call(request)
  expect(response.status).toBe(HTTP_STATUS_CODE.NOT_FOUND)
  expect(response.message).toBe('No best availability found')
  repo.resetMock()

})