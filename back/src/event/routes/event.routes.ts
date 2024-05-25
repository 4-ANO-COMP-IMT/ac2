import { Router } from 'express'
import { HttpRequest } from '../../shared/domain/helpers/http/http_request'
import { GetEventPresenter } from '../modules/get_event/get_event_presenter'
import { PostEventPresenter } from '../modules/post_event/post_event_presenter'

export const eventRouter = Router()

eventRouter.get('/:id', async (req, res) => {
  const request = new HttpRequest('get', req.params)
  const presenter = new GetEventPresenter()
  const response = await presenter.call(request)
  res
    .status(response.status)
    .json({ message: response.message, data: response.data })
})

eventRouter.post('/', async (req, res) => {
  const request = new HttpRequest('post', req.body)
  const presenter = new PostEventPresenter()
  const response = await presenter.call(request)

  res
    .status(response.status)
    .json({ message: response.message, data: response.data })
})
