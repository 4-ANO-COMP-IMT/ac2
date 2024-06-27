import { describe, expect, it, test } from 'vitest'

import { CreateEventController } from '../../../../src/event/modules/create_event/create_event_controller'
import { CreateEventUsecase } from '../../../../src/event/modules/create_event/create_event_usecase'
import { CreateEventRequest } from '../../../../src/event/modules/create_event/protocols'
import { EventRepositoryMock } from '../../../../src/event/shared/infra/repos/event_repository_mock'
import { HttpRequest } from '../../../../src/shared/domain/helpers/http/http_request'
import { HTTP_STATUS_CODE } from '../../../../src/shared/domain/helpers/http/http_status_code'

test('create event controller created', async () => {
  const repo = new EventRepositoryMock()
  const usecase = new CreateEventUsecase(repo)
  const controller = new CreateEventController(usecase)
  const request = new HttpRequest('create', {
    name: 'Academy Chest Day',
    dates: [1719781200000],
    notEarlier: 1632950200000,
    notLater: 1632954000000
  })
  const response = await controller.call(request)
  const eventExpect = {
    id: '4',
    name: 'Academy Chest Day',
    dates: [1719781200000],
    notEarlier: 1632950200000,
    notLater: 1632954000000
  }
  expect(response.status).toBe(HTTP_STATUS_CODE.CREATED)
  expect(response.message).toBe('event created')
  expect(response.data).toEqual(eventExpect)
})

describe('create event controller body', () => {
  it('should return BAD REQUEST if body is missing', async () => {
    const repo = new EventRepositoryMock()
    const usecase = new CreateEventUsecase(repo)
    const controller = new CreateEventController(usecase)
    const request = new HttpRequest('create', {} as CreateEventRequest)
    const response = await controller.call(request)
    expect(response.status).toBe(HTTP_STATUS_CODE.BAD_REQUEST)
    expect(response.message).toBe('missing body')
    expect(response.data).toBe(undefined)
  })

  it('should return BAD REQUEST if name is missing', async () => {
    const repo = new EventRepositoryMock()
    const usecase = new CreateEventUsecase(repo)
    const controller = new CreateEventController(usecase)
    const request = new HttpRequest('create', {
      name: '',
      dates: [1719781200000],
      notEarlier: 1632950200000,
      notLater: 1632954000000
    })
    const response = await controller.call(request)
    expect(response.status).toBe(HTTP_STATUS_CODE.BAD_REQUEST)
    expect(response.message).toBe('missing name')
    expect(response.data).toBe(undefined)
  })

  it('should return BAD REQUEST if dates is missing', async () => {
    const repo = new EventRepositoryMock()
    const usecase = new CreateEventUsecase(repo)
    const controller = new CreateEventController(usecase)
    const request = new HttpRequest('create', {
      name: 'Academy Chest Day',
      dates: [],
      notEarlier: 1632950200000,
      notLater: 1632954000000
    })
    const response = await controller.call(request)
    expect(response.status).toBe(HTTP_STATUS_CODE.BAD_REQUEST)
    expect(response.message).toBe('missing name')
    expect(response.data).toBe(undefined)
  })

  it('should return BAD REQUEST if notEarlier is missing', async () => {
    const repo = new EventRepositoryMock()
    const usecase = new CreateEventUsecase(repo)
    const controller = new CreateEventController(usecase)
    const request = new HttpRequest('create', {
      name: 'Academy Chest Day',
      dates: [1719781200000],
      notEarlier: 0,
      notLater: 1632954000000
    })
    const response = await controller.call(request)
    expect(response.status).toBe(HTTP_STATUS_CODE.BAD_REQUEST)
    expect(response.message).toBe('missing notEarlier')
    expect(response.data).toBe(undefined)
  })

  it('should return BAD REQUEST if notLater is missing', async () => {
    const repo = new EventRepositoryMock()
    const usecase = new CreateEventUsecase(repo)
    const controller = new CreateEventController(usecase)
    const request = new HttpRequest('create', {
      name: 'Academy Chest Day',
      dates: [1719781200000],
      notEarlier: 1632950200000,
      notLater: 0
    })
    const response = await controller.call(request)
    expect(response.status).toBe(HTTP_STATUS_CODE.BAD_REQUEST)
    expect(response.message).toBe('missing notLater')
    expect(response.data).toBe(undefined)
  })
})