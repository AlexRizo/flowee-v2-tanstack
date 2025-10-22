import { DndContainer } from '@/components/boards/DndContainer'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/mis-tareas')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <section className='h-full'>
      <DndContainer />
    </section>
  )
}
