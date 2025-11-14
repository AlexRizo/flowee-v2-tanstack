import { Button } from '@/components/ui/button'
import { TaskStatus, type Task } from '@/lib/api/interfaces/tasks.interface'
import { cn } from '@/lib/utils'
import { Link } from '@tanstack/react-router'
import { Plus } from 'lucide-react'
import { type FC } from 'react'
import { Card } from './Card'

interface Props {
  id: TaskStatus
  color?: string
  columnBackground?: string
  name: string
  items: Task[]
}

export const Column: FC<Props> = ({
  id,
  color = 'bg-gray-600',
  columnBackground = 'bg-gray-200',
  name,
  items = [],
}) => {
  return (
    <div className={cn('rounded-md h-full min-w-62.5 p-2', columnBackground)}>
      <div className="flex items-center gap-0.5 h-6">
        <span className={cn('h-4 w-[5px] rounded mr-1', color)}></span>
        <h2 className="font-medium text-sm text-stone-800">{name}</h2>
        <small className="text-muted-foreground">({items.length})</small>
        {id === TaskStatus.PENDING && (
          <Link to="/tareas/nueva" className="ml-auto">
            <Button
              size="sm"
              className="bg-indigo-600 hover:bg-indigo-700 text-xs h-auto py-1 !px-1.5"
            >
              <Plus size={10} />
              Nueva
            </Button>
          </Link>
        )}
      </div>
      <div role="contentinfo" className='mt-2 space-y-1.5'>
        {items.map((item) => (
          <Card key={item.id} {...item} />
        ))}
      </div>
    </div>
  )
}
