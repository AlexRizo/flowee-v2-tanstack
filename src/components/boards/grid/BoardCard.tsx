import { getContrastColor } from '@/helpers/getContrastColor'
import type { Board } from '@/lib/api/interfaces/boards.interface'
import { cn } from '@/lib/utils'
import type { FC } from 'react'
import { BoardAvatar } from './BoardAvatar'
import { DeleteBoardDialog } from '../dialogs/deleteBoardDialog'

interface Props extends Board {}

export const BoardCard: FC<Props> = ({ id, name, color, prefix, slug }) => {
  return (
    <div role="gridcell" className="border rounded overflow-hidden group">
      <div
        role="heading"
        className="h-24 flex items-end justify-between px-2 py-1 relative"
        style={{ backgroundColor: color }}
      >
        <h1 className={cn('text-lg font-semibold', getContrastColor(color))}>
          {name}
        </h1>
        <DeleteBoardDialog name={name} id={id} />
        <BoardAvatar prefix={prefix} color={color} />
      </div>
      <div className="bg-white p-2 border-t">
        <p>
          <span className="font-medium">Prefijo:</span> {prefix}
        </p>
      </div>
    </div>
  )
}
