import { app } from './app.js'
//import dotenv from 'dotenv'
//dotenv.config()

const PORT = 3000
// const PORT = process.env.PORT

app.listen(PORT)

console.info(`Express server running on http://localhost:${PORT}`)
