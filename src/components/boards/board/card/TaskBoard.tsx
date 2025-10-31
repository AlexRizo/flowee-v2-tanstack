import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import type { FC } from 'react'

interface Props {
  name: string
  prefix: string
  color: string
}

export const TaskBoard: FC<Props> = ({ name, prefix, color }) => {
  return (
    <Tooltip>
      <TooltipTrigger
        className="size-5 flex justify-center items-center rounded"
        style={{ backgroundColor: color }}
      >
        {prefix}
      </TooltipTrigger>
      <TooltipContent>{name}</TooltipContent>
    </Tooltip>
  )
}
