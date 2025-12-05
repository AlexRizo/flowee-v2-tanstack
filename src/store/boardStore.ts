import type { Board } from '@/lib/api/interfaces/boards.interface'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface BoardState {
  boards: Board[]
  selectedBoardId?: string
  setBoards: (boards: Board[]) => void
  selectBoard: (boardId: string) => void
  clearBoard: () => void
}

export const useBoardStore = create<BoardState>()(
  persist(
    (set) => ({
      boards: [],
      selectedBoardId: undefined,
      setBoards: (boards) => set({ boards }),
      selectBoard: (boardId) => set({ selectedBoardId: boardId }),
      clearBoard: () => set({ boards: [], selectedBoardId: undefined }),
    }),
    { name: 'board-storage' },
  ),
)
