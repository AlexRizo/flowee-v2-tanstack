import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/tareas/nueva/impresa')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_app/tareas/nueva/impresa"!</div>
}
