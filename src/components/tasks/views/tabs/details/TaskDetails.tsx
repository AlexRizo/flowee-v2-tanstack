import type { Task } from '@/lib/api/interfaces/tasks.interface'
import { type FC } from 'react'
import { TaskAttribute } from '../TaskAttribute'
import { Calendar, Flag, RefreshCcwDot, Rocket, UserPlus } from 'lucide-react'
import { FileTable } from './FileTable'

interface Props extends Task {}

export const TaskDetails: FC<Props> = ({
  id,
  title,
  description,
  author,
  assignedTo,
  priority,
  status,
  createdAt,
  dueDate,
}) => {
  return (
    <>
      <h1 className="text-2xl font-bold mb-6">{title}</h1>
      <div className="flex gap-2">
        <div className="flex flex-col gap-3 w-full">
          <TaskAttribute type="date" label="Solicitado" value={createdAt}>
            <Calendar size={18} className="text-gray-500" />
          </TaskAttribute>
          <TaskAttribute type="date" label="Entrega" value={dueDate}>
            <Rocket size={18} className="text-gray-500" />
          </TaskAttribute>
          <TaskAttribute type="status" label="Estatus" value={status}>
            <RefreshCcwDot size={18} className="text-gray-500" />
          </TaskAttribute>
        </div>
        <div className="flex flex-col gap-3 w-full">
          <TaskAttribute type="priority" label="Prioridad" value={priority}>
            <Flag size={18} className="text-gray-500" />
          </TaskAttribute>
          <TaskAttribute
            type="user"
            label="Solicitante"
            value=""
            user={{ imageUrl: author.avatar, name: author.name }}
          >
            <UserPlus size={18} className="text-gray-500" />
          </TaskAttribute>
          <TaskAttribute
            type="user"
            label="Asignado a"
            value=""
            user={{
              imageUrl: assignedTo?.avatar,
              name: assignedTo?.name || 'Sin asignar',
            }}
          >
            <Flag size={18} className="text-gray-500" />
          </TaskAttribute>
        </div>
      </div>

      <article className="my-6 bg-gray-100 p-4 rounded-md">
        <h2 className="text-lg font-semibold mb-2">Descripción</h2>
        <p>{description}</p>
      </article>

      <FileTable taskId={id} />
    </>
  )
}
