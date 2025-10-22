import { getMyBoards } from '@/lib/api/boards'
import type { Board } from '@/lib/api/interfaces/boards.interface'
import { useQuery } from '@tanstack/react-query'
import { Spinner } from '../ui/spinner'
import { useEffect } from 'react'
import { toast } from 'sonner'
import type { ApiError } from '@/lib/api/api'
import { useBoardStore } from '@/store/boardStore'
import { cn } from '@/lib/utils'

export const BoardsNav = () => {
  const {
    setBoards,
    selectBoard,
    selectedBoardId,
  } = useBoardStore()

  const {
    data: boards,
    isPending,
    error,
  } = useQuery<Board[], ApiError>({
    queryKey: ['my-boards'],
    queryFn: getMyBoards,
  })

  useEffect(() => {
    if (error) {
      toast.error('Error al cargar los tableros', {
        description: error.message,
      })
    }

    if (boards) {
      setBoards(boards)
    }
  }, [boards])

  if (isPending) {
    return <Spinner className="absolute left-1/2 -translate-x-1/2" />
  }

  return (
    <div className="border rounded-full p-2 flex gap-2 absolute left-1/2 -translate-x-1/2">
      {boards?.map((board) => (
        <button
          key={board.id}
          className={cn(
            'text-xs text-white font-medium size-7 rounded-full flex items-center justify-center cursor-pointer transition-all',
            selectedBoardId === board.id
              ? 'ring-2 ring-offset-2 ring-indigo-500 animate-tada'
              : 'opacity-70 hover:opacity-100',
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
