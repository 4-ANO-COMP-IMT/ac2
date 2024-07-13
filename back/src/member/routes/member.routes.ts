import axios from 'axios'
import { Router } from 'express'

import { HttpRequest } from '../../shared/domain/helpers/http/http_request'
import { environments } from '../../shared/env/environments'
import { CreateEventPresenter } from '../modules/create_member/create_member_presenter'

export const memberRouter = Router()
const PORT_MEMBER_BUS = environments.memberPort

memberRouter.post('/', async (req, res) => {
  const request = new HttpRequest('post', req.body)
  const presenter = new CreateMemberPresenter()
  const response = await presenter.call(request)

  res
    .status(response.status)
    .json({ message: response.message, data: response.data })
})
