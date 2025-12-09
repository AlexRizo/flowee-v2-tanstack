import { Error404 } from '@/components/errors/Error404'
import { isAdmin } from '@/helpers/protected'
import {
  createFileRoute,
  notFound,
  Outlet,
  redirect,
} from '@tanstack/react-router'

export const Route = createFileRoute('/_app/usuarios')({
  component: RouteComponent,
  beforeLoad: ({ context }) => {
    const user = context.user

    if (!user) {
      return redirect({ to: '/auth' })
    }

    if (!isAdmin(user.role)) {
      throw notFound()
    }
  },
  notFoundComponent: () => <Error404 />,
})

function RouteComponent() {
  return <Outlet />
}
