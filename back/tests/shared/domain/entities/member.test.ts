import { expect, test } from 'vitest'

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

test('Test member toJson', () => {
  const member = new Member('1', 'Adam Levine', [], 'Brownas')

  expect(member.toJson()).toEqual({
    id: '1',
    name: 'Adam Levine',
    password: 'Brownas',
    availabilities: []
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
