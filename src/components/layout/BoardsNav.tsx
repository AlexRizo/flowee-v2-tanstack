import { Spinner } from '../ui/spinner'
import { useEffect } from 'react'
import { toast } from 'sonner'
import { useBoardStore } from '@/store/boardStore'
import { cn } from '@/lib/utils'
import { getContrastColor } from '@/helpers/getContrastColor'
import { useBoards } from '@/hooks/useBoards'

export const BoardsNav = () => {
  const { setBoards, selectBoard, selectedBoardId } = useBoardStore()

  const { boards, isBoardsPending, boardsError } = useBoards()

  useEffect(() => {
    if (boardsError) {
      toast.error('Error al cargar los tableros', {
        description: boardsError.message,
      })
    }

    if (boards) {
      setBoards(boards)
    }
  }, [boards])

  if (isBoardsPending) {
    return <Spinner className="absolute left-1/2 -translate-x-1/2" />
  }

  return (
    <div className="border rounded-full p-2 flex gap-2 absolute left-1/2 -translate-x-1/2">
      {boards?.map((board) => (
        <button
          key={board.id}
          className={cn(
            'text-xs font-medium size-7 rounded-full flex items-center justify-center cursor-pointer transition-all',
            selectedBoardId === board.id
              ? 'ring-2 ring-offset-2 ring-indigo-500 animate-tada'
              : 'opacity-70 hover:opacity-100',
            getContrastColor(board.color),
          )}
          style={{ background: board.color }}
          title={board.name}
          onClick={() => selectBoard(board.id)}
        >
          {board.prefix}
        </button>
      ))}
    </div>
  )
}
