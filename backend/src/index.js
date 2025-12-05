import dotenv from 'dotenv'
dotenv.config()
import http from 'http'
import { app } from './app.js'
import { initDatabase } from './db/init.js'
import { initializeSocket } from './socket.js'

const PORT = process.env.PORT || 3000

const httpServer = http.createServer(app)

// Initialize Socket.io
initializeSocket(httpServer)

try {
  await initDatabase()
  httpServer.listen(PORT, () => {
    console.log(`express server running on http://localhost:${PORT}`)
  })
} catch (err) {
  console.error('error connecting to database:', err)
}

