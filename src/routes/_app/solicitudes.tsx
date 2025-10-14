import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/solicitudes')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_app/solicitudes"!</div>
}
