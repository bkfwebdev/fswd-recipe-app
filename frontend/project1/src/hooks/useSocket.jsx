import { useEffect, useState } from 'react'
import { io } from 'socket.io-client'

export function useSocket() {
  const [socket, setSocket] = useState(null)
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    // Extract the base URL from VITE_BACKEND_URL (remove /api/v1)
    const backendUrl = import.meta.env.VITE_BACKEND_URL.replace('/api/v1', '')
    
    console.log('Connecting to Socket.io server at:', backendUrl)
    
    const socketInstance = io(backendUrl, {
      transports: ['polling', 'websocket'],
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionAttempts: 5
    })

    socketInstance.on('connect', () => {
      console.log('✅ Connected to Socket.io server, ID:', socketInstance.id)
    })

    socketInstance.on('connect_error', (error) => {
      console.error('❌ Socket connection error:', error)
    })

    socketInstance.on('newRecipe', (recipe) => {
      console.log('📢 New recipe notification received:', recipe)
      setNotification(recipe)
      // No auto-dismiss - user must manually dismiss or click the link
    })

    socketInstance.on('disconnect', (reason) => {
      console.log('❌ Disconnected from Socket.io server. Reason:', reason)
    })

    setSocket(socketInstance)

    return () => {
      console.log('Cleaning up socket connection')
      socketInstance.disconnect()
    }
  }, [])

  const closeNotification = () => {
    setNotification(null)
  }

  return { socket, notification, closeNotification }
}
