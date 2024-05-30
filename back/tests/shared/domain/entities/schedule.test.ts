import { expect, test } from 'vitest'

import { Schedule } from '../../../../src/shared/domain/entities/schedule'

test('Test schedule', () => {
  const schedule = new Schedule('1', '1', 1632950400000, 'Schedule Name')

  expect(schedule.id).toBe('1')
  expect(schedule.eventId).toBe('1')
  expect(schedule.time).toBe(1632950400000)
  expect(schedule.name).toBe('Schedule Name')
})
