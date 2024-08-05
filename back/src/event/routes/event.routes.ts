import { Router } from 'express'

import { HttpRequest } from '../../shared/domain/helpers/http/http_request'
import { CreateEventPresenter } from '../modules/create_event/create_event_presenter'
import { CommunicationHandler } from '../modules/communication/communication_handler'

export const eventRouter = Router()

eventRouter.post('/', async (req, res) => {
  const request = new HttpRequest('post', req.body)
  const presenter = new CreateEventPresenter()
  const response = await presenter.call(request)

  res
    .status(response.status)
    .json({ message: response.message, data: response.data })
})

eventRouter.post('/get', async (req, res) => {
  const request = new HttpRequest('post', req.body)
  const handler = new CommunicationHandler()
  const response = await handler.call(request)

  res
    .status(response.status)
    .json({ message: response.message, data: response.data })
})

eventRouter.post('/communication', async (req, res) => {
  const request = new HttpRequest('post', req.body)
  const handler = new CommunicationHandler()
  const response = await handler.call(request)

  res
    .status(response.status)
    .json({ message: response.message, data: response.data })
})