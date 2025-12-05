import { Server } from 'socket.io'

let io = null

export function initializeSocket(httpServer) {
  io = new Server(httpServer, {
    cors: {
      origin: '*', // In production, specify your frontend URL
      methods: ['GET', 'POST']
    }
  })

  io.on('connection', (socket) => {
    console.log('User connected:', socket.id)

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id)
    })
  })

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
    io.emit('newRecipe', {
      id: recipe._id,
      title: recipe.title,
      author: recipe.author,
      createdAt: recipe.createdAt
    })
  }
}