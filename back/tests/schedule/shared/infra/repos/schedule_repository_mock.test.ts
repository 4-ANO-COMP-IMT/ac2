import { describe, expect, it, test } from 'vitest'

import { ScheduleRepositoryMock } from '../../../../../src/schedule/shared/infra/repos/schedule_repository_mock'

test('test get schedules by event id', async () => {
  const repo = new ScheduleRepositoryMock()
  const schedules = await repo.getSchedulesByEventId('2')
  expect(schedules.length).toBe(3)
})

test('test create schedule', async () => {
  const repo = new ScheduleRepositoryMock()
  const lenBefore: number = ScheduleRepositoryMock.schedules.length
  const schedule = await repo.createSchedule({
    eventId: '2',
    time: 1632942000000,
    name: 'João'
  })
  const lenAfter: number = ScheduleRepositoryMock.schedules.length
  expect(schedule.id).not.toBeUndefined()
  expect(lenAfter).toBe(lenBefore + 1)
})

test('test delete schedule', async () => {
  const repo = new ScheduleRepositoryMock()
  const lenBefore: number = ScheduleRepositoryMock.schedules.length
  const schedule = await repo.deleteSchedule(
    'ba096c65-bca0-4242-98b1-383e85f6e930'
  )
  const lenAfter: number = ScheduleRepositoryMock.schedules.length
  expect(schedule.id).toBe('ba096c65-bca0-4242-98b1-383e85f6e930')
  expect(lenAfter).toBe(lenBefore - 1)
})
