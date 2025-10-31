import { apiGet } from './api'
import type { Task } from './interfaces/tasks.interface'

export const getTaskByBoard = async (boardId: string) => {
  return await apiGet<Task[]>(`/tasks/board/${boardId}`)
}
