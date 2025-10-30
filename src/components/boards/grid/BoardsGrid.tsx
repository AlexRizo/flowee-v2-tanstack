import type { Board } from '@/lib/api/interfaces/boards.interface'
import { BoardCard } from './BoardCard'

interface Props {
  boards: Board[]
}

export const BoardsGrid = ({ boards }: Props) => {
  return (
    <div
      role="grid"
      className="mt-4 grid grid-cols-[repeat(auto-fit,_minmax(250px,_1fr))] gap-6"
    >
      {boards.map((board) => (
        <BoardCard key={board.id} {...board} />
      ))}
    </div>
  )
}
