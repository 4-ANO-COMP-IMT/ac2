import { describe, expect, it, test } from 'vitest'

import { EventRepositoryMock } from '../../../../../src/event/shared/infra/repos/event_repository_mock'
import { Event } from '../../../../../src/shared/domain/entities/event'




test('Test create event', () => {
    const repo = new EventRepositoryMock()
    const lengthBefore = EventRepositoryMock.events.length

    repo.createEvent(
        "Treino Popeye", 
        [1719392400000],
        32400000,
        75600000, 
        "Treino apenas de antebraço, para os braços ficarem fortes como os do Popeye"
    )

    const lengthAfter = EventRepositoryMock.events.length
    expect(lengthAfter).toBe(lengthBefore + 1)
    expect(EventRepositoryMock.events[lengthAfter - 1].name).toBe("Treino Popeye")
    expect(EventRepositoryMock.events[lengthAfter - 1].dates).toStrictEqual([1719392400000])
    expect(EventRepositoryMock.events[lengthAfter - 1].notEarlier).toBe(32400000)
    expect(EventRepositoryMock.events[lengthAfter - 1].notLater).toBe(75600000)
    expect(EventRepositoryMock.events[lengthAfter - 1].description).toBe("Treino apenas de antebraço, para os braços ficarem fortes como os do Popeye")

    repo.resetMock()
})
