import { expect, test } from 'vitest'

import { EventRepositoryMock } from '../../../../src/event/shared/infra/repos/event_repository_mock'
import { HTTP_STATUS_CODE } from '../../../../src/shared/domain/helpers/http/http_status_code'
import { HttpRequest } from '../../../../src/shared/domain/helpers/http/http_request'
import { ScheduleRepositoryMock } from '../../../../src/schedule/shared/infra/repos/schedule_repository_mock'
import { GetSchedulesByEventUsecase } from '../../../../src/schedule/modules/get_schedules_by_event/get_schedules_by_event_usecase'
import { GetSchedulesByEventController } from '../../../../src/schedule/modules/get_schedules_by_event/get_schedules_by_event_controller'

test('Test get schedule by event controller without eventId', async () => {
  const repo = new ScheduleRepositoryMock()
  const usecase = new GetSchedulesByEventUsecase(repo)
  const controller = new GetSchedulesByEventController(usecase)
  const request = new HttpRequest('get', { eventId: '' })
  const response = await controller.call(request)
  expect(response.status).toBe(HTTP_STATUS_CODE.BAD_REQUEST)
  expect(response.message).toBe('eventId is required')
  expect(response.data).toBe(undefined)
})

test('Test get schedule by event controller returns an object', async () => {
  const repo = new ScheduleRepositoryMock()
  const usecase = new GetSchedulesByEventUsecase(repo)
  const controller = new GetSchedulesByEventController(usecase)
  const request = new HttpRequest('get', { eventId: '2' })
  const response = await controller.call(request)
  expect(response.status).toBe(HTTP_STATUS_CODE.OK)
  expect(response.message).toBe('schedules found')
  expect(response.data).toBeTypeOf('object')
})
