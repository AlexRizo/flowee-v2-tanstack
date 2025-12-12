import {
  closestCenter,
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from '@dnd-kit/core'
import { SortableContext } from '@dnd-kit/sortable'
import { Column } from './Column'
import { useTasks } from '@/hooks/useTasks'
import { useBoardStore } from '@/store/boardStore'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { TaskStatus, type Task } from '@/lib/api/interfaces/tasks.interface'
import { OverlayCard } from './OverlayCard'
import { appSocket } from '@/lib/ws/appSocket'
import type {
  AssignedTaskPayload,
  UpdateTaskStatusPayload,
} from '@/lib/ws/interfaces/ws-task.interface'
import { useAuth } from '@/hooks/useAuth'
import { Role } from '@/lib/api/interfaces/auth.interface'
import { TaskView } from '@/components/tasks/views/TaskView'

interface Column {
  id: TaskStatus
  name: string
  color: string
  columnBackground?: string
}

const columns: Column[] = [
  {
    id: TaskStatus.PENDING,
    name: 'Pendiente',
    color: 'bg-gray-500',
    columnBackground: 'bg-gray-100',
  },
  {
    id: TaskStatus.ATTENTION,
    name: 'Atención',
    color: 'bg-yellow-500',
    columnBackground: 'bg-yellow-50',
  },
  {
    id: TaskStatus.IN_PROGRESS,
    name: 'En progreso',
    color: 'bg-blue-500',
    columnBackground: 'bg-blue-50',
  },
  {
    id: TaskStatus.FOR_REVIEW,
    name: 'Para revisión',
    color: 'bg-violet-500',
    columnBackground: 'bg-violet-50',
  },
  {
    id: TaskStatus.DONE,
    name: 'Hecho',
    color: 'bg-green-500',
    columnBackground: 'bg-green-50',
  },
]

export const DndContainer = () => {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    }),
  )

  const { user } = useAuth()

  const [activeTask, setActiveTask] = useState<Task | null>(null)
  const [activeStatus, setActiveStatus] = useState<TaskStatus | null>(null)

  const { selectedBoardId } = useBoardStore()

  const { tasks, moveTask, setTask, tasksQuery } = useTasks({
    boardId: selectedBoardId,
  })

  useEffect(() => {
    if (tasksQuery.isSuccess && tasks.unorder.length === 0) {
      toast.info('No se encontraron tareas para este tablero.')
    }
  }, [tasksQuery.data])

  const handleDragStart = (event: DragStartEvent) => {
    const [status, taskId] = event.active.id.toString().split('|')
    const columnTasks = tasks.order[status as TaskStatus] ?? []

    const task = columnTasks.find((tsk) => tsk.id === taskId) || null

    setActiveTask(task)
    setActiveStatus(status as TaskStatus)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (!over) return

    const [fromStatus, taskId] = active.id.toString().split('|')
    const [toStatus] = over.id.toString().split('|')

    if (fromStatus === toStatus) return

    appSocket.emit('move-task-status', {
      taskId,
      fromStatus,
      toStatus,
    })
    moveTask(fromStatus as TaskStatus, toStatus as TaskStatus, taskId)
  }

  useEffect(() => {
    if (!selectedBoardId) return

    const updateTaskStatusHandler = (data: UpdateTaskStatusPayload) => {
      if (data.clientId === appSocket.id) return
      moveTask(data.fromStatus, data.toStatus, data.taskId)
    }

    const assignTaskHandler = ({ task }: AssignedTaskPayload) => {
      console.log(task)
      setTask(task)
    }

    const handleJoinBoard = () => {
      const allowedRoles: Role[] = [
        Role.ADMIN,
        Role.DESIGNER_ADMIN,
        Role.PUBLISHER_ADMIN,
        Role.READER,
        Role.SUPER_ADMIN,
      ]

      if (!user) return

      if (!allowedRoles.includes(user.role)) return
      appSocket.emit('join-board', { boardId: selectedBoardId })
    }

    if (appSocket.connected) {
      handleJoinBoard()
    }

    appSocket.on('connect', handleJoinBoard)

    appSocket.on('task-moved', updateTaskStatusHandler)
    appSocket.on('task-assigned', assignTaskHandler)

    return () => {
      appSocket.off('connect', handleJoinBoard)
      appSocket.off('task-moved', updateTaskStatusHandler)
      appSocket.off('task-assigned', assignTaskHandler)
    }
  }, [selectedBoardId, user, appSocket])

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
    >
      <>
        <section className="grid grid-cols-5 gap-6 w-max">
          {columns.map((column) => (
            <SortableContext
              key={column.id}
              items={tasks.order[column.id].map(
                (task) => `${column.id}|${task.id}`,
              )}
            >
              <Column
                id={column.id}
                color={column.color}
                columnBackground={column.columnBackground}
                name={column.name}
                items={tasks.order[column.id]}
              />
            </SortableContext>
          ))}
        </section>

        <DragOverlay>
          {activeTask && activeStatus && (
            <OverlayCard {...activeTask} status={activeStatus} />
          )}
        </DragOverlay>
      </>
    </DndContext>
  )
}
