import { expect, test } from 'vitest'

import { GetSchedulesByEventUsecase } from '../../../../src/schedule/modules/get_schedules_by_event/get_schedules_by_event_usecase'
import { ScheduleRepositoryMock } from '../../../../src/schedule/shared/infra/repos/schedule_repository_mock'
import e from 'cors'

test('get schedules by event usecase', async () => {
  const repo = new ScheduleRepositoryMock()
  const usecase = new GetSchedulesByEventUsecase(repo)
  const schedules = await usecase.call('2')

  expect(schedules.length).toBe(3)
  expect(schedules[0].id).toBe('77f361af-7e88-409b-92c0-cdeae2f19399')
  expect(schedules[0].eventId).toBe('2')
  expect(schedules[0].time).toBe(1632940200000)
  expect(schedules[0].name).toBe('Sakamoto')
})
