import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/tareas/nueva/ecommerce')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_app/tareas/nueva/ecommerce"!</div>
}
