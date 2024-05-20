import { GetEventPresenter } from '../../../../src/event/modules/get_event/get_event_presenter'

import { test, expect } from 'vitest'

test('Test get event presenter found', async () => {
  const presenter = new GetEventPresenter()
  const response = await presenter.call({ params: { id: '2' } })
  const eventExpect = {
    id: '2',
    name: 'Academy Chest Day',
    start_date: 1632950200000,
    end_date: 1632954000000,
    time_interval: 300000
  }
  expect(response.status).toBe(200)
  expect(response.message).toBe('event found')
  expect(response.event).toEqual(eventExpect)
})

test('Test get event presenter not found', async () => {
  const presenter = new GetEventPresenter()
  const response = await presenter.call({ params: { id: '4' } })
  expect(response.status).toBe(404)
  expect(response.message).toBe('event not found')
  expect(response.event).toBe(undefined)
})
