import { TaskUser } from '@/components/boards/board/card/TaskUser'
import { useAuth } from '@/hooks/useAuth'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import type { FC } from 'react'

interface Props {
  user: {
    id: string
    name: string
    avatar?: string
  }
  message: string
  date: string
}

export const ChatBubble: FC<Props> = ({ user, message, date }) => {
  const { user: currentUser } = useAuth()

  return (
    <div
      className={cn(
        'flex items-end gap-2',
        currentUser?.id === user.id ? 'flex-row-reverse' : 'flex-row',
      )}
    >
      <TaskUser {...user} />
      <article className="flex flex-col relative">
        <p
          className={cn(
            'p-2 rounded-md text-wrap break-all',
            currentUser?.id === user.id
              ? 'bg-gray-900 text-white rounded-br-none'
              : 'bg-gray-100 rounded-bl-none',
          )}
        >
          {message}
        </p>
        <small
          className={cn(
            'text-xs text-gray-500 absolute -bottom-4.5 w-max',
            currentUser?.id === user.id && 'right-0',
          )}
        >
          {format(date, 'dd/MM/yyyy hh:mm aaaa', { locale: es })}
        </small>
      </article>
    </div>
  )
}
