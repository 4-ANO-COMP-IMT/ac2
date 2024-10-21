import { expect, test } from 'vitest'

import { Availability } from '../../../../src/shared/domain/entities/availability'
import { Member } from '../../../../src/shared/domain/entities/member'

test('Test member', () => {
  const member = new Member('1', 'Adam Levine', [], 'Brownas')

  expect(member.id).toBe('1')
  expect(member.name).toBe('Adam Levine')
  expect(member.password).toBe('Brownas')
  expect(member.availabilities).toEqual([])
})

test('Test member without password', () => {
  const member = new Member('1', 'Adam Levine', [])

  expect(member.id).toBe('1')
  expect(member.name).toBe('Adam Levine')
  expect(member.password).toBe(undefined)
  expect(member.availabilities).toEqual([])
})

test('Test member with availabilities', () => {
  const availabilities = [new Availability('1', 1719403200000, 1719405000000)]

  const member = new Member('1', 'Adam Levine', availabilities)

  expect(member.id).toBe('1')
  expect(member.name).toBe('Adam Levine')
  expect(member.password).toBe(undefined)
  expect(member.availabilities).toEqual(availabilities)
})

test('Test member toJson', () => {
  const member = new Member('1', 'Adam Levine', [], 'Brownas')

  expect(member.toJson()).toEqual({
    id: '1',
    name: 'Adam Levine',
    password: 'Brownas',
    availabilities: []
  })
})

test('Test member toJson with availabilities', () => {
  const availabilities = [new Availability('1', 1719403200000, 1719405000000)]

  const member = new Member('1', 'Adam Levine', availabilities)

  expect(member.toJson()).toEqual({
    id: '1',
    name: 'Adam Levine',
    password: undefined,
    availabilities: [availabilities[0].toJson()]
  })
})

test('Test member toJson without password', () => {
  const member = new Member('1', 'Adam Levine', [])

  expect(member.toJson()).toEqual({
    id: '1',
    name: 'Adam Levine',
    password: undefined,
    availabilities: []
  })
})

test('Test member equal', () => {
  const member = new Member('1', 'Adam Levine', [], 'Brownas')
  const member2 = new Member('1', 'Adam Levine', [], 'Brownas')

  expect(member.equal(member2)).toBe(true)
})

test('Test member equal with availabilities', () => {
  const availabilities = [new Availability('1', 1719403200000, 1719405000000)]

  const member = new Member('1', 'Adam Levine', availabilities)
  const member2 = new Member('1', 'Adam Levine', availabilities)

  expect(member.equal(member2)).toBe(true)
})
