import { expect, test } from 'vitest'

import { CreateEventUsecase } from '../../../../src/event/modules/create_event/create_event_usecase'
import { EventRepositoryMock } from '../../../../src/event/shared/infra/repos/event_repository_mock'
import { Event } from '../../../../src/shared/domain/entities/event'

test('post event usecase created', async () => {
  const repo = new EventRepositoryMock()
  const usecase = new CreateEventUsecase(repo)
  const event = await usecase.call(
    'Academy Chest Day',
    [1719781200000],
    1632950200000,
    1632954000000,
    300000
  )

  expect(event).toBeInstanceOf(Event)
  expect(event?.name).toBe('Academy Chest Day')
  expect(event?.dates).toStrictEqual([1719781200000])
  expect(event?.notEarlier).toBe(1632950200000)
  expect(event?.notLater).toBe(1632954000000)
  expect(EventRepositoryMock.events.length).toBe(4)
  expect(EventRepositoryMock.events[3]).toEqual(event)
  repo.resetMock()
})