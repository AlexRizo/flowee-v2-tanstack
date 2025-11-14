import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { getContrastColor } from '@/helpers/getContrastColor'
import { cn } from '@/lib/utils'
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
        className="size-5 flex justify-center items-center rounded text-xs"
        style={{ backgroundColor: color }}
      >
        <p className={cn(getContrastColor(color))}>{prefix}</p>
      </TooltipTrigger>
      <TooltipContent>{name}</TooltipContent>
    </Tooltip>
  )
}
