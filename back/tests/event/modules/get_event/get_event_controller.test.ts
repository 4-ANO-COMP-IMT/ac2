import { describe, expect, it, test } from 'vitest'

import { EventRepositoryMock } from '../../../../src/event/shared/infra/repos/event_repository_mock'
import { HttpRequest } from '../../../../src/shared/domain/helpers/http/http_request'
import { HTTP_STATUS_CODE } from '../../../../src/shared/domain/helpers/http/http_status_code'
import { GetEventUsecase } from '../../../../src/event/modules/get_event/get_event_usecase'
import { GetEventController } from '../../../../src/event/modules/get_event/get_event_controller'
import { GetEventRequest } from '../../../../src/event/modules/get_event/protocols'

test('get event controller found', async () => {
  const repo = new EventRepositoryMock()
  const usecase = new GetEventUsecase(repo)
  const controller = new GetEventController(usecase)
  const request = new HttpRequest('get', {
    eventId:
      EventRepositoryMock.events[0].id
  })
  const response = await controller.call(request)
  expect(response.status).toBe(HTTP_STATUS_CODE.OK)
  expect(response.message).toBe('event found')
  expect(response.data).toEqual(EventRepositoryMock.events[0].toJson())
})

test('get event controller without body', async () => {
  const repo = new EventRepositoryMock() 
  const usecase = new GetEventUsecase(repo)
  const controller = new GetEventController(usecase)
  const request = new HttpRequest('get', {
  })
  const response = await controller.call(request as HttpRequest<GetEventRequest>)
  expect(response.status).toBe(HTTP_STATUS_CODE.BAD_REQUEST)
  expect(response.message).toBe('missing body')
})

test('get event controller not found', async () => {
  const repo = new EventRepositoryMock() 
  const usecase = new GetEventUsecase(repo)
  const controller = new GetEventController(usecase)
  const request = new HttpRequest('get', {
    eventId:
      '123!'
  })
  const response = await controller.call(request as HttpRequest<GetEventRequest>)
  expect(response.status).toBe(HTTP_STATUS_CODE.NOT_FOUND)
  expect(response.message).toBe('Event not found for eventId: 123!')
})