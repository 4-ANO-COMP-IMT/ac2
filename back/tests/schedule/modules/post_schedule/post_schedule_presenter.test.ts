import { describe, expect, it, test } from 'vitest'

import { PostSchedulePresenter } from '../../../../src/schedule/modules/post_schedule/post_schedule_presenter'
import { ScheduleRepositoryMock } from '../../../../src/schedule/shared/infra/repos/schedule_repository_mock'
import { HttpRequest } from '../../../../src/shared/domain/helpers/http/http_request'
import { HTTP_STATUS_CODE } from '../../../../src/shared/domain/helpers/http/http_status_code'

test('post schedule presenter created', async () => {
  const repo = new ScheduleRepositoryMock()
  const presenter = new PostSchedulePresenter()
  const request = new HttpRequest('post', {
    eventId: '1',
    time: 1632940200000,
    name: 'Soller'
  })
  const response = await presenter.call(request)

  const scheduleExpect = {
    // cant use id because it is generated
    event_id: '1',
    time: 1632940200000,
    name: 'Soller'
  }
  expect(response.status).toBe(HTTP_STATUS_CODE.CREATED)
  expect(response.message).toBe('schedule created')
  expect(response.data).contain(scheduleExpect)
})
