import { expect, test } from 'vitest'

import { DeleteSchedulePresenter } from '../../../../src/schedule/modules/delete_schedules_by_event/delete_schedules_presenter'
import { ScheduleRepositoryMock } from '../../../../src/schedule/shared/infra/repos/schedule_repository_mock'
import { HttpRequest } from '../../../../src/shared/domain/helpers/http/http_request'
import { HTTP_STATUS_CODE } from '../../../../src/shared/domain/helpers/http/http_status_code'

test('Test delete schedule presenter found', async () => {
  const repo = new ScheduleRepositoryMock()
  const presenter = new DeleteSchedulePresenter()
  const request = new HttpRequest('delete', {
    id: '3fde5c12-cfee-46d8-9469-d77de8370739'
  })
  const response = await presenter.call(request)
  const scheduleExpect = {
    id: '3fde5c12-cfee-46d8-9469-d77de8370739',
    event_id: '2',
    time: 1632942000000,
    name: 'Flavio'
  }
  expect(response.status).toBe(HTTP_STATUS_CODE.OK)
  expect(response.message).toBe('schedule deleted')
  expect(response.data).toEqual(scheduleExpect)
  repo.resetMock()
})

test('Test delete event presenter not found', async () => {
  const presenter = new DeleteSchedulePresenter()
  const request = new HttpRequest('delete', { id: '4' })
  const response = await presenter.call(request)
  expect(response.status).toBe(HTTP_STATUS_CODE.NOT_FOUND)
  expect(response.message).toBe('schedule not found')
  expect(response.data).toBe(undefined)
})
