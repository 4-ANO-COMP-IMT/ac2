import express from 'express'
import cors from 'cors'
import { config } from 'dotenv'
import { Event } from './shared/domain/entities/event'
import { GetEventPresenter } from './modules/get_event/get_event_presenter'

const server = async () => {
  config()
  const app = express()
  const PORT = process.env.PORT || 3000
  app.use(express.json())
  app.use(cors())

  app.get('/', (req, res) => {
    res.send('API is running! 🦍 🚀')
  })

  app.get('/event/:id', (req, res) => {
    const response = new GetEventPresenter().call(req)
    res.status(response.status).json({ message: response.message, data: response.event })
  })

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
  })
}

server()
