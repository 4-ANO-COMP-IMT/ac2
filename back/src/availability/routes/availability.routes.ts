import { Router } from 'express'

import { HttpRequest } from '../../shared/domain/helpers/http/http_request'
import { CommunicationHandler } from '../modules/communication/communication_handler'
import { UpdateAvailabilitiesPresenter } from '../modules/update_availabilities/update_availabilities_presenter'
import { GetBestAvailabilitiesPresenter } from '../modules/get_best_availabilities/get_best_availabilities_presenter'

export const availabilityRouter = Router()

availabilityRouter.put('/', async (req, res) => {
  const request = new HttpRequest('put', req.body)
  const presenter = new UpdateAvailabilitiesPresenter()
  const response = await presenter.call(request)

  res
    .status(response.status)
    .json({ message: response.message, data: response.data })
})

availabilityRouter.get('/get_best_availability', async (req, res) => {
  const request = new HttpRequest('get', req.body)
  const handler = new GetBestAvailabilitiesPresenter()
  console.log('Got a request to /get_best_availability!')
  const response = await handler.call(request)

  res
    .status(response.status)
    .json({ message: response.message, data: response.data })
})

availabilityRouter.post('/communication', async (req, res) => {
  console.log('Got a request to /communication!')
  const request = new HttpRequest('post', req.body)
  const handler = new CommunicationHandler()
  const response = await handler.call(request)

  res
    .status(response.status)
    .json({ message: response.message, data: response.data })
})
