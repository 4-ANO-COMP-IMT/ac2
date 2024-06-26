// import { expect, test } from 'vitest'

// import { GetEventUsecase } from '../../../../src/event/modules/get_event/get_event_usecase'
// import { EventRepositoryMock } from '../../../../src/event/shared/infra/repos/event_repository_mock'
// import { Event } from '../../../../src/shared/domain/entities/event'

// test('Test get event usecase found', async () => {
//   const repo = new EventRepositoryMock()
//   const usecase = new GetEventUsecase(repo)
//   const event = await usecase.call('2')

//   expect(event).toBeInstanceOf(Event)
//   expect(event?.id).toBe('2')
//   expect(event?.name).toBe('Academy Chest Day')
//   expect(event?.startDate).toBe(1632950200000)
//   expect(event?.endDate).toBe(1632954000000)
//   expect(event?.timeInterval).toBe(300000)
// })

// test('Test get event usecase not found', () => {
//   const repo = new EventRepositoryMock()
//   const usecase = new GetEventUsecase(repo)
//   expect(async () => {
//     await usecase.call('1001')
//   }).rejects.toThrowError('event not found')
// })
