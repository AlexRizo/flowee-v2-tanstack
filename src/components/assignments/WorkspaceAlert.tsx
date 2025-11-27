import { cn } from '@/lib/utils'
import { AlertCircle } from 'lucide-react'
import type { FC } from 'react'
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip'

interface Props {
  tasksCount: number
}

export const WorkspaceAlert: FC<Props> = ({ tasksCount }) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <AlertCircle
          className={cn(
            'text-white',
            tasksCount < 6 && 'hidden',
            tasksCount >= 6 && tasksCount < 10 && 'fill-amber-500',
            tasksCount >= 10 && 'fill-red-500',
          )}
          size={18}
        />
      </TooltipTrigger>
      <TooltipContent>
        <p>Carga de trabajo: {tasksCount >= 10 ? 'Alta' : 'Media'}</p>
      </TooltipContent>
    </Tooltip>
  )
}
