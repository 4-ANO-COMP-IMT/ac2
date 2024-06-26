import cors from 'cors'
import express from 'express'

import { environments } from '../shared/env/environments'
import { eventRouter } from './routes/event.routes'

const server = async () => {
  const PORT = environments.eventPort

  const app = express()
  app.use(express.json())
  app.use(cors())

  app.use('/event', eventRouter)

  app.get('/', (req, res) => {
    res.send('API is running! 🦍 🚀 SIDIS')
  })

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
  })
}

server()
