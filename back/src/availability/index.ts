import cors from 'cors'
import express from 'express'

import { environments } from '../shared/env/environments'
import { availabilityRouter } from './routes/availability.routes'

const server = async () => {
  const PORT = environments.availabilityPort

  const app = express()
  app.use(express.json())
  app.use(cors())

  app.use('/', availabilityRouter)

  app.get('/', (req, res) => {
    res.send('API is running! 🚀')
  })

  app.post('/eventBus', (req, res) => {
    console.log('eventBus from AvailabilityMSS is listening!')
    res.status(200).send({ msg: 'ok' })
  })

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
  })
}

server()
