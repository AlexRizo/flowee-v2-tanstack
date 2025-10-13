import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/mis-tareas')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_app/mis-tareas"!</div>
}
