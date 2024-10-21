import { expect, test } from 'vitest'

import { GetBestAvailabilitiesPresenter } from '../../../../src/availability/modules/get_best_availabilities/get_best_availabilities_presenter'
import { GetBestAvailabilitiesRequest } from '../../../../src/availability/modules/get_best_availabilities/protocols'
import { AvailabilityRepositoryMock } from '../../../../src/availability/shared/infra/repos/availability_repository_mock'
import { HttpRequest } from '../../../../src/shared/domain/helpers/http/http_request'
import { HTTP_STATUS_CODE } from '../../../../src/shared/domain/helpers/http/http_status_code'

test('update availabilities presenter OK', async () => {
  const presenter = new GetBestAvailabilitiesPresenter()
  const request = new HttpRequest('put', {
    eventId: AvailabilityRepositoryMock.events[2].id,
  })
  const response = await presenter.call(request)
  expect(response.status).toBe(HTTP_STATUS_CODE.OK)
})

test('update availabilities presenter BAD REQUEST', async () => {
  const presenter = new GetBestAvailabilitiesPresenter()
  const request = new HttpRequest('get', {
  } as GetBestAvailabilitiesRequest)
  const response = await presenter.call(request)
  expect(response.status).toBe(HTTP_STATUS_CODE.BAD_REQUEST)
})

test('update availabilities presenter NOT FOUND', async () => {
  const presenter = new GetBestAvailabilitiesPresenter()
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
  const request = new HttpRequest('get', {
    eventId: '123!',
  })
  const response = await presenter.call(request)
  expect(response.status).toBe(HTTP_STATUS_CODE.NOT_FOUND)
})
