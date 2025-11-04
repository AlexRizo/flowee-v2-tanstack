import type { ApiError } from '@/lib/api/api'
import type {
  CreateSpecialTaskDTO,
  Task,
  UploadTaskFilesDTO,
} from '@/lib/api/interfaces/tasks.interface'
import {
  createSpecialTask as createSpecialTaskApi,
  getTaskByBoard,
  uploadTaskFiles as uploadTaskFilesApi,
} from '@/lib/api/tasks'
import { useMutation, useQuery } from '@tanstack/react-query'
import { toast } from 'sonner'

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
    mutationFn: ({ referenceFiles, requiredFiles, ...task }) => {
      return createSpecialTaskApi(task)
    },
    onSuccess: (task, { referenceFiles, requiredFiles }) => {
      if (referenceFiles?.length || requiredFiles?.length) {
        uploadTaskFiles.mutate({
          taskId: task.id,
          files: { referenceFiles, requiredFiles },
        })
      }
    },
  })

  const uploadTaskFiles = useMutation<void, ApiError, UploadTaskFilesDTO>({
    mutationFn: uploadTaskFilesApi,
    onSuccess: () => {
      toast.success('Los archivos se han subido correctamente')
    },
    onError: (error) => {
      console.log(error);
      toast.error('Hubo un error al subir los archivos')
    }
  })

  return {
    tasks,
    createSpecialTask,
    uploadTaskFiles,
  }
}
