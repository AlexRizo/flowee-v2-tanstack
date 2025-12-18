import { ChatBubble } from './ChatBubble'
import { ChatInput } from './ChatInput'
import { useEffect } from 'react'
import { appSocket } from '@/lib/ws/appSocket'
import { useTaskChat } from '@/hooks/useTaskChat'

interface Props {
  taskId: string
}

export const TaskChat = ({ taskId }: Props) => {
  const { messages, handleSendMessage } = useTaskChat({ taskId })

  useEffect(() => {
    if (!appSocket) return

    appSocket.emit('join-task-chat', {
      taskId,
    })

    const handleGetMessage = handleSendMessage

    appSocket.on('message', handleGetMessage)

    return () => {
      appSocket.off('message', handleGetMessage)
    }
  }, [appSocket])

  return (
    <>
      <h1 className="font-bold mb-6">Conversación</h1>

      <div className="flex gap-8 flex-col h-max">
        {messages.map((message) => (
          <ChatBubble
            key={message.id}
            user={message.user}
            message={message.content}
            date={message.createdAt}
          />
        ))}
      </div>
      <ChatInput taskId={taskId} />
    </>
  )
}
