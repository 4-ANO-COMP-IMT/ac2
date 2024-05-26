import { describe, expect, it, test } from 'vitest'

import { EventRepositoryMock } from '../../../../../src/event/shared/infra/repos/event_repository_mock'
import { Event } from '../../../../../src/shared/domain/entities/event'

test('test get event found', async () => {
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

test('test get event not found', () => {
  const repo = new EventRepositoryMock()
  expect(async () => {
    await repo.getEvent('1001')
  }).rejects.toThrowError('event not found')
})

describe('test put event', () => {
  it('should update the event name', async () => {
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

  it('should update the event start date', async () => {
    const repo = new EventRepositoryMock()
    const event = await repo.putEvent('2', {
      startDate: 1632950000000
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

  it('should update the event end date', async () => {
    const repo = new EventRepositoryMock()
    const event = await repo.putEvent('2', {
      endDate: 1632954000000
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

  it('should update the event time interval', async () => {
    const repo = new EventRepositoryMock()
    const event = await repo.putEvent('2', {
      timeInterval: 600000
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

  it('should update the event name and start date', async () => {
    const repo = new EventRepositoryMock()
    const event = await repo.putEvent('2', {
      name: 'Academy Leg Day',
      startDate: 1632950000000
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

  it('should update the event name and end date', async () => {
    const repo = new EventRepositoryMock()
    const event = await repo.putEvent('2', {
      name: 'Academy Leg Day',
      endDate: 1632954000000
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

  it('should update the event name and time interval', async () => {
    const repo = new EventRepositoryMock()
    const event = await repo.putEvent('2', {
      name: 'Academy Leg Day',
      timeInterval: 600000
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

  it('should update the event start date and end date', async () => {
    const repo = new EventRepositoryMock()
    const event = await repo.putEvent('2', {
      startDate: 1632950000000,
      endDate: 1632954000000
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

  it('should update the event start date and time interval', async () => {
    const repo = new EventRepositoryMock()
    const event = await repo.putEvent('2', {
      startDate: 1632950000000,
      timeInterval: 600000
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

  it('should update the event end date and time interval', async () => {
    const repo = new EventRepositoryMock()
    const event = await repo.putEvent('2', {
      endDate: 1632954000000,
      timeInterval: 600000
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

  it('should update the event name, start date and end date', async () => {
    const repo = new EventRepositoryMock()
    const event = await repo.putEvent('2', {
      name: 'Academy Leg Day',
      startDate: 1632950000000,
      endDate: 1632954000000
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

  it('should update the event name, start date and time interval', async () => {
    const repo = new EventRepositoryMock()
    const event = await repo.putEvent('2', {
      name: 'Academy Leg Day',
      startDate: 1632950000000,
      timeInterval: 600000
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

  it('should update the event name, end date and time interval', async () => {
    const repo = new EventRepositoryMock()
    const event = await repo.putEvent('2', {
      name: 'Academy Leg Day',
      endDate: 1632954000000,
      timeInterval: 600000
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

  it('should update the event start date, end date and time interval', async () => {
    const repo = new EventRepositoryMock()
    const event = await repo.putEvent('2', {
      startDate: 1632950000000,
      endDate: 1632954000000,
      timeInterval: 600000
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

  it('should update the event name, start date, end date and time interval', async () => {
    const repo = new EventRepositoryMock()
    const event = await repo.putEvent('2', {
      name: 'Academy Leg Day',
      startDate: 1632950000000,
      endDate: 1632954000000,
      timeInterval: 600000
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
})

test('test put event not found', async () => {
  const repo = new EventRepositoryMock()
  expect(async () => {
    await repo.putEvent('1001', {})
  }).rejects.toThrowError('event not found')
  repo.resetMock()
})

test('test create event', () => {
  const repo = new EventRepositoryMock()
  repo.createEvent(
    new Event('4', 'Event Name', 1632950400000, 1632954000000, 600000)
  )
  expect(EventRepositoryMock.events.length).toBe(4)
  repo.resetMock()
})

test('test delete event found', async () => {
  const repo = new EventRepositoryMock()
  const event = await repo.deleteEvent('2')
  expect(event).not.toBe(undefined)
  expect(EventRepositoryMock.events.length).toBe(2)
  repo.resetMock()
})

test('test delete event not found', () => {
  const repo = new EventRepositoryMock()
  expect(async () => {
    await repo.deleteEvent('1001')
  }).rejects.toThrowError('event not found')
})
