// Express setup file =========================================================
import express from 'express'

import { recipesRoutes } from './routes/recipes.js'

const app = express()
recipesRoutes(app)

app.get('/', (req, res) => {
  res.send('Hello from Express Live! Nodemon')
})

// Export the app so it can be used in other files ====
export { app }
