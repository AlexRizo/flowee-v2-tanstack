import { type FC } from 'react'
import { Priority } from '@/lib/api/interfaces/tasks.interface'
import { getTaskPriority } from '@/helpers/task'
import { Flag } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Props {
  priority: Priority
}

export const TaskPriority: FC<Props> = ({ priority }) => {
  const flagColor =
    priority === Priority.LOW
      ? 'text-blue-400'
      : priority === Priority.NORMAL
        ? 'text-violet-400'
        : priority === Priority.HIGH
          ? 'text-orange-400'
          : 'text-red-400'

  return (
    <span className='ml-auto text-sm'>
      <Flag className={cn(flagColor)} />
      {getTaskPriority(priority)}
    </span>
  )
}
