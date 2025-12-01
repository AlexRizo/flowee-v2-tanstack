import { DndContainer } from '@/components/assignments/dnd/DndContainer'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/centro-de-asignaciones')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <section className="mx-auto w-6xl">
      <h1 className="text-3xl font-medium">Centro de Asignaciones</h1>
      <DndContainer />
    </section>
  )
}
