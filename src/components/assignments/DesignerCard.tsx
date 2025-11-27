import { ClipboardPaste, Rocket } from 'lucide-react'
import { TaskUser } from '../boards/board/card/TaskUser'
import { WorkspaceAlert } from './WorkspaceAlert'
import type { FC } from 'react'
import type { DesignerBoardUser } from '@/lib/api/interfaces/boards.interface'
import { cn } from '@/lib/utils'

interface Props extends DesignerBoardUser {}

export const DesignerCard: FC<Props> = ({ id, name, username, tasksCount }) => {
  const tasksCountTotal =
    tasksCount.pending + tasksCount.inProgress + tasksCount.forReview

  return (
    <div role="gridcell" className="w-[250px] h-max bg-white rounded-sm shadow">
      <div
        role="heading"
        className={cn(
          'p-2 flex items-center gap-2 border border-green-500 rounded-t-sm bg-gray-900',
          tasksCountTotal >= 6 && tasksCountTotal < 10 && 'border-yellow-500',
          tasksCountTotal >= 10 && 'border-red-500',
        )}
      >
        <TaskUser name={name} />
        <h1 className="text-white font-medium text-sm">
          {username + ' '}
          <span className="text-xs font-normal">({tasksCountTotal})</span>
        </h1>
        <WorkspaceAlert tasksCount={tasksCountTotal} />
        <ClipboardPaste className="ml-auto text-white" size={18} />
      </div>
      <div role="contentinfo" className="p-3 flex gap-2">
        <article className="text-xs w-full">
          <h2 className="font-medium mb-1">Carga de trabajo</h2>
          <p>
            En espera <span>({tasksCount.pending})</span>
          </p>
          <p>
            Diseñando <span>({tasksCount.inProgress})</span>
          </p>
          <p>
            En revisión <span>({tasksCount.forReview})</span>
          </p>
        </article>
        <div
          role="cell"
          className="flex flex-col items-center justify-center h-25 w-full border border-dashed rounded-sm bg-gray-50"
        >
          <Rocket size={24} />
          <p className="text-xs">Asignar</p>
        </div>
      </div>
    </div>
  )
}
