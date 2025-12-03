import { Navbar } from '@/components/layout/Navbar'
import { Sidebar } from '@/components/layout/Sidebar'
import { useWebSocket } from '@/hooks/useWebSocket'
import { getMe } from '@/lib/api/auth'
import type { AuthUser } from '@/lib/api/interfaces/auth.interface'
import { appSocket, connectAppSocket } from '@/lib/ws/appSocket'
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { useEffect } from 'react'
import { toast } from 'sonner'

export const Route = createFileRoute('/_app')({
  component: RouteComponent,
  beforeLoad: async ({ context }) => {
    try {
      const user =
        context.queryClient.getQueryData<AuthUser>(['auth', 'user']) ??
        (await context.queryClient.fetchQuery({
          queryKey: ['auth', 'user'],
          queryFn: async () => await getMe(),
        }))

      if (!user) {
        throw redirect({
          to: '/auth',
        })
      }

      connectAppSocket()
      return { user }
    } catch (error) {
      context.queryClient.removeQueries({ queryKey: ['auth', 'user'] })
      throw redirect({
        to: '/auth',
      })
    }
  },
})

function RouteComponent() {
  useWebSocket()

  useEffect(() => {
    const notificationHandler = ({ message }: { message: string }) => {
      toast.info('Notification', {
        description: message,
        position: 'top-right',
      })
    }

    const exceptionHandler = (data: { message: string }) => {
      toast.error(data.message)
    }

    appSocket.on('notification', notificationHandler)
    appSocket.on('exception-message', exceptionHandler)

    return () => {
      appSocket.off('notification', notificationHandler)
      appSocket.off('exception-message', exceptionHandler)
    }
  }, [])

  return (
    <main className="flex">
      <Sidebar />
      <section className="flex flex-col flex-1 bg-gray-50">
        <Navbar />
        <div className="container flex flex-1 h-full mx-auto p-6 overflow-auto">
          <Outlet />
        </div>
      </section>
    </main>
  )
}
