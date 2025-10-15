import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/tableros/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_app/tableros/"!</div>
}
