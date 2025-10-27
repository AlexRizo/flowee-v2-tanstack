import {
  closestCenter,
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { Column } from './Column'

interface Column {
  id: string
  name: string
  color: string
  columnBackground?: string
  items: any[]
}

const columns: Column[] = [
  {
    id: 'column-1',
    name: 'Column 1',
    color: 'bg-gray-500',
    columnBackground: 'bg-gray-100',
    items: [],
  },
  {
    id: 'column-2',
    name: 'Column 2',
    color: 'bg-yellow-500',
    columnBackground: 'bg-yellow-50',
    items: [],
  },
  {
    id: 'column-3',
    name: 'Column 3',
    color: 'bg-blue-500',
    columnBackground: 'bg-blue-50',
    items: [],
  },
  {
    id: 'column-4',
    name: 'Column 4',
    color: 'bg-violet-500',
    columnBackground: 'bg-violet-50',
    items: [],
  },
  {
    id: 'column-5',
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

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter}>
      <section className="grid grid-cols-5 gap-5 w-max">
        {columns.map((column) => (
          <Column
            key={column.id}
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
