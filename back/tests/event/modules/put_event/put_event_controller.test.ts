import { expect, test } from 'vitest'

import { PutEventController } from '../../../../src/event/modules/put_event/put_event_controller'
import { PutEventUsecase } from '../../../../src/event/modules/put_event/put_event_usecase'
import { EventRepositoryMock } from '../../../../src/event/shared/infra/repos/event_repository_mock'
import { HttpRequest } from '../../../../src/shared/domain/helpers/http/http_request'
import { HTTP_STATUS_CODE } from '../../../../src/shared/domain/helpers/http/http_status_code'

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

test('Test put event controller missing body', async () => {
  const repo = new EventRepositoryMock()
  const usecase = new PutEventUsecase(repo)
  const controller = new PutEventController(usecase)
  const request = new HttpRequest('put', { id: '4' })
  const response = await controller.call(request)
  expect(response.status).toBe(400)
  expect(response.message).toBe('missing body')
  expect(response.data).toBe(undefined)
})

test('Test put event controller found', async () => {
  const repo = new EventRepositoryMock()
  const usecase = new PutEventUsecase(repo)
  const controller = new PutEventController(usecase)
  const request = new HttpRequest('put', {
    id: '2',
    name: 'Testing UPDATE',
    startDate: 123,
    endDate: 456,
    timeInterval: 12
  })
  const response = await controller.call(request)
  const eventExpect = {
    id: '2',
    name: 'Testing UPDATE',
    start_date: 123,
    end_date: 456,
    time_interval: 12
  }
  expect(response.status).toBe(200)
  expect(response.message).toBe('event changed')
  expect(response.data).toEqual(eventExpect)
  repo.resetMock()
})
