import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/tableros/$tablero')({
  component: Tablero,
})

function Tablero() {
  return <div>Hello "/_app/tableros/$exam"!</div>
}
