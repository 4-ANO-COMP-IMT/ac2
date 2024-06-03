import { test, expect } from 'vitest'
import { GetSchedulesByEventPresenter } from '../../../../src/schedule/modules/get_schedules_by_event/get_schedules_by_event_presenter'
import { HttpRequest } from '../../../../src/shared/domain/helpers/http/http_request'
import { HTTP_STATUS_CODE } from '../../../../src/shared/domain/helpers/http/http_status_code'

test('Test get schedule by event presenter returns an object', async () => {
  const presenter = new GetSchedulesByEventPresenter()
  const response = await presenter.call(
    new HttpRequest('get', { eventId: '2' })
  )

  expect(response.status).toBe(HTTP_STATUS_CODE.OK)
  expect(response.message).toBe('schedules found')
  expect(response.data).toBeTypeOf('object')
})
