import { describe, expect, it, test } from 'vitest'

import { CreateEventPresenter } from '../../../../src/event/modules/create_event/create_event_presenter'
import { CreateEventRequest } from '../../../../src/event/modules/create_event/protocols'
import { EventRepositoryMock } from '../../../../src/event/shared/infra/repos/event_repository_mock'
import { HttpRequest } from '../../../../src/shared/domain/helpers/http/http_request'
import { HTTP_STATUS_CODE } from '../../../../src/shared/domain/helpers/http/http_status_code'

test('create event presenter created', async () => {
  const repo = new EventRepositoryMock()
  const presenter = new CreateEventPresenter()
  const request = new HttpRequest('create', {
    name: "Treino Popeye", 
    dates: [1719392400000],
    notEarlier: 32400000,
    notLater: 75600000,  
    description: "Treino apenas de antebraço, para os braços ficarem fortes como os do Popeye"
  })
  const response = await presenter.call(request)

  const eventExpect = {
    id: EventRepositoryMock.events[EventRepositoryMock.events.length - 1].id,
    name: "Treino Popeye", 
    dates: [1719392400000],
    notEarlier: 32400000, 
    notLater: 75600000,  
    members: [],
    description: "Treino apenas de antebraço, para os braços ficarem fortes como os do Popeye"
  }
  expect(response.status).toBe(HTTP_STATUS_CODE.CREATED)
  expect(response.message).toBe('event created')
  expect(response.data).toEqual(eventExpect)
  repo.resetMock()
})

test('create event presenter should return BAD REQUEST if body is missing', async () => {
    const presenter = new CreateEventPresenter()
    const request = new HttpRequest('post', {} as CreateEventRequest)
    const response = await presenter.call(request)
    expect(response.status).toBe(HTTP_STATUS_CODE.BAD_REQUEST)
    expect(response.message).toBe('missing body')
    expect(response.data).toBe(undefined)
})