import { env } from '@/env'
import { io, Socket } from 'socket.io-client'

export const appSocket: Socket = io(env.VITE_SOCKET_URL, {
  transports: ['websocket'],
  autoConnect: false,
})

export const connectAppSocket = () => {
  if (!appSocket.connected) {
    console.log('Cliente conectado');
    appSocket.connect()
  }
}

export const disconnectAppSocket = () => {
  if (appSocket.connected) {
    console.log('Cliente desconectado');
    appSocket.close()
  }
}
