import express from 'express'
import cors from 'cors'
import { config } from 'dotenv'

type Event = {
  id: string
  name: string
  startDate: number
  endDate: number
  timeInterval: number
}

const server = async () => {
  config()
  const app = express()

  const PORT = process.env.PORT || 8000

  app.use(express.json())
  app.use(cors())

  app.get('/', (req, res) => {
    res.send('API is running! 🦍 🚀')
  })

  app.get('/event/:id', (req, res) => {
    const id = req.params.id

    const users: Event[] = [
      {
        id: '1',
        name: 'LEG DAY WITHOUT REST',
        startDate: 1632856800000,
        endDate: 1632856800000,
        timeInterval: 60
      },
      {
        id: '2',
        name: 'ESQUEMA PIRAMIDE DO BRANCAS',
        startDate: 1632856800000,
        endDate: 1632856800000,
        timeInterval: 60
      }
    ]

    const event = users.find((event) => event.id === id)

    if (!event) {
      res.status(404).json({ message: 'Event not found' })
    }

    res.status(200).json(event)
  })

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
  })
}

server()
