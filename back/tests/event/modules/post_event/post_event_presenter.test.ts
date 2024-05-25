import { PostEventPresenter } from '../../../../src/event/modules/post_event/post_event_presenter'
import { test, expect, it, describe } from 'vitest'
import { HttpRequest } from '../../../../src/shared/domain/helpers/http/http_request'
import { HTTP_STATUS_CODE } from '../../../../src/shared/domain/helpers/http/http_status_code'
import { EventRepositoryMock } from '../../../../src/event/shared/infra/repos/event_repository_mock'
import { PostEventRequest } from '../../../../src/event/modules/post_event/protocols'

// 1. Foi passado body
// 2. Foi passado name
// 3. Foi passado startDate
// 4. Foi passado endDate
// 5. Foi passado timeInterval

test('post event presenter created', async () => {
  const repo = new EventRepositoryMock()
  const presenter = new PostEventPresenter()
  const request = new HttpRequest('post', {
    name: 'Academy Chest Day',
    startDate: 1632950200000,
    endDate: 1632954000000,
    timeInterval: 300000
  })
  const response = await presenter.call(request)
  console.log(EventRepositoryMock.events)
  console.log(response)
  const eventExpect = {
    id: '4',
    name: 'Academy Chest Day',
    start_date: 1632950200000,
    end_date: 1632954000000,
    time_interval: 300000
  }
  expect(response.status).toBe(HTTP_STATUS_CODE.CREATED)
  expect(response.message).toBe('event created')
  expect(response.data).toEqual(eventExpect)
  repo.resetMock()
})

describe('post event presenter body', () => {
  it('should return BAD REQUEST if body is missing', async () => {
    const presenter = new PostEventPresenter()
    const request = new HttpRequest('post', {} as PostEventRequest)
    const response = await presenter.call(request)
    expect(response.status).toBe(HTTP_STATUS_CODE.BAD_REQUEST)
    expect(response.message).toBe('missing name')
    expect(response.data).toBe(undefined)
  }),
    it('should return BAD REQUEST if name is missing', async () => {
      const presenter = new PostEventPresenter()
      const request = new HttpRequest('post', {
        name: '',
        startDate: 1632950200000,
        endDate: 1632954000000,
        timeInterval: 300000
      })
      const response = await presenter.call(request)
      expect(response.status).toBe(HTTP_STATUS_CODE.BAD_REQUEST)
      expect(response.message).toBe('missing name')
      expect(response.data).toBe(undefined)
    }),
    it('should return BAD REQUEST if startDate is missing', async () => {
      const presenter = new PostEventPresenter()
      const request = new HttpRequest('post', {
        name: 'Academy Chest Day',
        startDate: 0,
        endDate: 1632954000000,
        timeInterval: 300000
      })
      const response = await presenter.call(request)
      expect(response.status).toBe(HTTP_STATUS_CODE.BAD_REQUEST)
      expect(response.message).toBe('missing startDate')
      expect(response.data).toBe(undefined)
    }),
    it('should return BAD REQUEST if endDate is missing', async () => {
      const presenter = new PostEventPresenter()
      const request = new HttpRequest('post', {
        name: 'Academy Chest Day',
        startDate: 1632950200000,
        endDate: 0,
        timeInterval: 300000
      })
      const response = await presenter.call(request)
      expect(response.status).toBe(HTTP_STATUS_CODE.BAD_REQUEST)
      expect(response.message).toBe('missing endDate')
      expect(response.data).toBe(undefined)
    }),
    it('should return BAD REQUEST if timeInterval is missing', async () => {
      const presenter = new PostEventPresenter()
      const request = new HttpRequest('post', {
        name: 'Academy Chest Day',
        startDate: 1632950200000,
        endDate: 1632954000000,
        timeInterval: 0
      })
      const response = await presenter.call(request)
      expect(response.status).toBe(HTTP_STATUS_CODE.BAD_REQUEST)
      expect(response.message).toBe('missing timeInterval')
      expect(response.data).toBe(undefined)
    })
})
