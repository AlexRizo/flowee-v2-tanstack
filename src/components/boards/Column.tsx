import { cn } from '@/lib/utils'
import { type FC } from 'react'

interface Props {
  color?: string
  columnBackground?: string
  name: string
  items: any[]
}

export const Column: FC<Props> = ({
  color = 'bg-gray-600',
  columnBackground = 'bg-gray-200',
  name,
  items = [],
}) => {

  return (
    <div className={cn('rounded-md h-full min-w-62.5 p-2', columnBackground)}>
      <div className="flex items-center gap-0.5">
        <span className={cn('h-4 w-[5px] rounded mr-1', color)}></span>
        <h2 className="font-medium text-sm text-stone-800">{name}</h2>
        <small className="text-muted-foreground">({items.length})</small>
      </div>
      <div role='contentinfo'>
        
      </div>
    </div>
  )
}
