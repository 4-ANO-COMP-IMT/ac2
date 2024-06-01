import { expect, test } from 'vitest'

import { DeleteScheduleController } from '../../../../src/schedule/modules/delete_schedules_by_event/delete_schedules_controller'
import { DeleteScheduleUsecase } from '../../../../src/schedule/modules/delete_schedules_by_event/delete_schedules_usecase'
import { ScheduleRepositoryMock } from '../../../../src/schedule/shared/infra/repos/schedule_repository_mock'
import { HttpRequest } from '../../../../src/shared/domain/helpers/http/http_request'
import { HTTP_STATUS_CODE } from '../../../../src/shared/domain/helpers/http/http_status_code'

test('Test delete schedule controller without id', async () => {
  const repo = new ScheduleRepositoryMock()
  const usecase = new DeleteScheduleUsecase(repo)
  const controller = new DeleteScheduleController(usecase)
  const request = new HttpRequest('delete', {
    id: ''
  })
  const response = await controller.call(request)
  expect(response.status).toBe(HTTP_STATUS_CODE.BAD_REQUEST)
  expect(response.message).toBe('scheduleId is required')
  expect(response.data).toBe(undefined)
})

test('Test delete event controller not found', async () => {
  const repo = new ScheduleRepositoryMock()
  const usecase = new DeleteScheduleUsecase(repo)
  const controller = new DeleteScheduleController(usecase)
  const request = new HttpRequest('delete', {
    id: 'bdea174-7ae8-474b-93be4620bba6'
  })
  const response = await controller.call(request)
  expect(response.status).toBe(HTTP_STATUS_CODE.NOT_FOUND)
  expect(response.message).toBe('schedule not found')
  expect(response.data).toBe(undefined)
})

test('Test delete schedule controller found', async () => {
  const repo = new ScheduleRepositoryMock()
  const usecase = new DeleteScheduleUsecase(repo)
  const controller = new DeleteScheduleController(usecase)
  const request = new HttpRequest('delete', {
    id: '3fde5c12-cfee-46d8-9469-d77de8370739'
  })
  const response = await controller.call(request)
  const scheduleExpect = {
    time: 1632942000000,
    id: '3fde5c12-cfee-46d8-9469-d77de8370739',
    event_id: '2',
    name: 'Flavio'
  }
  expect(response.status).toBe(HTTP_STATUS_CODE.OK)
  expect(response.message).toBe('schedule deleted')
  expect(response.data).toEqual(scheduleExpect)
  repo.resetMock()
})
