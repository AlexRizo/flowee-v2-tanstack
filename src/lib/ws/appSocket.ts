import { env } from '@/env'
import { io, Socket } from 'socket.io-client'

export const appSocket: Socket = io(env.VITE_SOCKET_URL, {
  transports: ['websocket'],
  autoConnect: true,
})

export const connectAppSocket = () => {
  if (!appSocket.connected) {
    appSocket.connect()
  }
}

export const disconnectAppSocket = () => {
  if (appSocket.connected) {
    appSocket.disconnect()
  }
}
