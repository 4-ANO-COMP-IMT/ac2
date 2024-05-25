import { HttpRequest } from '../../../../src/shared/domain/helpers/http/http_request'
import { EventRepositoryMock } from '../../../../src/event/shared/infra/repos/event_repository_mock'
import { HTTP_STATUS_CODE } from '../../../../src/shared/domain/helpers/http/http_status_code'
import { test, expect } from 'vitest'
import { DeleteEventUsecase } from '../../../../src/event/modules/delete_event/delete_event_usecase'
import { DeleteEventController } from '../../../../src/event/modules/delete_event/delete_event_controller'

test('Test delete event controller without id', async () => {
  const repo = new EventRepositoryMock()
  const usecase = new DeleteEventUsecase(repo)
  const controller = new DeleteEventController(usecase)
  const request = new HttpRequest('delete', {
    id: ''
  })
  const response = await controller.call(request)
  expect(response.status).toBe(HTTP_STATUS_CODE.BAD_REQUEST)
  expect(response.message).toBe('id is required')
  expect(response.data).toBe(undefined)
})

test('Test delete event controller not found', async () => {
  const repo = new EventRepositoryMock()
  const usecase = new DeleteEventUsecase(repo)
  const controller = new DeleteEventController(usecase)
  const request = new HttpRequest('delete', { id: '4' })
  const response = await controller.call(request)
  expect(response.status).toBe(404)
  expect(response.message).toBe('event not found')
  expect(response.data).toBe(undefined)
})

test('Test delete event controller found', async () => {
  const repo = new EventRepositoryMock()
  const usecase = new DeleteEventUsecase(repo)
  const controller = new DeleteEventController(usecase)
  const request = new HttpRequest('delete', { id: '2' })
  const response = await controller.call(request)
  const eventExpect = {
    id: '2',
    name: 'Academy Chest Day',
    start_date: 1632950200000,
    end_date: 1632954000000,
    time_interval: 300000
  }
  expect(response.status).toBe(200)
  expect(response.message).toBe('event deleted')
  expect(response.data).toEqual(eventExpect)
  repo.resetMock()
})
