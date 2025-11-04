import { apiGet, apiPost } from './api'
import type { CreateSpecialTaskDTO, Task } from './interfaces/tasks.interface'

export const getTaskByBoard = async (boardId: string) => {
  return await apiGet<Task[]>(`/tasks/board/${boardId}`)
}

export const createSpecialTask = async (newTask: CreateSpecialTaskDTO) => {
  return await apiPost<Task>('/tasks/special', newTask)
}