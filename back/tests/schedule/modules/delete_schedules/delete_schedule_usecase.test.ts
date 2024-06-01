import { expect, test } from 'vitest'

import { DeleteScheduleUsecase } from '../../../../src/schedule/modules/delete_schedules_by_event/delete_schedules_usecase'
import { ScheduleRepositoryMock } from '../../../../src/schedule/shared/infra/repos/schedule_repository_mock'
import { Schedule } from '../../../../src/shared/domain/entities/schedule'

test('Test delete schedule usecase found', async () => {
  const repo = new ScheduleRepositoryMock()
  const usecase = new DeleteScheduleUsecase(repo)
  const schedule = await usecase.call('3fde5c12-cfee-46d8-9469-d77de8370739')

  expect(schedule).toBeInstanceOf(Schedule)
  expect(schedule?.id).toBe('3fde5c12-cfee-46d8-9469-d77de8370739')
  expect(schedule?.eventId).toBe('2')
  expect(schedule?.time).toBe(1632942000000)
  expect(schedule?.name).toBe('Flavio')
  repo.resetMock()
})

test('Test delete schedule usecase not found', () => {
  const repo = new ScheduleRepositoryMock()
  const usecase = new DeleteScheduleUsecase(repo)
  expect(async () => {
    await usecase.call('1001')
  }).rejects.toThrowError('schedule not found')
})
