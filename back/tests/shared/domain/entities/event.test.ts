import { Event } from '../../../../src/shared/domain/entities/event'

import { test, expect } from 'vitest'

test('Test event', () => {
  const event = new Event(
    '1',
    'Event Name',
    1632950400000,
    1632954000000,
    600000
  )

  expect(event.id).toBe('1')
  expect(event.name).toBe('Event Name')
  expect(event.startDate).toBe(1632950400000)
  expect(event.endDate).toBe(1632954000000)
  expect(event.timeInterval).toBe(600000)
})

test('Test calculate total time', () => {
  const event = new Event(
    '1',
    'Event Name',
    1632950400000,
    1632954000000,
    600000
  )

  expect(event.calculateTotalTime()).toBe(3600000)
})

test('Test calculate cell numbers', () => {
  const event = new Event(
    '1',
    'Event Name',
    1632950400000,
    1632954000000,
    600000
  )

  expect(event.calculateCellNumbers()).toBe(6)
})
