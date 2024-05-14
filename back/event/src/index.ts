import express from 'express'
import cors from 'cors'
import { config } from 'dotenv'

type User = {
  id: number
  name: string
  age: number
}

const server = async () => {
  config()
  const app = express()

  const PORT = process.env.PORT || 3000

  app.use(express.json())
  app.use(cors())

  app.get('/', (req, res) => {
    res.send('API is running! 🦍 🚀')
  })

  app.get('/users', (req, res) => {
    const users: User[] = [
      { id: 1, name: 'John Doe', age: 25 },
      { id: 2, name: 'Jane Doe', age: 26 }
    ]

    res.status(200).json(users)
  })

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
  })
}

server()
