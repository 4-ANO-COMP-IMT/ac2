import { expect, test } from 'vitest'

import { UpdateAvailabilitiesPresenter } from '../../../../src/availability/modules/update_availabilities/update_availabilities_presenter'
import { UpdateAvailabilitiesRequest } from '../../../../src/availability/modules/update_availabilities/protocols'
import { AvailabilityRepositoryMock } from '../../../../src/availability/shared/infra/repos/availability_repository_mock'
import { HttpRequest } from '../../../../src/shared/domain/helpers/http/http_request'
import { HTTP_STATUS_CODE } from '../../../../src/shared/domain/helpers/http/http_status_code'

test('update availabilities presenter OK', async () => {
  const presenter = new UpdateAvailabilitiesPresenter()
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
  const response = await presenter.call(request)
  expect(response.status).toBe(HTTP_STATUS_CODE.OK)
})

test('update availabilities presenter BAD REQUEST', async () => {
  const presenter = new UpdateAvailabilitiesPresenter()
  const request = new HttpRequest('put', {
  } as UpdateAvailabilitiesRequest)
  const response = await presenter.call(request)
  expect(response.status).toBe(HTTP_STATUS_CODE.BAD_REQUEST)
})

test('update availabilities presenter NOT FOUND', async () => {
  const presenter = new UpdateAvailabilitiesPresenter()
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
  const response = await presenter.call(request)
  expect(response.status).toBe(HTTP_STATUS_CODE.NOT_FOUND)
})
