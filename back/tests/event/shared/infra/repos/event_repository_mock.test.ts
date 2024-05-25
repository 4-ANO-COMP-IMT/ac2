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

test('Test put event found', async () => {
  const repo = new EventRepositoryMock()
  const event = await repo.putEvent(
    new Event(
      '3',
      'Studying Software Engineering',
      1632950000000,
      1632954000000,
      100000
    )
  )
  const eventExpect = new Event(
    '3',
    'Studying Software Engineering',
    1632950000000,
    1632954000000,
    100000
  )
  expect(event).not.toBe(undefined)
  expect(event).toBeInstanceOf(Event)
  expect(event?.equals(eventExpect)).toBe(true)
})

test('Test put event not found', async () => {
  const repo = new EventRepositoryMock()
  expect(async () => {
    await repo.putEvent(
      new Event(
        '1001',
        'Studying Software Engineering',
        1632950000000,
        1632954000000,
        100000
      )
    )
  }).rejects.toThrowError('event not found')
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
