import { Button } from '@/components/ui/button'
import { AssignBoardToUserDialog } from '../dialogs/AssignBoardToUserDialog'
import { Grid2X2Plus } from 'lucide-react'
import { Spinner } from '@/components/ui/spinner'
import { UserBoardCard } from './UserBoardCard'
import { cn } from '@/lib/utils'
import type { Board } from '@/lib/api/interfaces/boards.interface'

interface Props {
  boards: Board[]
  isPending: boolean
  userId: string
}

export const UserBoards = ({ boards, isPending, userId }: Props) => {
  return (
    <div role="grid" className="mt-8">
      <div role="row" className="flex justify-between items-center my-3">
        <h1 className="text-2xl font-semibold">Tableros</h1>
        <AssignBoardToUserDialog targetId={userId}>
          <Button>
            <Grid2X2Plus />
            Asignar Tablero
          </Button>
        </AssignBoardToUserDialog>
      </div>
      <div
        role="cell"
        className={cn(
          'gap-4 p-4 bg-neutral-100 rounded',
          boards.length ? 'grid grid-cols-3' : 'grid',
        )}
      >
        {isPending ? (
          <div className="flex items-center justify-center gap-2 text-neutral-500 text-sm">
            <Spinner />
            <p>Cargando tableros...</p>
          </div>
        ) : boards.length ? (
          boards.map((board) => (
            <UserBoardCard key={board.id} {...board} userId={userId} />
          ))
        ) : (
          <small className="text-neutral-500 text-center">
            No hay tableros asignados.
          </small>
        )}
      </div>
    </div>
  )
}
