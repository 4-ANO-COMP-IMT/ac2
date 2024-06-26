import { expect, test } from 'vitest'

import { Event } from '../../../../src/shared/domain/entities/event'
import { Member } from '../../../../src/shared/domain/entities/member'
import { Availability } from '../../../../src/shared/domain/entities/availability'

test('Test event without members and description', () => {
  const event = new Event(
    '1',
    'Criar nova música para o Maroon 5',
    1719392400000,
    1719781200000,
    32400000,
    75600000,
    []
  )

  expect(event.id).toBe('1')
  expect(event.name).toBe('Criar nova música para o Maroon 5')
  expect(event.startDate).toBe(1719392400000)
  expect(event.endDate).toBe(1719781200000)
  expect(event.notEarlier).toBe(32400000)
  expect(event.notLater).toBe(75600000)
})

test('Test event with members without description', () => {
  const members = [
    new Member('1', 'Adam Levine', [], 'Brownas')
  ]

  const event = new Event(
    '1',
    'Criar nova música para o Maroon 5',
    1719392400000,
    1719781200000,
    32400000,
    75600000,
    members
  )

  expect(event.id).toBe('1')
  expect(event.name).toBe('Criar nova música para o Maroon 5')
  expect(event.startDate).toBe(1719392400000)
  expect(event.endDate).toBe(1719781200000)
  expect(event.notEarlier).toBe(32400000)
  expect(event.notLater).toBe(75600000)
  expect(event.members).toEqual(members)
})

test('Test event with members and description', () => {
  const members = [
    new Member('1', 'Adam Levine', [], 'Brownas')
  ]

  const event = new Event(
    '1',
    'Criar nova música para o Maroon 5',
    1719392400000,
    1719781200000,
    32400000,
    75600000,
    members,
    'Descrição do evento'
  )

  expect(event.id).toBe('1')
  expect(event.name).toBe('Criar nova música para o Maroon 5')
  expect(event.startDate).toBe(1719392400000)
  expect(event.endDate).toBe(1719781200000)
  expect(event.notEarlier).toBe(32400000)
  expect(event.notLater).toBe(75600000)
  expect(event.members).toEqual(members)
  expect(event.description).toBe('Descrição do evento')
})

test('Test full event', () => {
  const availabilities = [
    new Availability('1', 1719403200000, 1719405000000)
  ]

  const members = [
    new Member('1', 'Adam Levine', availabilities, 'Brownas')
  ]

  const event = new Event(
    '1',
    'Criar nova música para o Maroon 5',
    1719392400000,
    1719781200000,
    32400000,
    75600000,
    members,
    'Descrição do evento'
  )

  expect(event.id).toBe('1')
  expect(event.name).toBe('Criar nova música para o Maroon 5')
  expect(event.startDate).toBe(1719392400000)
  expect(event.endDate).toBe(1719781200000)
  expect(event.notEarlier).toBe(32400000)
  expect(event.notLater).toBe(75600000)
  expect(event.members).toEqual(members)
  expect(event.description).toBe('Descrição do evento')
})

test('Test event startDate after endDate', () => {
  expect(() => {
    new Event(
      '1',
      'Criar nova música para o Maroon 5',
      1719781200000,
      1719392400000,
      32400000,
      75600000,
      []
    )
  }).toThrow()
})

test('Test event notEarlier after notLater', () => {
  expect(() => {
    new Event(
      '1',
      'Criar nova música para o Maroon 5',
      1719392400000,
      1719781200000,
      75600000,
      32400000,
      []
    )
  }).toThrow()
})

test('Test calculate total time', () => {
  const event = new Event(
    '1',
    'Criar nova música para o Maroon 5',
    1719392400000,
    1719781200000,
    32400000,
    75600000,
    []
  )

  expect(event.calculateTotalTime()).toBe(388800000)
})

test('Test equals', () => {
  const event = new Event(
    '1',
    'Criar nova música para o Maroon 5',
    1719392400000,
    1719781200000,
    32400000,
    75600000,
    []
  )

  const event2 = new Event(
    '1',
    'Criar nova música para o Maroon 5',
    1719392400000,
    1719781200000,
    32400000,
    75600000,
    []
  )

  expect(event.equals(event2)).toBe(true)
})

test('Test equals with members', () => {
  const members = [
    new Member('1', 'Adam Levine', [], 'Brownas')
  ]

  const event = new Event(
    '1',
    'Criar nova música para o Maroon 5',
    1719392400000,
    1719781200000,
    32400000,
    75600000,
    members
  )

  const event2 = new Event(
    '1',
    'Criar nova música para o Maroon 5',
    1719392400000,
    1719781200000,
    32400000,
    75600000,
    members
  )

  expect(event.equals(event2)).toBe(true)
})

test('Test toJson', () => {
  const event = new Event(
    '1',
    'Criar nova música para o Maroon 5',
    1719392400000,
    1719781200000,
    32400000,
    75600000,
    []
  )

  expect(event.toJson()).toEqual({
    id: '1',
    name: 'Criar nova música para o Maroon 5',
    startDate: 1719392400000,
    endDate: 1719781200000,
    notEarlier: 32400000,
    notLater: 75600000,
    members: [],
    description: undefined
  })
})

test('Test toJson with members', () => {
  const members = [
    new Member('1', 'Adam Levine', [], 'Brownas')
  ]

  const event = new Event(
    '1',
    'Criar nova música para o Maroon 5',
    1719392400000,
    1719781200000,
    32400000,
    75600000,
    members
  )

  expect(event.toJson()).toEqual({
    id: '1',
    name: 'Criar nova música para o Maroon 5',
    startDate: 1719392400000,
    endDate: 1719781200000,
    notEarlier: 32400000,
    notLater: 75600000,
    members: [
      {
        id: '1',
        name: 'Adam Levine',
        availabilities: [],
        password: 'Brownas'
      }
    ],
    description: undefined
  })
})

test('Test toJson full', () => {
  const availabilities = [
    new Availability('1', 1719403200000, 1719405000000)
  ]

  const members = [
    new Member('1', 'Adam Levine', availabilities, 'Brownas')
  ]

  const event = new Event(
    '1',
    'Criar nova música para o Maroon 5',
    1719392400000,
    1719781200000,
    32400000,
    75600000,
    members,
    'Descrição do evento'
  )

  expect(event.toJson()).toEqual({
    id: '1',
    name: 'Criar nova música para o Maroon 5',
    startDate: 1719392400000,
    endDate: 1719781200000,
    notEarlier: 32400000,
    notLater: 75600000,
    members: [
      {
        id: '1',
        name: 'Adam Levine',
        availabilities: [
          {
            id: '1',
            startDate: 1719403200000,
            endDate: 1719405000000
          }
        ],
        password: 'Brownas'
      }
    ],
    description: 'Descrição do evento'
  })
})