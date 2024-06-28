import { Router } from 'express'

import { HttpRequest } from '../../shared/domain/helpers/http/http_request'
import { CreateEventPresenter } from '../modules/create_event/create_event_presenter'

export const eventRouter = Router()

eventRouter.post('/', async (req, res) => {
  const request = new HttpRequest('post', req.body)
  const presenter = new CreateEventPresenter()
  const response = await presenter.call(request)
  res
    .status(response.status)
    .json({ message: response.message, data: response.data })
})
