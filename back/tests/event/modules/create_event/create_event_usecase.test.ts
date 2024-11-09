import { expect, test } from 'vitest'

import { CreateEventUsecase } from '../../../../src/event/modules/create_event/create_event_usecase'
import { EventRepositoryMock } from '../../../../src/event/shared/infra/repos/event_repository_mock'
import { Event } from '../../../../src/shared/domain/entities/event'

test('post event usecase created', async () => {
  const repo = new EventRepositoryMock()
  const lengthBefore = EventRepositoryMock.events.length
  const usecase = new CreateEventUsecase(repo)
  const event = await usecase.call(
    'Treino Popeye',
    [1719392400000],
    32400000,
    75600000,
    'Treino apenas de antebraço, para os braços ficarem fortes como os do Popeye'
  )

  expect(event).toBeInstanceOf(Event)
  expect(event.name).toBe('Treino Popeye')
  expect(event.dates).toStrictEqual([1719392400000])
  expect(event.notEarlier).toBe(32400000)
  expect(event.notLater).toBe(75600000)
  expect(event.description).toBe(
    'Treino apenas de antebraço, para os braços ficarem fortes como os do Popeye'
  )
  expect(EventRepositoryMock.events.length).toBe(lengthBefore + 1)
  expect(EventRepositoryMock.events[lengthBefore]).toEqual(event)
  repo.resetMock()
})
