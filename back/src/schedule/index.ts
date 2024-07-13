import cors from 'cors'
import express from 'express'

import { environments } from '../shared/env/environments'
import { scheduleRouter } from './routes/schedule.routes'

const server = async () => {
  const PORT = environments.eventPort

  const app = express()
  app.use(express.json())
  app.use(cors())

  app.use('/schedule', scheduleRouter)

  app.get('/', (req, res) => {
    res.send('API Schedule is running! 🦍 🚀')
  })

  app.listen(PORT, () => {
    console.log(`Schedule is running on port ${PORT}`)
  })

}

server()
