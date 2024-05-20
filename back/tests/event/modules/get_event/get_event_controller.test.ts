import { EventRepositoryMock } from '../../../../src/event/shared/infra/repos/event_repository_mock'
import { GetEventUsecase } from '../../../../src/event/modules/get_event/get_event_usecase'
import { GetEventController } from '../../../../src/event/modules/get_event/get_event_controller'
import { httpStatusCode } from '../../../../src/shared/domain/helpers/http'
import { test, expect } from 'vitest'

test('Test get event controller without id', async () => {
  const repo = new EventRepositoryMock()
  const usecase = new GetEventUsecase(repo)
  const controller = new GetEventController(usecase)
  const response = await controller.call({
    params: {
      id: ''
    }
  })
  expect(response.status).toBe(httpStatusCode.BAD_REQUEST)
  expect(response.message).toBe('id is undefined')
  expect(response.event).toBe(undefined)
})

test('Test get event controller not found', async () => {
  const repo = new EventRepositoryMock()
  const usecase = new GetEventUsecase(repo)
  const controller = new GetEventController(usecase)
  const response = await controller.call({ params: { id: '4' } })
  expect(response.status).toBe(404)
  expect(response.message).toBe('event not found')
  expect(response.event).toBe(undefined)
})

test('Test get event controller found', async () => {
  const repo = new EventRepositoryMock()
  const usecase = new GetEventUsecase(repo)
  const controller = new GetEventController(usecase)
  const response = await controller.call({ params: { id: '2' } })
  const eventExpect = (await repo.getEvent('2'))?.toJson()
  expect(response.status).toBe(200)
  expect(response.message).toBe('event found')
  expect(response.event).toEqual(eventExpect)
})
