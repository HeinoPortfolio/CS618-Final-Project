// Express setup file =========================================================
import express from 'express'

const app = express()

app.get('/', (req, res) => {
  res.send('Hello from Express Live! nnbnbnbnnbn')
})

// Export the app so it can be used in other files ====
export { app }
