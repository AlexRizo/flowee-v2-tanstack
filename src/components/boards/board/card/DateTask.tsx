import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import type { FC } from 'react'
import { format } from 'date-fns'
import { DynamicIcon } from 'lucide-react/dynamic'
import { es } from 'date-fns/locale'

interface Props {
  date: string
  icon: 'calendar-plus' | 'calendar-check'
  format?: string
}

export const DateTask: FC<Props> = ({
  date,
  icon,
  format: dateFormat = 'eeee dd \'de\' MMMM \'del\' yyyy hh:mm a',
}) => {
  return (
    <Tooltip>
      <TooltipTrigger className="size-5 flex justify-center items-center rounded">
        <DynamicIcon name={icon} strokeWidth={1.5} />
      </TooltipTrigger>
      <TooltipContent>
        {icon === 'calendar-plus' ? 'Creada: ' : 'Entrega: '}
        {format(date, dateFormat, { locale: es })}
      </TooltipContent>
    </Tooltip>
  )
}
