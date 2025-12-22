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
  showTimestamp: boolean
}

export const ChatBubble: FC<Props> = ({
  user,
  message,
  date,
  showTimestamp,
}) => {
  const { user: currentUser } = useAuth()

  return (
    <div
      className={cn(
        'flex items-end gap-2',
        currentUser?.id === user.id ? 'flex-row-reverse' : 'flex-row',
        showTimestamp ? 'mb-8' : 'mb-1',
      )}
    >
      {showTimestamp ? <TaskUser {...user} /> : <div className="w-5" />}
      <article className="flex flex-col relative">
        <p
          className={cn(
            'p-2 rounded-xl text-wrap break-all',
            currentUser?.id === user.id
              ? 'bg-gray-900 text-white rounded-br-none'
              : 'bg-gray-100 rounded-bl-none',
          )}
        >
          {message}
        </p>
        {showTimestamp && (
          <small
            className={cn(
              'text-xs text-gray-500 absolute -bottom-4.5 w-max',
              currentUser?.id === user.id && 'right-0',
            )}
          >
            {format(date, 'dd/MM/yyyy hh:mm aaaa', { locale: es })}
          </small>
        )}
      </article>
    </div>
  )
}
