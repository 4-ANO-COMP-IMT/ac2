import { Router } from 'express'

import { HttpRequest } from '../../shared/domain/helpers/http/http_request'
import { GetSchedulesByEventPresenter } from '../modules/get_schedules_by_event/get_schedules_by_event_presenter'

export const scheduleRouter = Router()

scheduleRouter.get('/eventId=:eventId', async (req, res) => {
  const request = new HttpRequest('get', req.params)
  const presenter = new GetSchedulesByEventPresenter()
  const response = await presenter.call(request)
  res
    .status(response.status)
    .json({ message: response.message, data: response.data })
})
