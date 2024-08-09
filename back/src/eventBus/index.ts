import axios from 'axios'
import cors from 'cors'
import express from 'express'

import { environments } from '../shared/env/environments'

const server = async () => {
  const app = express()

  const PORT = environments.eventBusPort
  const PORT_EVENT = environments.eventPort
  const PORT_MEMBER = environments.memberPort

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

  app.post('/communication', async (req, res) => {
    /*
      check the type of the request, the route and send it to the correct service
      body: {
        mss: string (event, member, availability),
        type: string (getEvent, updateMember, ...),
        params: {
          ...
        }
      }
    */
    let response = null
    let port = null
    if (req.body.mss === 'all') {
      try {
        response = await axios.post(
          'http://localhost:' + PORT_EVENT + '/communication',
          req.body
        )
      } catch (error) {
        console.log('Event MSS is off')
      }
      try {
        response = await axios.post(
          'http://localhost:' + PORT_MEMBER + '/communication',
          req.body
        )
      } catch (error) {
        console.log(error)
        console.log('Member MSS is off')
      }
      // try{
      //   response = await axios.post(
      //    'http://localhost:' + PORT_AVAILABILITY + '/communication',
      //    req.body
      //   )
      // }
      // catch{
      //   console.log('Availability MSS is off')
      // }
      res.status(200).send('ok')
    } else {
      try {
        if (req.body.mss === 'event') {
          port = PORT_EVENT
        } else if (req.body.mss === 'member') {
          port = PORT_MEMBER
          // } else if (req.body.mss === 'availability') {
          //   port = PORT_AVAILABILITY
        } else {
          console.log(req.body)
          console.log('Invalid request!')
          res.status(500).send({ msg: 'Invalid MSS' })
        }
        response = await axios.post(
          'http://localhost:' + port + '/communication',
          req.body
        )
        res.status(response.status).send(response.data)
      } catch {
        console.log('Invalid request! 1')
        res.status(500).send({ msg: 'MSS is off' })
      }
    }
  })
}

server()
