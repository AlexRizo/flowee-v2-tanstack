import { apiGet, apiPost } from './api'
import type {
  CreateSpecialTaskDTO,
  GetTaskFileDTO,
  GetTasksDTO,
  Task,
  TaskFiles,
  UploadTaskFilesDTO,
} from './interfaces/tasks.interface'

export const getTasks = async ({ boardId, assigned = true }: GetTasksDTO) => {
  return await apiGet<Task[]>(`/tasks?boardId=${boardId}&assigned=${assigned}`)
}

export const getMyTasksByBoard = async (boardId: string) => {
  return await apiGet<Task[]>(`/tasks/my-tasks/board/${boardId}`)
}

export const getPendingTasks = async (boardId: string) => {
  return await apiGet<Task[]>(`/tasks/board/${boardId}/pending`)
}

export const createSpecialTask = async (newTask: CreateSpecialTaskDTO) => {
  return await apiPost<Task>('/tasks/special', newTask)
}

export const uploadTaskFiles = async ({
  taskId,
  files,
}: UploadTaskFilesDTO) => {
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

  return await apiPost<{ message: string }>(
    `/tasks/${taskId}/uploads`,
    formData,
    {
      headers: { 'Content-Type': 'multipart/form-data' },
    },
  )
}

export const getTaskFiles = async (taskId: string) => {
  return await apiGet<TaskFiles>(`/tasks/${taskId}/uploads`)
}

export const getTaskFile = async ({
  taskId,
  fileId,
  download,
}: GetTaskFileDTO) => {
  return await apiGet<string>(
    `/tasks/${taskId}/uploads/${fileId}?download=${download}`,
  )
}
