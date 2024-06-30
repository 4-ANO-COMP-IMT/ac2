import { describe, expect, it, test } from 'vitest'

import { PostScheduleController } from '../../../../src/schedule/modules/post_schedule/post_schedule_controller'
import { PostScheduleUsecase } from '../../../../src/schedule/modules/post_schedule/post_schedule_usecase'
import { ScheduleRepositoryMock } from '../../../../src/schedule/shared/infra/repos/schedule_repository_mock'
import { HttpRequest } from '../../../../src/shared/domain/helpers/http/http_request'
import { HTTP_STATUS_CODE } from '../../../../src/shared/domain/helpers/http/http_status_code'

test('post schedule controller created', async () => {
  const repo = new ScheduleRepositoryMock()
  const usecase = new PostScheduleUsecase(repo)
  const controller = new PostScheduleController(usecase)

  const request = new HttpRequest('post', {
    eventId: '1',
    time: 1632940200000,
    name: 'Soller'
  })

  const response = await controller.call(request)
  expect(response.status).toBe(HTTP_STATUS_CODE.CREATED)
  expect(response.message).toBe('schedule created')
  expect(response.data).toBeInstanceOf(Object)
})

describe('post schedule controller body', () => {
  it('should return BAD REQUEST if body is missing', async () => {
    const repo = new ScheduleRepositoryMock()
    const usecase = new PostScheduleUsecase(repo)
    const controller = new PostScheduleController(usecase)
    const request = new HttpRequest('post', {} as any)
    const response = await controller.call(request)
    expect(response.status).toBe(HTTP_STATUS_CODE.BAD_REQUEST)
    expect(response.message).toBe('missing body')
    expect(response.data).toBe(undefined)
  })

  it('should return BAD REQUEST if eventId is missing', async () => {
    const repo = new ScheduleRepositoryMock()
    const usecase = new PostScheduleUsecase(repo)
    const controller = new PostScheduleController(usecase)
    const request = new HttpRequest('post', {
      eventId: '',
      time: 1632940200000,
      name: 'Soller'
    })
    const response = await controller.call(request)
    expect(response.status).toBe(HTTP_STATUS_CODE.BAD_REQUEST)
    expect(response.message).toBe('missing eventId')
    expect(response.data).toBe(undefined)
  })

  it('should return BAD REQUEST if name is missing', async () => {
    const repo = new ScheduleRepositoryMock()
    const usecase = new PostScheduleUsecase(repo)
    const controller = new PostScheduleController(usecase)
    const request = new HttpRequest('post', {
      eventId: '1',
      time: 1632940200000,
      name: ''
    })
    const response = await controller.call(request)
    expect(response.status).toBe(HTTP_STATUS_CODE.BAD_REQUEST)
    expect(response.message).toBe('missing name')
    expect(response.data).toBe(undefined)
  })

  it('should return BAD REQUEST if time is missing', async () => {
    const repo = new ScheduleRepositoryMock()
    const usecase = new PostScheduleUsecase(repo)
    const controller = new PostScheduleController(usecase)
    const request = new HttpRequest('post', {
      eventId: '1',
      time: 0,
      name: 'Soller'
    })
    const response = await controller.call(request)
    expect(response.status).toBe(HTTP_STATUS_CODE.BAD_REQUEST)
    expect(response.message).toBe('missing time')
    expect(response.data).toBe(undefined)
  })
})
