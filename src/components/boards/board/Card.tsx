import type { Priority, TaskType as TaskTp } from '@/lib/api/interfaces/tasks.interface'
import type { User } from '@/lib/api/interfaces/users.interface'
import type { FC } from 'react'
import { TaskBoard } from './card/TaskBoard'
import type { Board } from '@/lib/api/interfaces/boards.interface'
import { TaskUser } from './card/TaskUser'
import { DateTask } from './card/DateTask'
import { TaskType } from './card/TaskType'
import { TaskPriority } from './card/TaskPriority'

interface Props {
  title: string
  description: string
  board: Board
  priority: Priority
  taskType: TaskTp
  author: User
  assignedTo: User
  createdAt: string
  dueDate: string
}

export const Card: FC<Props> = ({ title, description, board, priority, taskType, author, assignedTo, createdAt, dueDate }) => {
  return <div role='contentinfo' className="flex flex-col border">
    <div role='heading' className='flex p-1 border-b'>
      <TaskBoard name={board.name} prefix={board.prefix} color={board.color} />
      <TaskUser name={author.name} imageUrl={author.avatar} />
      <DateTask date={createdAt} icon='calendar-plus' />
      <TaskType type={taskType} />
      <TaskPriority priority={priority} />
    </div>
  </div>
}
