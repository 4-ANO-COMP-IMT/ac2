import { test, expect } from 'vitest'
import { GetSchedulesByEventPresenter } from '../../../../src/schedule/modules/get_schedules_by_event/get_schedules_by_event_presenter'
import { HttpRequest } from '../../../../src/shared/domain/helpers/http/http_request'

test('Test get event presenter found', async () => {
  const presenter = new GetSchedulesByEventPresenter()
  const response = await presenter.call(
    new HttpRequest('get', { eventId: '2' })
  )
  const eventExpect = {
    id: '2',
    name: 'Academy Chest Day',
    start_date: 1632950200000,
    end_date: 1632954000000,
    time_interval: 300000
  }
  expect(response.status).toBe(200)
  expect(response.message).toBe('schedule found')
  expect(response.data).toEqual(eventExpect)
})
