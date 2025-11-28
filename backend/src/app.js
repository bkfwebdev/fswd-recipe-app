import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import { recipesRoutes } from './db/routes/recipes.js'
import { userRoutes } from './db/routes/users.js'

const app = express()
app.use(cors())
app.use(bodyParser.json())

recipesRoutes(app)
userRoutes(app)

app.get('/', (req, res) => {
  res.send('Hello World from Recipe API!')
})

export { app }
