import { getContrastColor } from '@/helpers/getContrastColor'
import type { Board } from '@/lib/api/interfaces/boards.interface'
import { cn } from '@/lib/utils'
import type { FC } from 'react'
import { BoardAvatar } from '@/components/boards/grid/BoardAvatar'
import { UserMinus } from 'lucide-react'
import { useAdminBoards } from '@/hooks/admin/useAdminBoards'
import { ProtectedItem } from '@/components/protected/ProtectedItem'

interface Props extends Board {
  userId: string
}

export const UserBoardCard: FC<Props> = ({
  id,
  name,
  color,
  prefix,
  userId,
}) => {
  const { leaveBoard } = useAdminBoards(userId)

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
        <ProtectedItem role="admins">
          <button
            onClick={() => leaveBoard.mutate({ boardId: id, userId })}
            className="size-6 bg-white/60 rounded-full flex items-center justify-center cursor-pointer"
          >
            <UserMinus size={16} />
          </button>
        </ProtectedItem>
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
