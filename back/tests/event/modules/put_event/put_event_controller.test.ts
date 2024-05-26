import { HttpRequest } from '../../../../src/shared/domain/helpers/http/http_request'
import { EventRepositoryMock } from '../../../../src/event/shared/infra/repos/event_repository_mock'
import { HTTP_STATUS_CODE } from '../../../../src/shared/domain/helpers/http/http_status_code'
import { test, expect } from 'vitest'
import { PutEventUsecase } from '../../../../src/event/modules/put_event/put_event_usecase'
import { PutEventController } from '../../../../src/event/modules/put_event/put_event_controller'

test('Test put event controller without id', async () => {
  const repo = new EventRepositoryMock()
  const usecase = new PutEventUsecase(repo)
  const controller = new PutEventController(usecase)
  const request = new HttpRequest('put', {
    id: ''
  })
  const response = await controller.call(request)
  expect(response.status).toBe(HTTP_STATUS_CODE.BAD_REQUEST)
  expect(response.message).toBe('id is required')
  expect(response.data).toBe(undefined)
})

test('Test put event controller not found', async () => {
  const repo = new EventRepositoryMock()
  const usecase = new PutEventUsecase(repo)
  const controller = new PutEventController(usecase)
  const request = new HttpRequest('put', { id: '4' })
  const response = await controller.call(request)
  expect(response.status).toBe(404)
  expect(response.message).toBe('event not found')
  expect(response.data).toBe(undefined)
})

test('Test put event controller found', async () => {
  const repo = new EventRepositoryMock()
  const usecase = new PutEventUsecase(repo)
  const controller = new PutEventController(usecase)
  const request = new HttpRequest('put', { id: '2' })
  const response = await controller.call(request)
  const eventExpect = {
    id: '2',
    name: 'Academy Chest Day',
    start_date: 1632950200000,
    end_date: 1632954000000,
    time_interval: 300000
  }
  expect(response.status).toBe(200)
  expect(response.message).toBe('event changed successfully')
  expect(response.data).toEqual(eventExpect)
  repo.resetMock()
})
