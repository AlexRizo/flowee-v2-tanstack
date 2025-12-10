import { DndContainer } from '@/components/requests/DndContainer'
import { isManager } from '@/helpers/protected'
import { createFileRoute, notFound, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/solicitudes')({
  component: RouteComponent,
  beforeLoad: ({ context }) => {
    const user = context.user

    if (!user) return redirect({ to: '/auth' })

    if (!isManager(user.role)) throw notFound()
  },
})

function RouteComponent() {
  return (
    <section className="h-full mx-auto">
      <DndContainer />
    </section>
  )
}
