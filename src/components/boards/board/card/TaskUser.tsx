import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { env } from '@/env'
import type { FC } from 'react'

interface Props {
  name?: string
  avatar?: string
}

export const TaskUser: FC<Props> = ({ name, avatar }) => {
  return (
    <Tooltip>
      <TooltipTrigger className="flex">
        <img
          src={
            avatar
              ? `${env.VITE_CF_URL}${avatar}`
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
