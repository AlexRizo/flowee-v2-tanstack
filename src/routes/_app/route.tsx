import { Navbar } from '@/components/layout/Navbar'
import { Sidebar } from '@/components/layout/Sidebar'
import { useAuth } from '@/hooks/useAuth'
import { getMe } from '@/lib/api/auth'
import type { AuthUser } from '@/lib/api/interfaces/auth.interface'
import { appSocket, connectAppSocket } from '@/lib/ws/appSocket'
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { useEffect } from 'react'

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
  const { logoutMutate } = useAuth()

  useEffect(() => {
    const logoutHandler = ({ message }: { message: string }) => {
      alert(message)
      logoutMutate()
    }

    appSocket.on('ws-logout', logoutHandler)

    return () => {
      appSocket.off('ws-logout', logoutHandler)
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
