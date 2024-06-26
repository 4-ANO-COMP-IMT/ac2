// import { expect, test } from 'vitest'

// import { DeleteEventPresenter } from '../../../../src/event/modules/delete_event/delete_event_presenter'
// import { EventRepositoryMock } from '../../../../src/event/shared/infra/repos/event_repository_mock'
// import { HttpRequest } from '../../../../src/shared/domain/helpers/http/http_request'

// test('Test delete event presenter found', async () => {
//   const repo = new EventRepositoryMock()
//   const presenter = new DeleteEventPresenter()
//   const request = new HttpRequest('delete', { id: '2' })
//   const response = await presenter.call(request)
//   const eventExpect = {
//     id: '2',
//     name: 'Academy Chest Day',
//     start_date: 1632950200000,
//     end_date: 1632954000000,
//     time_interval: 300000
//   }
//   expect(response.status).toBe(200)
//   expect(response.message).toBe('event deleted')
//   expect(response.data).toEqual(eventExpect)
//   repo.resetMock()
// })

// test('Test delete event presenter not found', async () => {
//   const presenter = new DeleteEventPresenter()
//   const request = new HttpRequest('delete', { id: '4' })
//   const response = await presenter.call(request)
//   expect(response.status).toBe(404)
//   expect(response.message).toBe('event not found')
//   expect(response.data).toBe(undefined)
// })
