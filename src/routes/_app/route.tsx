import { Navbar } from '@/components/layout/Navbar'
import { Sidebar } from '@/components/layout/Sidebar'
import { getMe } from '@/lib/api/auth'
import type { AuthUser } from '@/lib/api/interfaces/auth.interface'
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

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

      if (!user)
        throw redirect({
          to: '/auth',
        })

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
  return (
    <main className="flex">
      <Sidebar />
      <section className="flex flex-col flex-1 bg-gray-50">
        <Navbar />
        <div className='container mx-auto p-6'>
          <Outlet />
        </div>
      </section>
    </main>
  )
}
