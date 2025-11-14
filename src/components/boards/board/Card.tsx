import type { Task } from '@/lib/api/interfaces/tasks.interface'
import type { FC } from 'react'
import { TaskBoard } from './card/TaskBoard'
import { TaskUser } from './card/TaskUser'
import { DateTask } from './card/DateTask'
import { TaskType } from './card/TaskType'
import { TaskPriority } from './card/TaskPriority'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'

interface Props extends Task {}

export const Card: FC<Props> = ({
  title,
  description,
  board,
  priority,
  type,
  author,
  assignedTo,
  createdAt,
  dueDate,
}) => {
  return (
    <div
      role="contentinfo"
      className="flex flex-col border bg-white rounded hover:border-dashed hover:border-purple-500 cursor-grab"
    >
      <div role="heading" className="flex gap-1 p-1.5">
        <TaskBoard
          name={board.name}
          prefix={board.prefix}
          color={board.color}
        />
        <TaskUser name={assignedTo?.name} imageUrl={assignedTo?.avatar} />
        <DateTask date={createdAt} icon="calendar-plus" />
        <TaskType type={type} />
        <TaskPriority priority={priority} />
      </div>
      <div role="contentinfo" className="text-xs p-1.5 border-y">
        <h2 className="font-medium">{title}</h2>
        <p>{description}</p>
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
