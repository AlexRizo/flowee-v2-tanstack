import type { Task } from '@/lib/api/interfaces/tasks.interface'
import { Clock } from 'lucide-react'
import type { FC } from 'react'
import { PendingTaskCard } from './PendingTaskCard'

interface Props {
  pendingTasks: Task[]
}

export const PendingColumn: FC<Props> = ({ pendingTasks = [] }) => {
  return (
    <div
      role="grid"
      className="h-full w-[250px] bg-white rounded-sm shadow overflow-hidden"
    >
      <div role="heading" className="bg-violet-800 p-2 flex items-center gap-2">
        <Clock className="text-white" size={18} />
        <h1 className="text-white font-medium text-sm">
          Por asignar{' '}
          <span className="text-white font-normal text-xs">
            ({pendingTasks.length})
          </span>
        </h1>
      </div>
      <div role="contentinfo" className="p-2 flex flex-col gap-2">
        {pendingTasks.length > 0 ? (
          pendingTasks.map((task) => (
            <PendingTaskCard key={task.id} {...task}/>
          ))
        ) : (
          <p className="text-center text-sm text-gray-500">
            No hay tareas pendientes
          </p>
        )}
      </div>
    </div>
  )
}
