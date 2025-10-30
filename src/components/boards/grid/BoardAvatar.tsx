import { getContrastColor } from '@/helpers/getContrastColor'
import { cn } from '@/lib/utils'
import type { FC } from 'react'

interface Props {
  prefix: string
  color: string
}

export const BoardAvatar: FC<Props> = ({ prefix, color }) => {
  return (
    <span
      className={cn(
        'size-16 rounded-full bg-white/30 opacity-50 flex items-center justify-center font-medium text-2xl absolute -rotate-25 transition-transform',
        getContrastColor(color),
        '-top-4 -right-4 group-hover:-rotate-40 group-hover:scale-110 duration-300',
      )}
    >
      {prefix}
    </span>
  )
}
