import cors from 'cors'
import { config } from 'dotenv'
import express from 'express'

import { eventRouter } from './routes/event.routes'

const server = async () => {
  config()
  const PORT = process.env.PORT || 3000

  const app = express()
  app.use(express.json())
  app.use(cors())

  app.use('/event', eventRouter)

  app.get('/', (req, res) => {
    res.send('API is running! 🦍 🚀')
  })

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
  })
}

server()
