import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import type { FC } from 'react'

interface Props {
  name?: string
  imageUrl?: string
}

export const TaskUser: FC<Props> = ({ name, imageUrl }) => {
  return (
    <Tooltip>
      <TooltipTrigger className='flex'>
        <img src={imageUrl ?? '/dashboard/user/default-avatar.webp'} alt="UA" className='size-5 rounded' />
      </TooltipTrigger>
      <TooltipContent>
        <p>{name ?? 'Sin asignar'}</p>
      </TooltipContent>
    </Tooltip>
  )
}
