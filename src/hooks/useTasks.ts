import type { ApiError } from '@/lib/api/api'
import type {
  CreateSpecialTaskDTO,
  CreateTaskResponse,
  Task,
} from '@/lib/api/interfaces/tasks.interface'
import {
  createSpecialTask as createSpecialTaskApi,
  getTaskByBoard,
  uploadTaskFiles as uploadTaskFilesApi,
} from '@/lib/api/tasks'
import { useMutation, useQuery } from '@tanstack/react-query'

interface Props {
  boardId?: string | null
}

export const useTasks = ({ boardId }: Props) => {
  const tasks = useQuery<Task[], ApiError>({
    queryKey: ['tasks', boardId],
    queryFn: async () => getTaskByBoard(boardId!),
    enabled: !!boardId,
    retry: false,
  })

  const createSpecialTask = useMutation<
    CreateTaskResponse,
    ApiError,
    CreateSpecialTaskDTO
  >({
    mutationFn: async ({ referenceFiles, requiredFiles, ...task }) => {
      const createdTask = await createSpecialTaskApi(task)

      let filesResponse: string | string[] | undefined = undefined

      if (referenceFiles?.length || requiredFiles?.length) {
        try {
          await uploadTaskFilesApi({
            taskId: createdTask.id,
            files: { referenceFiles, requiredFiles },
          })
        } catch (error) {
          const err = error as ApiError
          filesResponse = err.details || err.message || 'Error uploading files'
        }
      }

      return {
        task: createdTask,
        message: filesResponse,
      }
    },
  })

  return {
    tasks,
    createSpecialTask,
  }
}
