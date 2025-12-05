import { getBoard } from '@/lib/api/boards'
import { createFileRoute } from '@tanstack/react-router'
import { ApiErrorComponent } from '@/components/errors/ApiErrorComponent'
import { cn } from '@/lib/utils'
import { getContrastColor } from '@/helpers/getContrastColor'

export const Route = createFileRoute('/_app/tableros/$tablero')({
  component: Tablero,
  loader: async ({ params, context }) => {
    const board = await context.queryClient.fetchQuery({
      queryKey: ['board', params.tablero],
      queryFn: () => getBoard(params.tablero),
    })

    return { board }
  },
  errorComponent: ApiErrorComponent,
})

function Tablero() {
  const { board } = Route.useLoaderData()

  return (
    <section className="w-full">
      <div
        role="heading"
        className="w-full max-w-3xl mx-auto p-4"
        style={{ backgroundColor: board.color }}
      >
        <h1 className={cn('text-2xl', getContrastColor(board.color))}>
          <span className="font-semibold">Tablero:</span> {board.name}
        </h1>
      </div>
    </section>
  )
}
