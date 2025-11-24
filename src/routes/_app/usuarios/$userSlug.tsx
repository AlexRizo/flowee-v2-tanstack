import { BoardCard } from '@/components/boards/grid/BoardCard'
import { NotFoundPage } from '@/components/errors/404'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import { AssignBoardToUserDialog } from '@/components/users/dialogs/AssignBoardToUserDialog'
import { UserProp } from '@/components/users/UserProp'
import { getUserRole } from '@/helpers/user'
import { getUserBoards } from '@/lib/api/boards'
import { getUser } from '@/lib/api/users'
import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { AtSign, Grid2X2Plus, Mail, ShieldUser } from 'lucide-react'
import { useEffect } from 'react'
import { toast } from 'sonner'

export const Route = createFileRoute('/_app/usuarios/$userSlug')({
  component: RouteComponent,
  loader: async ({ params, context }) => {
    const user = await context.queryClient.fetchQuery({
      queryKey: ['user', params.userSlug],
      queryFn: () => getUser(params.userSlug),
    })

    return { user }
  },
  errorComponent: NotFoundPage,
})

function RouteComponent() {
  const { user } = Route.useLoaderData()

  const {
    data: boards,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ['boards', user.id],
    queryFn: () => getUserBoards(user.id),
    retry: false,
    staleTime: 1000 * 60 * 5,
  })

  useEffect(() => {
    if (isError) {
      toast.error(error?.message)
    }
  }, [isError, error, boards])

  return (
    <section className="w-full max-w-3xl mx-auto ">
      <div role="heading" className="flex gap-4">
        <img
          src={user.avatar ?? '/dashboard/user/default-avatar.webp'}
          alt="Avatar"
          className="size-32 rounded-full"
        />
        <article>
          <h1 className="text-4xl font-bold">{user.name}</h1>
          <UserProp text={user.email}>
            <Mail size={20} />
          </UserProp>
          <UserProp text={user.username}>
            <AtSign size={20} />
          </UserProp>
          <UserProp text={getUserRole(user.role)}>
            <ShieldUser size={20} />
          </UserProp>
        </article>
      </div>
      <div className="grid grid-cols-3 gap-4 mt-8">
        <div className="bg-neutral-100 px-4 py-6 rounded-2xl text-center shadow">
          <h2 className="font-medium">Tareas resueltas</h2>
          <p>{500}</p>
        </div>
        <div className="bg-neutral-100 px-4 py-6 rounded-2xl text-center shadow">
          <h2 className="font-medium">Tareas Pendientes</h2>
          <p>{500}</p>
        </div>
        <div className="bg-neutral-100 px-4 py-6 rounded-2xl text-center shadow">
          <h2 className="font-medium">Tareas en Proceso</h2>
          <p>{500}</p>
        </div>
      </div>
      <div className="mt-8">
        <div className="flex justify-between items-center my-3">
          <h1 className="text-2xl font-semibold">Tableros</h1>
          <AssignBoardToUserDialog targetId={user.id}>
            <Button>
              <Grid2X2Plus />
              Asignar Tablero
            </Button>
          </AssignBoardToUserDialog>
        </div>
        <div className="grid grid-cols-3 gap-4 p-4 bg-neutral-100 rounded">
          {isPending ? (
            <div className="flex items-center justify-center gap-2 text-neutral-500 text-sm">
              <Spinner />
              <p>Cargando tableros...</p>
            </div>
          ) : boards?.length ? (
            boards.map((board) => <BoardCard key={board.id} {...board} />)
          ) : (
            <small className="text-neutral-500 text-center">
              No hay tableros asignados.
            </small>
          )}
        </div>
      </div>
    </section>
  )
}
