import { Router } from 'express'

import { HttpRequest } from '../../shared/domain/helpers/http/http_request'
import { CreateMemberPresenter } from '../modules/create_member/create_member_presenter'
import { LoginMemberPresenter } from '../modules/login_member/login_member_presenter'
import { CommunicationHandler } from '../modules/communication/communication_handler'

export const memberRouter = Router()

memberRouter.post('/', async (req, res) => {
  const request = new HttpRequest('post', req.body)
  const presenter = new CreateMemberPresenter()
  const response = await presenter.call(request)

  res
    .status(response.status)
    .json({ message: response.message, data: response.data })
})

memberRouter.post('/login', async (req, res) => {
  const request = new HttpRequest('post', req.body)
  const presenter = new LoginMemberPresenter()
  const response = await presenter.call(request)

  res
    .status(response.status)
    .json({ message: response.message, data: response.data })
})

memberRouter.post('/communication', async (req, res) => {
  const request = new HttpRequest('post', req.body)
  const handler = new CommunicationHandler()
  const response = await handler.call(request)

  res
    .status(response.status)
    .json({ message: response.message, data: response.data })
})
