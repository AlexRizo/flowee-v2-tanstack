import {
  closestCenter,
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { Column } from './Column'
import { useTasks } from '@/hooks/useTasks'
import { useBoardStore } from '@/store/boardStore'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { TaskStatus } from '@/lib/api/interfaces/tasks.interface'

interface Column {
  id: TaskStatus
  name: string
  color: string
  columnBackground?: string
}

const columns: Column[] = [
  {
    id: TaskStatus.PENDING,
    name: 'Column 1',
    color: 'bg-gray-500',
    columnBackground: 'bg-gray-100',
  },
  {
    id: TaskStatus.ATTENTION,
    name: 'Column 2',
    color: 'bg-yellow-500',
    columnBackground: 'bg-yellow-50',
  },
  {
    id: TaskStatus.IN_PROGRESS,
    name: 'Column 3',
    color: 'bg-blue-500',
    columnBackground: 'bg-blue-50',
  },
  {
    id: TaskStatus.FOR_REVIEW,
    name: 'Column 4',
    color: 'bg-violet-500',
    columnBackground: 'bg-violet-50',
  },
  {
    id: TaskStatus.DONE,
    name: 'Column 5',
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

  const { selectedBoardId } = useBoardStore()

  const { tasks, tasksQuery } = useTasks({ boardId: selectedBoardId })

  useEffect(() => {
    if (tasksQuery.isSuccess && tasks.unorder.length === 0) {
      toast.info('No se encontraron tareas para este tablero.')
    }
  }, [tasksQuery.data])

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter}>
      <section className="grid grid-cols-5 gap-6 w-max">
        {columns.map((column) => (
          <Column
            key={column.id}
            id={column.id}
            color={column.color}
            columnBackground={column.columnBackground}
            name={column.name}
            items={tasks.order[column.id]}
          />
        ))}
      </section>
    </DndContext>
  )
}
