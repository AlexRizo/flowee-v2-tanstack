import type { TaskType } from '@/lib/api/interfaces/tasks.interface'
import { cn } from '@/lib/utils'
import { Check, Circle, CircleCheck } from 'lucide-react'
import { DynamicIcon, type IconName } from 'lucide-react/dynamic'
import type { FC } from 'react'

interface Props {
  id: TaskType
  iconName: IconName
  title: string
  description: string
  selectedId: TaskType | null
  onSelect: (id: TaskType) => void
}

export const TaskTypeCard: FC<Props> = ({
  id,
  iconName,
  title,
  description,
  selectedId,
  onSelect,
}) => {
  return (
    <div
      role="button"
      className={cn(
        'border-2 rounded-md px-6 h-61 w-[239px] flex flex-col items-center justify-center gap-1 cursor-pointer transition-colors relative',
        selectedId === id
          ? 'border-violet-600 bg-violet-50 shadow-md'
          : 'border-gray-300 hover:border-violet-500',
      )}
      onClick={() => onSelect(id)}
    >
      {selectedId === id ? (
        <span className="bg-violet-500 rounded-full p-0.5 absolute top-2 right-2">
          <Check className="text-white " size={16} />
        </span>
      ) : (
        <Circle
          className="text-gray-300 absolute top-2 right-2"
          size={22}
        />
      )}
      <DynamicIcon name={iconName} size={80} />
      <article className="text-center">
        <h2 className="text-3xl font-bold">{title}</h2>
        <p>{description}</p>
      </article>
    </div>
  )
}
