import cors from 'cors'
import express from 'express'

import { environments } from '../shared/env/environments'
import { eventRouter } from './routes/event.routes'
import ServerlessHttp from 'serverless-http'

const server = async () => {
  const PORT = environments.eventPort

  const app = express()
  app.use(express.json())
  app.use(cors())

  app.use('/event', eventRouter)

  app.get('/', (req, res) => {
    res.send('API is running! 🦍 🚀')
  })

  app.post('/eventBus', (req, res) => {
    console.log('eventBus from EventMSS is listening!')
    res.status(200).send({ msg: 'ok' })
  })

  if (environments.stage === 'test') {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`)
    })
  } else {
    module.exports.handler = ServerlessHttp(app)
  }
}

server()
