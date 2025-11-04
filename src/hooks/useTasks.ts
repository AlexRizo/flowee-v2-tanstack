import type { ApiError } from '@/lib/api/api'
import type {
  CreateSpecialTaskDTO,
  Task,
} from '@/lib/api/interfaces/tasks.interface'
import { createSpecialTask as createSpecialTaskApi, getTaskByBoard } from '@/lib/api/tasks'
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

  const createSpecialTask = useMutation<Task, ApiError, CreateSpecialTaskDTO>({
    mutationFn: createSpecialTaskApi,
    onSuccess: (task) => {
      console.log(task);
    }
  })

  return {
    tasks,
    createSpecialTask,
  }
}
