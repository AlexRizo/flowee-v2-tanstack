import { ChatBubble } from './ChatBubble'
import { ChatInput } from './ChatInput'
import { useEffect } from 'react'
import { appSocket } from '@/lib/ws/appSocket'
import { useTaskChat } from '@/hooks/useTaskChat'
import { MessageSquareDashed } from 'lucide-react'
import { Spinner } from '@/components/ui/spinner'
import { isSameMinute, parseISO } from 'date-fns'

interface Props {
  taskId: string
}

export const TaskChat = ({ taskId }: Props) => {
  const { messages, isPending, handleSendMessage } = useTaskChat({ taskId })

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

      <div className="flex flex-col h-[calc(100vh-200px)] overflow-y-auto">
        {isPending ? (
          <div className="flex flex-col items-center justify-center gap-2 h-full">
            <Spinner className="text-gray-400" />
            <p className="text-gray-400">Cargando mensajes...</p>
          </div>
        ) : messages.length > 0 ? (
          messages.map((message, index) => {
            const nextMsg = messages[index + 1]

            const currentDate = parseISO(message.createdAt)
            const nextDate = nextMsg ? parseISO(nextMsg.createdAt) : null

            const isGroupedWithNextMsg =
              nextMsg &&
              nextMsg.user.id === message.user.id &&
              isSameMinute(currentDate, nextDate!)

            const showTimestamp = !isGroupedWithNextMsg

            return (
              <ChatBubble
                key={message.id}
                user={message.user}
                message={message.content}
                date={message.createdAt}
                showTimestamp={showTimestamp}
              />
            )
          })
        ) : (
          <div className="flex flex-col items-center justify-center gap-2 h-full">
            <MessageSquareDashed size={70} className="text-gray-400" />
            <p className="text-gray-400">No hay mensajes</p>
          </div>
        )}
      </div>
      <ChatInput taskId={taskId} />
    </>
  )
}
