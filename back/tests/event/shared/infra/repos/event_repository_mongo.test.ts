import { test } from 'vitest'
import { EventRepositoryMongo } from '../../../../../src/event/shared/infra/repos/event_repository_Mongo'

test('Test create event', async () => {
  const repo = new EventRepositoryMongo()

  const event = await repo.createEvent(
    'Treino Popeye',
    [1719392400000],
    32400000,
    75600000,
    'Treino apenas de antebraço, para os braços ficarem fortes como os do Popeye'
  )
})
