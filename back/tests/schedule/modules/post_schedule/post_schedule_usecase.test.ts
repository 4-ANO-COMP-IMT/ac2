import { expect, test } from 'vitest'
import { ScheduleRepositoryMock } from '../../../../src/schedule/shared/infra/repos/schedule_repository_mock'
import { PostScheduleUsecase } from '../../../../src/schedule/modules/post_schedule/post_schedule_usecase'
import { Schedule } from '../../../../src/shared/domain/entities/schedule'

test('post schedule usecase created', async () => {
  const repo = new ScheduleRepositoryMock()
  const usecase = new PostScheduleUsecase(repo)

  const schedule = await usecase.call(
    '1',
    1632940200000, // 1632940200000 = 29/09/2021 18:30:00 (GMT-3)
    'Soller'
  )

  expect(schedule).toBeInstanceOf(Schedule)
  expect(schedule?.id.length).toBe(36)
  expect(schedule?.eventId).toBe('1')
  expect(schedule?.time).toBe(1632940200000)
  expect(schedule?.name).toBe('Soller')
})
