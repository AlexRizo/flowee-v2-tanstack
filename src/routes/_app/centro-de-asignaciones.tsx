import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/centro-de-asignaciones')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_app/centro-de-asignaciones"!</div>
}
