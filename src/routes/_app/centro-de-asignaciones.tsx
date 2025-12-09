import { DndContainer } from '@/components/assignments/dnd/DndContainer'
import { Error404 } from '@/components/errors/Error404'
import { isManager } from '@/helpers/protected'
import { createFileRoute, notFound, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/centro-de-asignaciones')({
  component: RouteComponent,
  beforeLoad({ context }) {
    const user = context.user

    if (!user) {
      return redirect({ to: '/auth' })
    }

    if (!isManager(user.role)) {
      throw notFound()
    }
  },
  notFoundComponent: () => <Error404/>,
})

function RouteComponent() {
  return (
    <section className="mx-auto w-6xl">
      <h1 className="text-3xl font-medium">Centro de Asignaciones</h1>
      <DndContainer />
    </section>
  )
}
