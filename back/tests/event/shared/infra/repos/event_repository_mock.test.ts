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

describe('Test get event', () => {
    it('Test get event', async () => {
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
        const event = await repo.getEvent(EventRepositoryMock.events[lengthAfter - 1].id)
        expect(event.toJson()).toStrictEqual(EventRepositoryMock.events[lengthAfter - 1].toJson())

        repo.resetMock()
    })

    // it('Test get event not found', () => {
    //     const repo = new EventRepositoryMock()
    //     expect(async () => {
    //         await repo.getEvent("123")
    //     }).toThrowError('Event not found for eventId: 123')

    //     repo.resetMock()
    // })
})

