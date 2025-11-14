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
      ? 'text-blue-500 fill-blue-500'
      : priority === Priority.NORMAL
        ? 'text-violet-500 fill-violet-500'
        : priority === Priority.HIGH
          ? 'text-orange-400 fill-orange-400'
          : 'text-red-400 fill-red-400'

  return (
    <span className="flex items-center gap-0.5 ml-auto text-xs font-medium">
      <Flag className={cn(flagColor)} size={13} />
      {getTaskPriority(priority)}
    </span>
  )
}
