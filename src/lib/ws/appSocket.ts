import { env } from '@/env'
import { io, Socket } from 'socket.io-client'

interface WsEvent {
  event: string
  data: any
}

export const appSocket: Socket = io(env.VITE_SOCKET_URL, {
  transports: ['websocket'],
  autoConnect: false,
  withCredentials: true,
})

export const eventsQueue: Array<WsEvent> = []

let lastEmittedEvent: WsEvent | null = null

const originalEmit = appSocket.emit

appSocket.emit = function (event: string, ...args: any[]) {
  if (event !== 'connect' && event !== 'disconnect') {
    lastEmittedEvent = { event, data: args }
  }

  return originalEmit.apply(this, [event, ...args])
}

export const queueFailedEvents = () => {
  if (lastEmittedEvent) {
    console.log('guardando eventos fallidos...')
    eventsQueue.push(lastEmittedEvent)
    lastEmittedEvent = null
  }
}

export const processEventQueue = () => {
  if (eventsQueue.length > 0) {
    console.log('reintentando eventos fallidos...')
    eventsQueue.forEach((event) => {
      originalEmit.apply(appSocket, [event.event, ...event.data])
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
