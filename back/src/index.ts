import express from 'express'
import cors from 'cors'

const app = express()

type User = {
  id: number
  name: string
  age: number
}

const users: User[] = [
  {
    id: 1,
    name: 'vini',
    age: 20
  },
  {
    id: 2,
    name: 'murata',
    age: 21
  },
  {
    id: 3,
    name: 'saka',
    age: 21
  }
]

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('API is running! 🚀')
})

app.get('/users/:id', (req, res) => {
  const id = parseInt(req.params.id)

  const user = users.filter((item) => item.id === id)[0]
  console.log(users.filter((item) => item.id === id))

  if (user) {
    res.send(user).sendStatus(200)
  } else {
    res
      .send({
        message: 'User not found'
      })
      .sendStatus(404)
  }
})

app.listen(3000, () => {
  console.log('Estou escutando a porta 3000')
})
