// Express setup file =========================================================
import express from 'express'
import { recipesRoutes } from './routes/recipes.js'
import bodyParser from 'body-parser'

const app = express()
app.use(bodyParser.json())

recipesRoutes(app)

app.get('/', (req, res) => {
  res.send('Hello from Express Live! Nodemon')
})

// Export the app so it can be used in other files ====
export { app }
