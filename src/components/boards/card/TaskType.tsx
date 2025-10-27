import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { type FC } from 'react'
import { TaskType as TaskT } from '@/lib/api/interfaces/tasks.interface'
import { getTaskType } from '@/helpers/task'
import { DynamicIcon, type IconName } from 'lucide-react/dynamic'

interface Props {
  type: TaskT
}

export const TaskType: FC<Props> = ({ type }) => {
  const iconName: Partial<IconName> =
    type === TaskT.PRINT
      ? 'printer'
      : TaskT.DIGITAL
        ? 'monitor-smartphone'
        : TaskT.ECOMMERCE
          ? 'store'
          : TaskT.SPECIAL
            ? 'sparkles'
            : 'circle-question-mark'

  return (
    <Tooltip>
      <TooltipTrigger className="size-5 flex justify-center items-center rounded">
        <DynamicIcon name={iconName} />
      </TooltipTrigger>
      <TooltipContent>{getTaskType(type)}</TooltipContent>
    </Tooltip>
  )
}
