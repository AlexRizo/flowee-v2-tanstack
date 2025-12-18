import type { ApiError } from '@/lib/api/api'
import type { TaskMessage } from '@/lib/api/interfaces/tasks.interface'
import { getTaskChat } from '@/lib/api/tasks'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

interface Props {
  taskId: string
}

export const useTaskChat = ({ taskId }: Props) => {
  const [messages, setMessages] = useState<TaskMessage[]>([])

  const { data, isPending } = useQuery<TaskMessage[], ApiError>({
    queryKey: ['task-chat', taskId],
    enabled: !!taskId,
    queryFn: () => getTaskChat(taskId),
  })

  useEffect(() => {
    if (!data) return
    setMessages(data)
  }, [data])

  const handleSendMessage = (message: TaskMessage) => {
    setMessages((prev) => [...prev, message])
  }

  return {
    messages,
    isPending,
    handleSendMessage,
  }
}
