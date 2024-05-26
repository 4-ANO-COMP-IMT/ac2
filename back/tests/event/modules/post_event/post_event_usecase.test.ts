import { expect, test } from 'vitest'

import { PostEventUsecase } from '../../../../src/event/modules/post_event/post_event_usecase'
import { EventRepositoryMock } from '../../../../src/event/shared/infra/repos/event_repository_mock'
import { Event } from '../../../../src/shared/domain/entities/event'

test('post event usecase created', async () => {
  const repo = new EventRepositoryMock()
  const usecase = new PostEventUsecase(repo)
  const event = await usecase.call(
    'Academy Chest Day',
    1632950200000,
    1632954000000,
    300000
  )

  expect(event).toBeInstanceOf(Event)
  expect(event?.id).toBe('4')
  expect(event?.name).toBe('Academy Chest Day')
  expect(event?.startDate).toBe(1632950200000)
  expect(event?.endDate).toBe(1632954000000)
  expect(event?.timeInterval).toBe(300000)
  expect(EventRepositoryMock.events.length).toBe(4)
  expect(EventRepositoryMock.events[3]).toEqual(event)
  repo.resetMock()
})
