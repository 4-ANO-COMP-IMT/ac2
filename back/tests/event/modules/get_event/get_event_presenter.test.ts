import { expect, test } from 'vitest'

import { EventRepositoryMock } from '../../../../src/event/shared/infra/repos/event_repository_mock'
import { HttpRequest } from '../../../../src/shared/domain/helpers/http/http_request'
import { HTTP_STATUS_CODE } from '../../../../src/shared/domain/helpers/http/http_status_code'
import { GetEventPresenter } from '../../../../src/event/modules/get_event/get_event_presenter'
import { GetEventRequest } from '../../../../src/event/modules/get_event/protocols'

test('get event presenter ok', async () => {
  const repo = new EventRepositoryMock()
  const presenter = new GetEventPresenter()
  const request = new HttpRequest('get', {
    eventId: EventRepositoryMock.events[0].id
  })
  const response = await presenter.call(request)

  expect(response.status).toBe(HTTP_STATUS_CODE.OK)
  expect(response.message).toBe('event found')
  expect(response.data).toEqual(EventRepositoryMock.events[0].toJson())
  repo.resetMock()
})

test('create event presenter should return BAD REQUEST if body is missing', async () => {
  const repo = new EventRepositoryMock()
  const presenter = new GetEventPresenter()
  const request = new HttpRequest('get', {
  })
  const response = await presenter.call(request as HttpRequest<GetEventRequest>)

  expect(response.status).toBe(HTTP_STATUS_CODE.BAD_REQUEST)
  expect(response.message).toBe('missing body')
  expect(response.data).toEqual(undefined)
  repo.resetMock()
})

test('create event presenter should return NOT FOUND if eventId does not exists', async () => {
  const repo = new EventRepositoryMock()
  const presenter = new GetEventPresenter() 
  const request = new HttpRequest('get', {
    eventId: "123!"
  })
  const response = await presenter.call(request as HttpRequest<GetEventRequest>)

  expect(response.status).toBe(HTTP_STATUS_CODE.NOT_FOUND)
  expect(response.message).toBe('Event not found for eventId: 123!')
  expect(response.data).toEqual(undefined)
  repo.resetMock()
})
