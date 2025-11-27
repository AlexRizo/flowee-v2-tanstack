import { cn } from '@/lib/utils'
import type { FC } from 'react'
import { Spinner } from '../ui/spinner'
import { UserBoardCard } from '../users/profile/UserBoardCard'
import type { Board } from '@/lib/api/interfaces/boards.interface'

interface Props {
  boards: Board[]
  isPending: boolean
  userId: string
}

export const MyBoards: FC<Props> = ({ boards, isPending, userId }) => {
  return (
    <div role="grid" className="mt-8">
      <div role="row" className="flex justify-between items-center my-3">
        <h1 className="text-2xl font-semibold">Tus tableros</h1>
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
