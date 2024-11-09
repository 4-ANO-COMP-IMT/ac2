import { expect, test } from 'vitest'

import { Availability } from '../../../../src/shared/domain/entities/availability'

test('Test availability', () => {
  const availability = new Availability('1', 1719403200000, 1719405000000)

  expect(availability.id).toBe('1')
  expect(availability.startDate).toBe(1719403200000)
  expect(availability.endDate).toBe(1719405000000)
})


test('Test availability with startDate after endDate', () => {
  expect(() => new Availability('1', 1719405000000, 1719403200000)).toThrow()
})

test('Test availability toJson', () => {
  const availability = new Availability('1', 1719403200000, 1719405000000)

  expect(availability.toJson()).toEqual({
    id: '1',
    startDate: 1719403200000,
    endDate: 1719405000000
  })
})

test('Test availability equal', () => {
  const availability = new Availability('1', 1719403200000, 1719405000000)
  const availability2 = new Availability('1', 1719403200000, 1719405000000)

  expect(availability.equal(availability2)).toBe(true)
})
