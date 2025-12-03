import { api } from '@/lib/api/api'
import { appSocket } from '@/lib/ws/appSocket'
import { useEffect } from 'react'
import { toast } from 'sonner'

export const useWebSocket = () => {
  useEffect(() => {
    const handlerAuthError = async (err: any) => {
      if (
        err?.message === 'Unauthorized' ||
        err?.message?.includes('jwt expired')
      ) {
        console.warn('JWT expired... Reconnecting...')
        try {
          if (appSocket.connected) appSocket.disconnect()

          await api.post('/auth/refresh')

          console.log('Reconectado')
          appSocket.connect()
        } catch (error) {
          console.error(error)
          toast.error(
            'No te hemos podido autenticar. Cierra sesión e inicia sesión de nuevo',
          )
        }
      }
    }

    appSocket.on('connect_error', handlerAuthError)
    appSocket.on('exception', handlerAuthError)

    return () => {
      appSocket.off('connect_error', handlerAuthError)
      appSocket.off('exception', handlerAuthError)
    }
  }, [])
}
