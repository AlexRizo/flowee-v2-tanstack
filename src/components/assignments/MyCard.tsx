import { ClipboardPaste, Rocket } from 'lucide-react'
import { TaskUser } from '../boards/board/card/TaskUser'
import type { FC } from 'react'
import { cn } from '@/lib/utils'
import { useDroppable } from '@dnd-kit/core'

interface Props {
  id?: string
  name?: string
  username?: string
  avatar?: string
}

export const MyCard: FC<Props> = ({ id, name, username, avatar }) => {
  const { setNodeRef, isOver } = useDroppable({ id: id || '' })

  return (
    <div
      role="gridcell"
      className="w-[250px] h-max bg-white rounded-sm shadow"
      ref={setNodeRef}
    >
      <div
        role="heading"
        className="p-2 flex items-center gap-2 border border-green-500 rounded-t-sm bg-stone-900"
      >
        <TaskUser name={name || ''} avatar={avatar || ''} />
        <h1 className="text-white font-medium text-sm">
          {username || ''} (Tú)
        </h1>
        <ClipboardPaste className="ml-auto text-white" size={18} />
      </div>
      <div role="contentinfo" className="p-3 flex gap-2">
        <div
          role="cell"
          className={cn(
            'flex flex-col items-center justify-center h-25 w-full border border-dashed rounded-sm bg-gray-50',
            isOver && 'border-violet-500',
          )}
        >
          <Rocket size={24} />
          <p className="text-xs">Asignar</p>
        </div>
      </div>
    </div>
  )
}
