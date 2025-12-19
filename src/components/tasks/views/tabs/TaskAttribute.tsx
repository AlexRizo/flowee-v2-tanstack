import { TaskUser } from '@/components/boards/board/card/TaskUser'
import { EspTaskStatus, getTaskPriority, getTaskStatus } from '@/helpers/task'
import { Priority, TaskStatus } from '@/lib/api/interfaces/tasks.interface'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { Flag } from 'lucide-react'
import { type FC, type ReactNode } from 'react'

type AttType = 'text' | 'date' | 'user' | 'priority' | 'status'

interface Props {
  children: ReactNode
  type: AttType
  label: string
  value: string
  user?: {
    name: string
    avatar?: string
  }
}

export const TaskAttribute: FC<Props> = ({
  children,
  type,
  label,
  value,
  user,
}) => {
  const status = getTaskStatus(value as TaskStatus)

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center justify-center gap-1.5">
        {children}
        <p>{label}</p>
      </div>
      {type === 'text' ? (
        <p>{value}</p>
      ) : type === 'date' ? (
        <p>
          {format(new Date(value || new Date()), 'dd/MM/yyyy HH:mm', {
            locale: es,
          })}
        </p>
      ) : type === 'status' ? (
        <p className="flex items-center gap-1">
          <span
            className={cn(
              'h-4 w-[5px] rounded',
              status === EspTaskStatus.PENDING && 'bg-gray-500',
              status === EspTaskStatus.ATTENTION && 'bg-yellow-500',
              status === EspTaskStatus.IN_PROGRESS && 'bg-blue-500',
              status === EspTaskStatus.FOR_REVIEW && 'bg-violet-500',
              status === EspTaskStatus.DONE && 'bg-green-500',
            )}
          ></span>
          {status}
        </p>
      ) : type === 'priority' ? (
        <p className="flex items-center gap-0.5">
          <Flag
            className={cn(
              value === Priority.LOW && 'text-blue-500 fill-blue-500',
              value === Priority.NORMAL && 'text-violet-500 fill-violet-500',
              value === Priority.HIGH && 'text-orange-400 fill-orange-400',
              value === Priority.URGENT && 'text-red-400 fill-red-400',
            )}
            size={13}
          />
          {getTaskPriority(value as Priority)}
        </p>
      ) : type === 'user' ? (
        <p>
          <TaskUser avatar={user?.avatar} name={user?.name} />
        </p>
      ) : null}
    </div>
  )
}
