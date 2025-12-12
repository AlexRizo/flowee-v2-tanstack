import type { Task } from '@/lib/api/interfaces/tasks.interface'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface TaskViewStore {
  task: Task | null
  setTask: (task: Task) => void
  clearTask: () => void
}

export const useTaskViewStore = create<TaskViewStore>()(
  persist(
    (set) => ({
      task: null,
      setTask: (task) => set({ task }),
      clearTask: () => set({ task: null }),
    }),
    { name: 'task-view-storage' },
  ),
)
