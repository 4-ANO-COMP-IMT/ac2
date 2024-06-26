// import { expect, test } from 'vitest'

// import { PutEventPresenter } from '../../../../src/event/modules/put_event/put_event_presenter'
// import { HttpRequest } from '../../../../src/shared/domain/helpers/http/http_request'

// test('Test put event presenter', async () => {
//   const presenter = new PutEventPresenter()
//   const request = new HttpRequest('put', {
//     id: '2',
//     name: 'Academy',
//     startDate: 123,
//     endDate: 678,
//     timeInterval: 12
//   })
//   const response = await presenter.call(request)
//   const eventExpect = {
//     id: '2',
//     name: 'Academy',
//     start_date: 123,
//     end_date: 678,
//     time_interval: 12
//   }
//   expect(response.status).toBe(200)
//   expect(response.message).toBe('event changed')
//   expect(response.data).toEqual(eventExpect)
// })

// test('Test get event presenter not found', async () => {
//   const presenter = new PutEventPresenter()
//   const request = new HttpRequest('put', {
//     id: '5',
//     name: 'Academy',
//     startDate: 123,
//     endDate: 678,
//     timeInterval: 12
//   })
//   const response = await presenter.call(request)
//   expect(response.status).toBe(404)
//   expect(response.message).toBe('event not found')
//   expect(response.data).toBe(undefined)
// })

// test('Test get event presenter missing body', async () => {
//   const presenter = new PutEventPresenter()
//   const request = new HttpRequest('put', {
//     id: '5'
//   })
//   const response = await presenter.call(request)
//   expect(response.status).toBe(400)
//   expect(response.message).toBe('missing body')
//   expect(response.data).toBe(undefined)
// })
