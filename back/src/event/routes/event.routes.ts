import { Router } from 'express'

import { HttpRequest } from '../../shared/domain/helpers/http/http_request'
import { DeleteEventPresenter } from '../modules/delete_event/delete_event_presenter'
import { GetEventPresenter } from '../modules/get_event/get_event_presenter'
import { PutEventPresenter } from '../modules/put_event/put_event_presenter'
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

eventRouter.put('/:id', async (req, res) => {
  const request = new HttpRequest('put', Object.assign(req.params, req.body))
  const presenter = new PutEventPresenter()
  const response = await presenter.call(request)
  res
    .status(response.status)
    .json({ message: response.message, data: response.data })
})

eventRouter.delete('/:id', async (req, res) => {
  const request = new HttpRequest('delete', req.params)
  const presenter = new DeleteEventPresenter()
  const response = await presenter.call(request)
  res
    .status(response.status)
    .json({ message: response.message, data: response.data })
})

eventRouter.post(
  '/',
  async (
    req: {
      body: {
        name: string
        startDate: number
        endDate: number
        timeInterval: number
      }
    },
    res
  ) => {
    const request = new HttpRequest('post', req.body)
    const presenter = new PostEventPresenter()
    const response = await presenter.call(request)

    res
      .status(response.status)
      .json({ message: response.message, data: response.data })
  }
)
