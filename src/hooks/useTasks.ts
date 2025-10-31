import type { ApiError } from "@/lib/api/api"
import type { Task } from "@/lib/api/interfaces/tasks.interface"
import { getTaskByBoard } from "@/lib/api/tasks"
import { useMutation, useQuery } from "@tanstack/react-query"

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
  
  return {
    tasks,
  }
}