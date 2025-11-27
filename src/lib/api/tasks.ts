import { apiGet, apiPost } from './api'
import type { CreateSpecialTaskDTO, Task, UploadTaskFilesDTO } from './interfaces/tasks.interface'

export const getTaskByBoard = async (boardId: string) => {
  return await apiGet<Task[]>(`/tasks/board/${boardId}`)
}

export const getPendingTasks = async (boardId: string) => {
  return await apiGet<Task[]>(`/tasks/board/${boardId}/pending`)
}

export const createSpecialTask = async (newTask: CreateSpecialTaskDTO) => {
  return await apiPost<Task>('/tasks/special', newTask)
}

export const uploadTaskFiles = async ({ taskId, files }: UploadTaskFilesDTO) => {
  const formData = new FormData()

  if (files.referenceFiles) {
    files.referenceFiles.forEach((file) => {
      formData.append('referenceFiles', file)
    })
  }

  if (files.requiredFiles) {
    files.requiredFiles.forEach((file) => {
      formData.append('requiredFiles', file)
    })
  }

  return await apiPost<{ message: string }>(`/tasks/${taskId}/uploads`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
}
