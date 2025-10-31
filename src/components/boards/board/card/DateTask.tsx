import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import type { FC } from 'react'
import { format } from 'date-fns'
import { DynamicIcon } from 'lucide-react/dynamic'

interface Props {
  date: string
  icon: 'calendar-plus' | 'calendar-check'
}

export const DateTask: FC<Props> = ({ date, icon }) => {
  return (
    <Tooltip>
      <TooltipTrigger className="size-5 flex justify-center items-center rounded">
        <DynamicIcon name={icon} />
      </TooltipTrigger>
      <TooltipContent>{format(date, 'dd MMM yyyy')}</TooltipContent>
    </Tooltip>
  )
}
