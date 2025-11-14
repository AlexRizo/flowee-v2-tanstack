import type { ApiError } from '@/lib/api/api'
import {
  type CreateSpecialTaskDTO,
  type CreateTaskResponse,
  type Task,
  type OrderTasks,
  TaskStatus,
  type TasksResult,
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

const INITIAL_ORDER: OrderTasks = {
  [TaskStatus.PENDING]: [],
  [TaskStatus.ATTENTION]: [],
  [TaskStatus.IN_PROGRESS]: [],
  [TaskStatus.FOR_REVIEW]: [],
  [TaskStatus.DONE]: [],
}

export const useTasks = ({ boardId }: Props) => {
  const tasksQuery = useQuery<Task[], ApiError, TasksResult>({
    queryKey: ['tasks', boardId],
    queryFn: async () => await getTaskByBoard(boardId!),
    enabled: !!boardId,
    retry: false,
    select: (tasks) => {
      const order: OrderTasks = {
        [TaskStatus.PENDING]: [],
        [TaskStatus.ATTENTION]: [],
        [TaskStatus.IN_PROGRESS]: [],
        [TaskStatus.FOR_REVIEW]: [],
        [TaskStatus.DONE]: [],
      }

      for (const task of tasks) {
        order[task.status].push(task)
      }

      return {
        unorder: tasks,
        order,
      }
    },
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
    tasks: {
      unorder: tasksQuery.data?.unorder || [],
      order: tasksQuery.data?.order || INITIAL_ORDER,
    },
    tasksQuery,
    createSpecialTask,
  }
}
