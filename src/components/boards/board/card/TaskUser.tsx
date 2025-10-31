import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import type { FC } from 'react'

interface Props {
  name: string
  imageUrl?: string
}

export const TaskUser: FC<Props> = ({ name, imageUrl }) => {
  return (
    <Tooltip>
      <TooltipTrigger>
        <img src={imageUrl ?? '/dashboard/default-user-avatar.webp'} alt="UA" />
      </TooltipTrigger>
      <TooltipContent>
        <p>{name}</p>
      </TooltipContent>
    </Tooltip>
  )
}
