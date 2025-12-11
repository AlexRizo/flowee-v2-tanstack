import type { FC } from 'react'
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip'
import { cn } from '@/lib/utils'
import { env } from '@/env'

interface Props {
  id: string
  name: string
  avatar?: string
  select: () => void
  selectedId?: string
}

export const User: FC<Props> = ({ id, name, avatar, select, selectedId }) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          className={cn(
            'cursor-pointer transition-all rounded-full',
            selectedId === id && 'ring-2 ring-offset-2 ring-indigo-500',
          )}
          onClick={select}
        >
          <img
            src={
              avatar
                ? `${env.VITE_CF_URL}${avatar}`
                : '/dashboard/user/default-avatar.webp'
            }
            alt={name}
            className="size-7 rounded-full object-cover"
          />
        </button>
      </TooltipTrigger>
      <TooltipContent>{name}</TooltipContent>
    </Tooltip>
  )
}
