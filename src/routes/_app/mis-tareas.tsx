import { DndContainer } from '@/components/boards/board/DndContainer'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/mis-tareas')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <section className='h-full mx-auto'>
      <DndContainer />
    </section>
  )
}
