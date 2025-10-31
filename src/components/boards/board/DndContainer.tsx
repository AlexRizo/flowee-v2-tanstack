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
import { useEffect } from 'react'
import { toast } from 'sonner'
import { TaskStatus } from '@/lib/api/interfaces/tasks.interface'

interface Column {
  id: TaskStatus
  name: string
  color: string
  columnBackground?: string
  items: any[]
}

const columns: Column[] = [
  {
    id: TaskStatus.PENDING,
    name: 'Column 1',
    color: 'bg-gray-500',
    columnBackground: 'bg-gray-100',
    items: [],
  },
  {
    id: TaskStatus.ATTENTION,
    name: 'Column 2',
    color: 'bg-yellow-500',
    columnBackground: 'bg-yellow-50',
    items: [],
  },
  {
    id: TaskStatus.IN_PROGRESS,
    name: 'Column 3',
    color: 'bg-blue-500',
    columnBackground: 'bg-blue-50',
    items: [],
  },
  {
    id: TaskStatus.FOR_REVIEW,
    name: 'Column 4',
    color: 'bg-violet-500',
    columnBackground: 'bg-violet-50',
    items: [],
  },
  {
    id: TaskStatus.DONE,
    name: 'Column 5',
    color: 'bg-green-500',
    columnBackground: 'bg-green-50',
    items: [],
  },
]

export const DndContainer = () => {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    }),
  )

  const { selectedBoardId } = useBoardStore()

  const { tasks } = useTasks({ boardId: selectedBoardId })

  useEffect(() => {
    if (tasks.isSuccess && !tasks.data?.length) {
      toast.info('No se encontraron tareas para este tablero.')
    }
  }, [tasks.data])

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
            items={column.items}
          />
        ))}
      </section>
    </DndContext>
  )
}
