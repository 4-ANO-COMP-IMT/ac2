import { Router } from 'express'
import { GetEventPresenter } from '../modules/get_event/get_event_presenter'
import { HttpRequest } from '../../shared/domain/helpers/http/http_request'

export const eventRouter = Router()

eventRouter.get('/:id', async (req, res) => {
  const presenter = new GetEventPresenter()
  const response = await presenter.call(new HttpRequest('get', req.params))
  res
    .status(response.status)
    .json({ message: response.message, data: response.data })
})
