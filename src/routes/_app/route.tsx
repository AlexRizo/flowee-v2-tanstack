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
    <main>
      <section>
        <Outlet />
      </section>
    </main>
  )
}
