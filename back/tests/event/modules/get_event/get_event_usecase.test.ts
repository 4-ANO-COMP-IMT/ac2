import { expect, test } from 'vitest'

import { GetEventUsecase } from '../../../../src/event/modules/get_event/get_event_usecase'
import { EventRepositoryMock } from '../../../../src/event/shared/infra/repos/event_repository_mock'
import { Event } from '../../../../src/shared/domain/entities/event'

test('post event usecase created', async () => {
  const repo = new EventRepositoryMock()
  const lengthBefore = EventRepositoryMock.events.length
  const usecase = new GetEventUsecase(repo)
  const event = await usecase.call(
    EventRepositoryMock.events[0].id 
  )

  expect(event).toBeInstanceOf(Event)
  expect(event.equals(EventRepositoryMock.events[0]))
  repo.resetMock()
})
