import type { Task } from '@/lib/api/interfaces/tasks.interface'
import { useEffect, type FC } from 'react'
import { cn } from '@/lib/utils'
import { TaskUser } from '../boards/board/card/TaskUser'
import { DateTask } from '../boards/board/card/DateTask'
import { TaskType } from '../boards/board/card/TaskType'
import { TaskPriority } from '../boards/board/card/TaskPriority'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { TaskBoard } from '../boards/board/card/TaskBoard'
import { useDraggable } from '@dnd-kit/core'

interface Props extends Task {}

export const PendingTaskCard: FC<Props> = ({
  id,
  title,
  description,
  createdAt,
  dueDate,
  priority,
  type,
  board,
  author,
}) => {
  const { setNodeRef, listeners, attributes, transform, isDragging } =
    useDraggable({
      id,
    })

  const style = transform
    ? { transform: `translate3d(${transform.x}px, ${transform.y}px)` }
    : undefined

  return (
    <div
      className={cn(
        'flex flex-col border bg-white rounded hover:border-dashed hover:border-purple-500 cursor-grab transition-colors',
        isDragging && 'opacity-50',
      )}
      ref={setNodeRef}
      style={{ ...style, willChange: 'transform' }}
      {...listeners}
      {...attributes}
    >
      <div role="heading" className="flex gap-1 p-1.5">
        <TaskBoard
          name={board.name}
          prefix={board.prefix}
          color={board.color}
        />
        <DateTask date={createdAt} icon="calendar-plus" />
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
        <TaskUser name={author?.name} imageUrl={author?.avatar} />
        <span className="flex items-center gap-1 text-xs ml-auto">
          <DateTask date={dueDate} icon="calendar-check" />
          {format(new Date(dueDate), 'eee, hh:mm a', { locale: es })}
        </span>
      </div>
    </div>
  )
}
