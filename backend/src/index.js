import http from 'http'
import { app } from './app.js'
import { connectToDatabase } from './db/init.js'
import { initializeSocket } from './socket.js'

const PORT = process.env.PORT || 3000

const httpServer = http.createServer(app)

// Initialize Socket.io
initializeSocket(httpServer)

try {
  await connectToDatabase(process.env.DATABASE_URL)
  console.log('successfully connected to database:', process.env.DATABASE_URL)
} catch (err) {
  console.error('error connecting to database:', err)
}

httpServer.listen(PORT, () => {
  console.log(`express server running on http://localhost:${PORT}`)
})
