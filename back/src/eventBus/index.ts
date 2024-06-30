import axios from 'axios'
import cors from 'cors'
import express from 'express'

import { environments } from '../shared/env/environments'

const server = async () => {
  const app = express()

  const PORT = environments.eventBusPort
  const PORT_EVENT = environments.eventPort

  app.use(express.json())

  app.get('/', (req, res) => {
    res.send('API is running! 🦍 🚀')
  })

  app.post('/eventBus', (req, res) => {
    console.log('Listen eventBus!')
    axios.post('http://localhost:' + PORT_EVENT + '/eventBus', req.body)
    res.status(200).send({ msg: 'ok' })
  })

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
  })
}

server()
