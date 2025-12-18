import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useAuth } from '@/hooks/useAuth'
import { appSocket } from '@/lib/ws/appSocket'
import { CirclePlus, FileImage, Paperclip, ThumbsUp } from 'lucide-react'
import { useState, type ChangeEvent, type KeyboardEvent } from 'react'

interface Props {
  taskId: string
}

export const ChatInput = ({ taskId }: Props) => {
  const [message, setMessage] = useState('')
  const { user } = useAuth()

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value)
  }

  const handleEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!user) return

    if (e.key === 'Enter' && message.trim() !== '') {
      appSocket.emit('send-message', {
        taskId,
        content: message,
        userId: user.id,
      })
      setMessage('')
    }
  }

  return (
    <div className="flex mt-auto gap-1">
      <div className="flex items-center gap-0.5">
        <Button variant="ghost">
          <CirclePlus />
        </Button>
        <Button variant="ghost">
          <FileImage />
        </Button>
        <Button variant="ghost">
          <Paperclip />
        </Button>
      </div>
      <Input
        placeholder="Escribe un mensaje..."
        className="rounded-full px-4 h-10 flex-1"
        onChange={onInputChange}
        onKeyDown={handleEnter}
        value={message}
      />
      <Button variant="ghost">
        <ThumbsUp />
      </Button>
    </div>
  )
}
