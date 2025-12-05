import { useEffect, useState } from 'react'
import { io } from 'socket.io-client'

export function useSocket() {
  const [socket, setSocket] = useState(null)
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    // Extract the base URL from VITE_BACKEND_URL (remove /api/v1)
    const backendUrl = import.meta.env.VITE_BACKEND_URL.replace('/api/v1', '')
    
    const socketInstance = io(backendUrl, {
      transports: ['websocket', 'polling']
    })

    socketInstance.on('connect', () => {
      console.log('Connected to Socket.io server')
    })

    socketInstance.on('newRecipe', (recipe) => {
      console.log('New recipe notification:', recipe)
      setNotification(recipe)
      
      // Auto-hide notification after 10 seconds
      setTimeout(() => {
        setNotification(null)
      }, 10000)
    })

    socketInstance.on('disconnect', () => {
      console.log('Disconnected from Socket.io server')
    })

    setSocket(socketInstance)

    return () => {
      socketInstance.disconnect()
    }
  }, [])

  const closeNotification = () => {
    setNotification(null)
  }

  return { socket, notification, closeNotification }
}