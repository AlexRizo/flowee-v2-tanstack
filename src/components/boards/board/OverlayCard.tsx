import type { Task } from '@/lib/api/interfaces/tasks.interface'
import type { FC } from 'react'
import { TaskType } from './card/TaskType'
import { TaskPriority } from './card/TaskPriority'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { getContrastColor } from '@/helpers/getContrastColor'
import { cn } from '@/lib/utils'
import { CalendarCheck, CalendarPlus } from 'lucide-react'
import { env } from '@/env'

interface Props extends Task {}

export const OverlayCard: FC<Props> = ({
  title,
  description,
  board,
  priority,
  type,
  author,
  assignedTo,
  dueDate,
}) => {
  return (
    <div className="flex flex-col border bg-white rounded hover:border-dashed hover:border-purple-500 cursor-grab w-[230px] transition-all">
      <div role="heading" className="flex gap-1 p-1.5">
        <span className="size-5 flex justify-center items-center rounded text-xs">
          <p
            style={{ backgroundColor: board.color }}
            className={cn(getContrastColor(board.color))}
          >
            {board.prefix}
          </p>
        </span>
        <img
          src={
            assignedTo?.avatar
              ? `${env.VITE_CF_URL}${assignedTo.avatar}`
              : '/dashboard/user/default-avatar.webp'
          }
          alt="UA"
          className="size-5 rounded"
        />

        <span className="size-5 flex justify-center items-center rounded">
          <CalendarPlus strokeWidth={1.5} />
        </span>
        <TaskType type={type} />
        <TaskPriority priority={priority} />
      </div>
      <div role="contentinfo" className="text-xs p-1.5 border-y h-20">
        <h2 className="font-medium">{title}</h2>
        <p>
          {description.length >= 95
            ? description.slice(0, 95).trim() + '...'
            : description}
        </p>
      </div>
      <div role="complementary" className="flex gap-1 p-1.5">
        <img
          src={
            author?.avatar
              ? `${env.VITE_CF_URL}${author.avatar}`
              : '/dashboard/user/default-avatar.webp'
          }
          alt="UA"
          className="size-5 rounded"
        />
        <span className="flex items-center gap-1 text-xs ml-auto">
          <span className="size-5 flex justify-center items-center rounded">
            <CalendarCheck strokeWidth={1.5} />
          </span>
          {format(new Date(dueDate), 'eee, hh:mm a', { locale: es })}
        </span>
      </div>
    </div>
  )
}
