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
    name: "Treino Popeye", 
    dates: [1719392400000],
    notEarlier: 32400000,
    notLater: 75600000,  
    description: "Treino apenas de antebraço, para os braços ficarem fortes como os do Popeye"
  })
  const response = await controller.call(request)
  const eventExpect = {
    name: "Treino Popeye", 
    dates: [1719392400000],
    notEarlier: 32400000,
    notLater: 75600000,  
    description: "Treino apenas de antebraço, para os braços ficarem fortes como os do Popeye",
    id: EventRepositoryMock.events[EventRepositoryMock.events.length - 1].id,
    members: []
  }
  expect(response.status).toBe(HTTP_STATUS_CODE.CREATED)
  expect(response.message).toBe('event created')
  expect(response.data).toEqual(eventExpect)
})

test('create event controller created without description', async () => {
  const repo = new EventRepositoryMock()
  const usecase = new CreateEventUsecase(repo)
  const controller = new CreateEventController(usecase)
  const request = new HttpRequest('create', {
    name: "Treino Popeye", 
    dates: [1719392400000],
    notEarlier: 32400000,
    notLater: 75600000,  
  })
  const response = await controller.call(request)
  const eventExpect = {
    name: "Treino Popeye", 
    dates: [1719392400000],
    notEarlier: 32400000,
    notLater: 75600000,  
    id: EventRepositoryMock.events[EventRepositoryMock.events.length - 1].id,
    members: []
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
      dates: [1719392400000],
      notEarlier: 32400000,
      notLater: 75600000,  
      description: "Treino apenas de antebraço, para os braços ficarem fortes como os do Popeye"
    } as CreateEventRequest)
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
      name: "Treino Popeye", 
      notEarlier: 32400000,
      notLater: 75600000,  
      description: "Treino apenas de antebraço, para os braços ficarem fortes como os do Popeye"
    } as CreateEventRequest)
    const response = await controller.call(request)
    // expect(response.status).toBe(HTTP_STATUS_CODE.BAD_REQUEST)
    expect(response.message).toBe('missing dates')
    expect(response.data).toBe(undefined)
  })

  it('should return BAD REQUEST if notEarlier is missing', async () => {
    const repo = new EventRepositoryMock()
    const usecase = new CreateEventUsecase(repo)
    const controller = new CreateEventController(usecase)
    const request = new HttpRequest('create', {
      name: "Treino Popeye", 
      dates: [1719392400000],
      notLater: 75600000,  
      description: "Treino apenas de antebraço, para os braços ficarem fortes como os do Popeye"
    } as CreateEventRequest)
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
      name: "Treino Popeye", 
      dates: [1719392400000],
      notEarlier: 32400000,
      description: "Treino apenas de antebraço, para os braços ficarem fortes como os do Popeye"
    } as CreateEventRequest)
    const response = await controller.call(request)
    expect(response.status).toBe(HTTP_STATUS_CODE.BAD_REQUEST)
    expect(response.message).toBe('missing notLater')
    expect(response.data).toBe(undefined)
  })
})

describe('create event controller entity error', async () => {
  it('notEarlier must be before notLater', async () => {
    const repo = new EventRepositoryMock() 
    const usecase = new CreateEventUsecase(repo)
    const controller = new CreateEventController(usecase)
    const request = new HttpRequest('create', {
      name: "Treino Popeye", 
      dates: [1719392400000],
      notEarlier: 75600001,
      notLater: 75600000,  
    })
    const response = await controller.call(request)
    expect(response.status).toBe(HTTP_STATUS_CODE.BAD_REQUEST)
    expect(response.message).toBe('Error in entity Event: notEarlier must be before notLater')
  })

  it('notEarlier must be between 0 and 86400000', async () => {
    const repo = new EventRepositoryMock() 
    const usecase = new CreateEventUsecase(repo)
    const controller = new CreateEventController(usecase)
    const request = new HttpRequest('create', {
      name: "Treino Popeye", 
      dates: [1719392400000],
      notEarlier: -1,
      notLater: 75600000,  
    })
    const response = await controller.call(request)
    expect(response.status).toBe(HTTP_STATUS_CODE.BAD_REQUEST)
    expect(response.message).toBe('Error in entity Event: notEarlier must be between 0 and 86400000')
  })

  it('notLater must be between 0 and 86400000', async () => {
    const repo = new EventRepositoryMock() 
    const usecase = new CreateEventUsecase(repo)
    const controller = new CreateEventController(usecase)
    const request = new HttpRequest('create', {
      name: "Treino Popeye", 
      dates: [1719392400000],
      notEarlier: 75600000,
      notLater: 7560000000000,  
    })
    const response = await controller.call(request)
    expect(response.status).toBe(HTTP_STATUS_CODE.BAD_REQUEST)
    expect(response.message).toBe('Error in entity Event: notLater must be between 0 and 86400000')
  })
})