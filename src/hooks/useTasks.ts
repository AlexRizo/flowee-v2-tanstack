import { groupTasksByStatus } from '@/helpers/task'
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
  getPendingTasks,
  getMyTasksByBoard,
  uploadTaskFiles as uploadTaskFilesApi,
  getTasks,
} from '@/lib/api/tasks'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { isDesigner } from '@/helpers/protected'
import type { Role } from '@/lib/api/interfaces/auth.interface'

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
  const [localOrder, setLocalOrder] = useState<OrderTasks>(INITIAL_ORDER)
  const queryClient = useQueryClient()

  const tasksQuery = useQuery<Task[], ApiError, TasksResult>({
    queryKey: ['tasks', boardId],
    queryFn: async () => await getMyTasksByBoard(boardId!),
    enabled: !!boardId,
    retry: false,
    select: (tasks) => groupTasksByStatus(tasks),
  })

  useEffect(() => {
    if (tasksQuery.data) {
      setLocalOrder(tasksQuery.data.order)
    }
  }, [tasksQuery.data])

  const moveTask = (from: TaskStatus, to: TaskStatus, taskId: string) => {
    setLocalOrder((prev) => {
      const updated = structuredClone(prev)

      const index = updated[from].findIndex((task) => task.id === taskId)

      if (index === -1) return prev

      const [task] = updated[from].splice(index, 1)

      task.status = to
      updated[to].push(task)

      queryClient.setQueryData(['tasks', boardId], (oldData: Task[]) => {
        if (!oldData) return oldData

        return oldData.map((t) => (t.id === taskId ? { ...t, status: to } : t))
      })

      return updated
    })
  }

  const setTask = (task: Task) => {
    setLocalOrder((prev) => {
      const updated = structuredClone(prev)

      const destinationColumn = updated[task.status]

      const taskIndex = destinationColumn.findIndex((t) => t.id === task.id)

      if (taskIndex !== -1) {
        destinationColumn[taskIndex] = task
      } else {
        destinationColumn.push(task)
      }

      queryClient.setQueryData(['tasks', boardId], (oldData: Task[]) => {
        if (!oldData) return oldData

        return oldData.map((t) =>
          t.id === task.id ? { ...t, status: task.status } : t,
        )
      })

      return updated
    })
  }

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
      order: localOrder,
    },
    moveTask,
    setTask,
    tasksQuery,
    createSpecialTask,
  }
}

export const usePendingTasks = ({ boardId }: Props) => {
  // const queryClient = useQueryClient()

  const pendingTasksQuery = useQuery<Task[], ApiError>({
    queryKey: ['pending-tasks', boardId],
    queryFn: () => getPendingTasks(boardId!),
    enabled: !!boardId,
    retry: false,
  })

  return {
    pendingTasksQuery,
  }
}

interface UseManagerProps {
  boardId?: string
  userId?: string
  role?: Role
}

export const useManagerTasks = ({ boardId, userId, role }: UseManagerProps) => {
  const queryClient = useQueryClient()

  const [localOrder, setLocalOrder] = useState<OrderTasks>(INITIAL_ORDER)

  const managerTasksQuery = useQuery<Task[], ApiError, TasksResult>({
    queryKey: ['manager-tasks', boardId],
    queryFn: async () => await getTasks({ boardId, assigned: false }),
    enabled: !!boardId,
    retry: false,
    select: (tasks) => groupTasksByStatus(tasks),
  })

  useEffect(() => {
    if (managerTasksQuery.data) {
      setLocalOrder(managerTasksQuery.data.order)
    }
  }, [managerTasksQuery.data])

  // TODO: hay que ejecutar bien el filtro. No funciona bien.
  useEffect(() => {
    const unorder = managerTasksQuery.data?.unorder || []
    let filteredTasks: Task[] = unorder

    if (!role) return

    if (!userId) {
      setLocalOrder(groupTasksByStatus(unorder).order)
      return
    }

    const isDesg = isDesigner(role)

    if (isDesg) {
      filteredTasks = unorder.filter((task) => task.assignedTo?.id === userId)
    } else {
      filteredTasks = unorder.filter((task) => task.author.id === userId)
    }

    setLocalOrder(groupTasksByStatus(filteredTasks).order)
  }, [userId, boardId])

  const moveTask = (from: TaskStatus, to: TaskStatus, taskId: string) => {
    setLocalOrder((prev) => {
      const updated = structuredClone(prev)

      const index = updated[from].findIndex((task) => task.id === taskId)

      if (index === -1) return prev

      const [task] = updated[from].splice(index, 1)

      task.status = to
      updated[to].push(task)

      queryClient.setQueryData(['tasks', boardId], (oldData: Task[]) => {
        if (!oldData) return oldData

        return oldData.map((t) => (t.id === taskId ? { ...t, status: to } : t))
      })

      return updated
    })
  }

  const setTask = (task: Task) => {
    setLocalOrder((prev) => {
      const updated = structuredClone(prev)

      const destinationColumn = updated[task.status]

      const taskIndex = destinationColumn.findIndex((t) => t.id === task.id)

      if (taskIndex !== -1) {
        destinationColumn[taskIndex] = task
      } else {
        destinationColumn.push(task)
      }

      queryClient.setQueryData(['tasks', boardId], (oldData: Task[]) => {
        if (!oldData) return oldData

        return oldData.map((t) =>
          t.id === task.id ? { ...t, status: task.status } : t,
        )
      })

      return updated
    })
  }

  return {
    tasks: {
      unorder: managerTasksQuery.data?.unorder || [],
      order: localOrder,
    },
    moveTask,
    setTask,
    managerTasksQuery,
  }
}
