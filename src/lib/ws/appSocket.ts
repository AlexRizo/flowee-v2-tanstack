import { env } from '@/env'
import { io, Socket } from 'socket.io-client'

interface WsEvent {
  event: string
  data: any[]
}

export const appSocket: Socket = io(env.VITE_SOCKET_URL, {
  transports: ['websocket'],
  autoConnect: false,
  withCredentials: true,
})

export const eventsQueue: WsEvent[] = []
let lastEmittedEvent: WsEvent | null = null

const originalEmit = appSocket.emit.bind(appSocket)

appSocket.emit = (event: string, ...args: any[]) => {
  if (event !== 'connect' && event !== 'disconnect') {
    lastEmittedEvent = { event, data: args }
  }

  return originalEmit(event, ...args)
}

export const queueFailedEvents = () => {
  if (lastEmittedEvent) {
    eventsQueue.push(lastEmittedEvent)
    lastEmittedEvent = null
  }
}

export const processEventQueue = () => {
  if (eventsQueue.length > 0) {
    eventsQueue.forEach((ev) => {
      originalEmit(ev.event, ...ev.data)
    })
    eventsQueue.length = 0
  }
}

export const connectAppSocket = () => {
  if (!appSocket.connected) {
    console.log('Cliente conectado')
    appSocket.connect()
  }
}

export const disconnectAppSocket = () => {
  if (appSocket.connected) {
    console.log('Cliente desconectado')
    appSocket.close()
  }
}
