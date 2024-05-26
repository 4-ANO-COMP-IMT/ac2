import { EventRepositoryMock } from '../../../../../src/event/shared/infra/repos/event_repository_mock'
import { Event } from '../../../../../src/shared/domain/entities/event'

import { test, expect } from 'vitest'

test('Test get event found', async () => {
  const repo = new EventRepositoryMock()
  const event = await repo.getEvent('2')
  const eventExpect = new Event(
    '2',
    'Academy Chest Day',
    1632950200000,
    1632954000000,
    300000
  )
  expect(event).not.toBe(undefined)
  expect(event?.equals(eventExpect)).toBe(true)
})

test('Test get event not found', () => {
  const repo = new EventRepositoryMock()
  expect(async () => {
    await repo.getEvent('1001')
  }).rejects.toThrowError('event not found')
})

test('Test put name', async () => {
  const repo = new EventRepositoryMock()
  const event = await repo.putEvent('2', {
    name: 'Academy Leg Day'
  })
  const eventExpect = new Event(
    '2',
    'Academy Leg Day',
    1632950200000,
    1632954000000,
    300000
  )
  expect(event).not.toBe(undefined)
  expect(event).toBeInstanceOf(Event)
  expect(event?.name).toBe('Academy Leg Day')
  expect(event?.startDate).toBe(1632950200000)
  expect(event?.endDate).toBe(1632954000000)
  expect(event?.timeInterval).toBe(300000)
  expect(event?.equals(eventExpect)).toBe(true)
  repo.resetMock()
})

test('Test put start date', async () => {
  const repo = new EventRepositoryMock()
  const event = await repo.putEvent('2', {
    start_date: 1632950000000
  })
  const eventExpect = new Event(
    '2',
    'Academy Chest Day',
    1632950000000,
    1632954000000,
    300000
  )
  expect(event).not.toBe(undefined)
  expect(event).toBeInstanceOf(Event)
  expect(event?.name).toBe('Academy Chest Day')
  expect(event?.startDate).toBe(1632950000000)
  expect(event?.endDate).toBe(1632954000000)
  expect(event?.timeInterval).toBe(300000)
  expect(event?.equals(eventExpect)).toBe(true)
  repo.resetMock()
})

test('Test put end date', async () => {
  const repo = new EventRepositoryMock()
  const event = await repo.putEvent('2', {
    end_date: 1632954000000
  })
  const eventExpect = new Event(
    '2',
    'Academy Chest Day',
    1632950200000,
    1632954000000,
    300000
  )
  expect(event).not.toBe(undefined)
  expect(event).toBeInstanceOf(Event)
  expect(event?.name).toBe('Academy Chest Day')
  expect(event?.startDate).toBe(1632950200000)
  expect(event?.endDate).toBe(1632954000000)
  expect(event?.timeInterval).toBe(300000)
  expect(event?.equals(eventExpect)).toBe(true)
  repo.resetMock()
})

test('Test put time interval', async () => {
  const repo = new EventRepositoryMock()
  const event = await repo.putEvent('2', {
    time_interval: 600000
  })
  const eventExpect = new Event(
    '2',
    'Academy Chest Day',
    1632950200000,
    1632954000000,
    600000
  )
  expect(event).not.toBe(undefined)
  expect(event).toBeInstanceOf(Event)
  expect(event?.name).toBe('Academy Chest Day')
  expect(event?.startDate).toBe(1632950200000)
  expect(event?.endDate).toBe(1632954000000)
  expect(event?.timeInterval).toBe(600000)
  expect(event?.equals(eventExpect)).toBe(true)
  repo.resetMock()
})

test('Test put event name and start date', async () => {
  const repo = new EventRepositoryMock()
  const event = await repo.putEvent('2', {
    name: 'Academy Leg Day',
    start_date: 1632950000000
  })
  const eventExpect = new Event(
    '2',
    'Academy Leg Day',
    1632950000000,
    1632954000000,
    300000
  )
  expect(event).not.toBe(undefined)
  expect(event).toBeInstanceOf(Event)
  expect(event?.name).toBe('Academy Leg Day')
  expect(event?.startDate).toBe(1632950000000)
  expect(event?.endDate).toBe(1632954000000)
  expect(event?.timeInterval).toBe(300000)
  expect(event?.equals(eventExpect)).toBe(true)
  repo.resetMock()
})

test('Test put event name and end date', async () => {
  const repo = new EventRepositoryMock()
  const event = await repo.putEvent('2', {
    name: 'Academy Leg Day',
    end_date: 1632954000000
  })
  const eventExpect = new Event(
    '2',
    'Academy Leg Day',
    1632950200000,
    1632954000000,
    300000
  )
  expect(event).not.toBe(undefined)
  expect(event).toBeInstanceOf(Event)
  expect(event?.name).toBe('Academy Leg Day')
  expect(event?.startDate).toBe(1632950200000)
  expect(event?.endDate).toBe(1632954000000)
  expect(event?.timeInterval).toBe(300000)
  expect(event?.equals(eventExpect)).toBe(true)
  repo.resetMock()
})

test('Test put event name and time interval', async () => {
  const repo = new EventRepositoryMock()
  const event = await repo.putEvent('2', {
    name: 'Academy Leg Day',
    time_interval: 600000
  })
  const eventExpect = new Event(
    '2',
    'Academy Leg Day',
    1632950200000,
    1632954000000,
    600000
  )
  expect(event).not.toBe(undefined)
  expect(event).toBeInstanceOf(Event)
  expect(event?.name).toBe('Academy Leg Day')
  expect(event?.startDate).toBe(1632950200000)
  expect(event?.endDate).toBe(1632954000000)
  expect(event?.timeInterval).toBe(600000)
  expect(event?.equals(eventExpect)).toBe(true)
  repo.resetMock()
})

test('Test put event start date and end date', async () => {
  const repo = new EventRepositoryMock()
  const event = await repo.putEvent('2', {
    start_date: 1632950000000,
    end_date: 1632954000000
  })
  const eventExpect = new Event(
    '2',
    'Academy Chest Day',
    1632950000000,
    1632954000000,
    300000
  )
  expect(event).not.toBe(undefined)
  expect(event).toBeInstanceOf(Event)
  expect(event?.name).toBe('Academy Chest Day')
  expect(event?.startDate).toBe(1632950000000)
  expect(event?.endDate).toBe(1632954000000)
  expect(event?.timeInterval).toBe(300000)
  expect(event?.equals(eventExpect)).toBe(true)
  repo.resetMock()
})

test('Test put event start date and time interval', async () => {
  const repo = new EventRepositoryMock()
  const event = await repo.putEvent('2', {
    start_date: 1632950000000,
    time_interval: 600000
  })
  const eventExpect = new Event(
    '2',
    'Academy Chest Day',
    1632950000000,
    1632954000000,
    600000
  )
  expect(event).not.toBe(undefined)
  expect(event).toBeInstanceOf(Event)
  expect(event?.name).toBe('Academy Chest Day')
  expect(event?.startDate).toBe(1632950000000)
  expect(event?.endDate).toBe(1632954000000)
  expect(event?.timeInterval).toBe(600000)
  expect(event?.equals(eventExpect)).toBe(true)
  repo.resetMock()
})

test('Test put event end date and time interval', async () => {
  const repo = new EventRepositoryMock()
  const event = await repo.putEvent('2', {
    end_date: 1632954000000,
    time_interval: 600000
  })
  const eventExpect = new Event(
    '2',
    'Academy Chest Day',
    1632950200000,
    1632954000000,
    600000
  )
  expect(event).not.toBe(undefined)
  expect(event).toBeInstanceOf(Event)
  expect(event?.name).toBe('Academy Chest Day')
  expect(event?.startDate).toBe(1632950200000)
  expect(event?.endDate).toBe(1632954000000)
  expect(event?.timeInterval).toBe(600000)
  expect(event?.equals(eventExpect)).toBe(true)
  repo.resetMock()
})

test('Test put event name, start date and end date', async () => {
  const repo = new EventRepositoryMock()
  const event = await repo.putEvent('2', {
    name: 'Academy Leg Day',
    start_date: 1632950000000,
    end_date: 1632954000000
  })
  const eventExpect = new Event(
    '2',
    'Academy Leg Day',
    1632950000000,
    1632954000000,
    300000
  )
  expect(event).not.toBe(undefined)
  expect(event).toBeInstanceOf(Event)
  expect(event?.name).toBe('Academy Leg Day')
  expect(event?.startDate).toBe(1632950000000)
  expect(event?.endDate).toBe(1632954000000)
  expect(event?.timeInterval).toBe(300000)
  expect(event?.equals(eventExpect)).toBe(true)
  repo.resetMock()
})

test('Test put event name, start date and time interval', async () => {
  const repo = new EventRepositoryMock()
  const event = await repo.putEvent('2', {
    name: 'Academy Leg Day',
    start_date: 1632950000000,
    time_interval: 600000
  })
  const eventExpect = new Event(
    '2',
    'Academy Leg Day',
    1632950000000,
    1632954000000,
    600000
  )
  expect(event).not.toBe(undefined)
  expect(event).toBeInstanceOf(Event)
  expect(event?.name).toBe('Academy Leg Day')
  expect(event?.startDate).toBe(1632950000000)
  expect(event?.endDate).toBe(1632954000000)
  expect(event?.timeInterval).toBe(600000)
  expect(event?.equals(eventExpect)).toBe(true)
  repo.resetMock()
})

test('Test put event name, end date and time interval', async () => {
  const repo = new EventRepositoryMock()
  const event = await repo.putEvent('2', {
    name: 'Academy Leg Day',
    end_date: 1632954000000,
    time_interval: 600000
  })
  const eventExpect = new Event(
    '2',
    'Academy Leg Day',
    1632950200000,
    1632954000000,
    600000
  )
  expect(event).not.toBe(undefined)
  expect(event).toBeInstanceOf(Event)
  expect(event?.name).toBe('Academy Leg Day')
  expect(event?.startDate).toBe(1632950200000)
  expect(event?.endDate).toBe(1632954000000)
  expect(event?.timeInterval).toBe(600000)
  expect(event?.equals(eventExpect)).toBe(true)
  repo.resetMock()
})

test('Test put event start date, end date and time interval', async () => {
  const repo = new EventRepositoryMock()
  const event = await repo.putEvent('2', {
    start_date: 1632950000000,
    end_date: 1632954000000,
    time_interval: 600000
  })
  const eventExpect = new Event(
    '2',
    'Academy Chest Day',
    1632950000000,
    1632954000000,
    600000
  )
  expect(event).not.toBe(undefined)
  expect(event).toBeInstanceOf(Event)
  expect(event?.name).toBe('Academy Chest Day')
  expect(event?.startDate).toBe(1632950000000)
  expect(event?.endDate).toBe(1632954000000)
  expect(event?.timeInterval).toBe(600000)
  expect(event?.equals(eventExpect)).toBe(true)
  repo.resetMock()
})

test('Test put event name, start date, end date and time interval', async () => {
  const repo = new EventRepositoryMock()
  const event = await repo.putEvent('2', {
    name: 'Academy Leg Day',
    start_date: 1632950000000,
    end_date: 1632954000000,
    time_interval: 600000
  })
  const eventExpect = new Event(
    '2',
    'Academy Leg Day',
    1632950000000,
    1632954000000,
    600000
  )
  expect(event).not.toBe(undefined)
  expect(event).toBeInstanceOf(Event)
  expect(event?.name).toBe('Academy Leg Day')
  expect(event?.startDate).toBe(1632950000000)
  expect(event?.endDate).toBe(1632954000000)
  expect(event?.timeInterval).toBe(600000)
  expect(event?.equals(eventExpect)).toBe(true)
  repo.resetMock()
})

test('Test put event not found', async () => {
  const repo = new EventRepositoryMock()
  expect(async () => {
    await repo.putEvent('1001', {})
  }).rejects.toThrowError('event not found')
  repo.resetMock()
})

test('Test create event', () => {
  const repo = new EventRepositoryMock()
  repo.createEvent(
    new Event('4', 'Event Name', 1632950400000, 1632954000000, 600000)
  )
  expect(EventRepositoryMock.events.length).toBe(4)
  repo.resetMock()
})

test('Test delete event found', async () => {
  const repo = new EventRepositoryMock()
  const event = await repo.deleteEvent('2')
  expect(event).not.toBe(undefined)
  expect(EventRepositoryMock.events.length).toBe(2)
  repo.resetMock()
})

test('Test delete event not found', () => {
  const repo = new EventRepositoryMock()
  expect(async () => {
    await repo.deleteEvent('1001')
  }).rejects.toThrowError('event not found')
})
