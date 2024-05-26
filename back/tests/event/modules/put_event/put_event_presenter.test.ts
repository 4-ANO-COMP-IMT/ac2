import { PutEventPresenter } from '../../../../src/event/modules/put_event/put_event_presenter'

import { test, expect } from 'vitest'
import { HttpRequest } from '../../../../src/shared/domain/helpers/http/http_request'

test('Test get event presenter found', async () => {
  const presenter = new PutEventPresenter()
  const response = await presenter.call(new HttpRequest('put', { id: '2' }))
  const eventExpect = {
    id: '2',
    name: 'Academy Chest Day',
    start_date: 1632950200000,
    end_date: 1632954000000,
    time_interval: 300000
  }
  expect(response.status).toBe(200)
  expect(response.message).toBe('event changed successfully')
  expect(response.data).toEqual(eventExpect)
})

test('Test get event presenter not found', async () => {
  const presenter = new PutEventPresenter()
  const response = await presenter.call(new HttpRequest('put', { id: '4' }))
  expect(response.status).toBe(404)
  expect(response.message).toBe('event not found')
  expect(response.data).toBe(undefined)
})
