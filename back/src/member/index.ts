import cors from 'cors'
import express from 'express'

import { environments } from '../shared/env/environments'
import { memberRouter } from './routes/member.routes'

const server = async () => {
  const PORT = environments.memberPort

  const app = express()
  app.use(express.json())
  app.use(cors())

  app.use('/', memberRouter)

  app.get('/', (req, res) => {
    res.send('API is running! 🦍 🚀 SIDIS')
  })

  app.post('/eventBus', (req, res) => {
    console.log('eventBus from EventMSS is listening!')
    res.status(200).send({ msg: 'ok' })
  })

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
  })
}

server()
