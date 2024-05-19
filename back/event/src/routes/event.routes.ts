import { Router } from 'express'
import { GetEventPresenter } from '../modules/get_event/get_event_presenter'

export const eventRouter = Router()

eventRouter.get('/:id', async (req, res) => {
  const controller = new GetEventPresenter()
  const response = await controller.call(req)
  console.log('aq')
  res
    .status(response.status)
    .json({ message: response.message, data: response.event })
})
