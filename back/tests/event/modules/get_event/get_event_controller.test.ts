import { HttpRequest } from './../../../../src/shared/domain/helpers/http/http_request'
import { EventRepositoryMock } from '../../../../src/event/shared/infra/repos/event_repository_mock'
import { GetEventUsecase } from '../../../../src/event/modules/get_event/get_event_usecase'
import { GetEventController } from '../../../../src/event/modules/get_event/get_event_controller'
import { HTTP_STATUS_CODE } from '../../../../src/shared/domain/helpers/http/http_status_code'
import { test, expect } from 'vitest'

test('Test get event controller without id', async () => {
  const repo = new EventRepositoryMock()
  const usecase = new GetEventUsecase(repo)
  const controller = new GetEventController(usecase)
  const request = new HttpRequest('get', { id: '' })
  const response = await controller.call(request)
  expect(response.status).toBe(HTTP_STATUS_CODE.BAD_REQUEST)
  expect(response.message).toBe('id is required')
  expect(response.data).toBe(undefined)
})

test('Test get event controller not found', async () => {
  const repo = new EventRepositoryMock()
  const usecase = new GetEventUsecase(repo)
  const controller = new GetEventController(usecase)
  const request = new HttpRequest('get', { id: '4' })
  const response = await controller.call(request)
  expect(response.status).toBe(404)
  expect(response.message).toBe('event not found')
  expect(response.data).toBe(undefined)
})

test('Test get event controller found', async () => {
  const repo = new EventRepositoryMock()
  const usecase = new GetEventUsecase(repo)
  const controller = new GetEventController(usecase)
  const request = new HttpRequest('get', { id: '2' })
  const response = await controller.call(request)
  const eventExpect = (await repo.getEvent('2'))?.toJson()
  expect(response.status).toBe(200)
  expect(response.message).toBe('event found')
  expect(response.data).toEqual(eventExpect)
})
