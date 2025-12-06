import { Server } from 'socket.io'

let io = null

export function initializeSocket(httpServer) {
  io = new Server(httpServer, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
      credentials: true
    },
    transports: ['polling', 'websocket'],
    allowEIO3: true
  })

  io.on('connection', (socket) => {
    console.log('✅ User connected:', socket.id)

    socket.on('disconnect', () => {
      console.log('❌ User disconnected:', socket.id)
    })
  })

  console.log('Socket.io server initialized')
  return io
}

export function getIO() {
  if (!io) {
    throw new Error('Socket.io not initialized')
  }
  return io
}

export function emitNewRecipe(recipe) {
  if (io) {
    console.log('📢 Emitting new recipe notification:', recipe.title)
    io.emit('newRecipe', {
      id: recipe._id,
      title: recipe.title,
      author: recipe.author,
      createdAt: recipe.createdAt
    })
  }
}
