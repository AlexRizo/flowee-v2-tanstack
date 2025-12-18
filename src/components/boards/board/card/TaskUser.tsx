import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { env } from '@/env'
import type { FC } from 'react'

interface Props {
  name?: string
  imageUrl?: string
}

export const TaskUser: FC<Props> = ({ name, imageUrl }) => {
  return (
    <Tooltip>
      <TooltipTrigger className="flex">
        <img
          src={
            imageUrl
              ? `${env.VITE_CF_URL}${imageUrl}`
              : '/dashboard/user/default-avatar.webp'
          }
          alt="UA"
          className="size-5 min-w-5 rounded object-cover"
        />
      </TooltipTrigger>
      <TooltipContent>
        <p>{name ?? 'Sin asignar'}</p>
      </TooltipContent>
    </Tooltip>
  )
}
