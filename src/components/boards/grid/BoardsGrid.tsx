import type { Board } from '@/lib/api/interfaces/boards.interface'
import { BoardCard } from './BoardCard'

interface Props {
  boards: Board[]
}

export const BoardsGrid = ({ boards }: Props) => {
  return (
    <div
      role="grid"
      className="mt-4 gird grid-cols-[repeat(auto-fit,_minmax(150px,_1fr))] gap-10"
    >
      {boards.map((board) => (
        <BoardCard key={board.id} {...board} />
      ))}
    </div>
  )
}
