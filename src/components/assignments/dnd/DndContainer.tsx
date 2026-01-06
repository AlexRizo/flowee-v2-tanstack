import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from '@dnd-kit/core'
import { PendingColumn } from '../PendingColumn'
import { DesignerCard } from '../DesignerCard'
import { useBoardStore } from '@/store/boardStore'
import { usePendingTasks } from '@/hooks/useTasks'
import { useAssignments } from '@/hooks/useAssignments'
import type { Task } from '@/lib/api/interfaces/tasks.interface'
import { useQueryClient } from '@tanstack/react-query'
import { PendingTaskCard } from '../PendingTaskCard'
import { appSocket } from '@/lib/ws/appSocket'
import { useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { MyCard } from '../MyCard'

export const DndContainer = () => {
  const { user } = useAuth()

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    }),
  )
  const [activeTask, setActiveTask] = useState<Task | null>(null)

  const queryClient = useQueryClient()

  const { selectedBoardId } = useBoardStore()

  const { pendingTasksQuery } = usePendingTasks({ boardId: selectedBoardId })

  const { boardDesigners } = useAssignments(selectedBoardId)

  const handleDragStart = (event: DragStartEvent) => {
    const id = event.active.id

    const task = pendingTasksQuery.data?.find((tsk) => tsk.id === id) || null

    if (!task) return

    setActiveTask(task)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (!over || over.id === 'PENDING') return

    const taskId = active.id

    queryClient.setQueryData(
      ['pending-tasks', selectedBoardId],
      (old: Task[]) => {
        if (!old) return old

        return old.filter((tsk) => tsk.id !== taskId)
      },
    )

    appSocket.emit('assign-task', {
      taskId,
      userId: over.id,
    })
  }

  return (
    <DndContext
      sensors={sensors}
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
    >
      <section className="flex flex-row gap-8 my-8">
        <PendingColumn pendingTasks={pendingTasksQuery.data || []} />
        <div role="grid" className="h-max flex flex-row flex-wrap gap-2">
          <MyCard {...user!} />
          {boardDesigners.users?.map((designer) => (
            <DesignerCard key={designer.id} {...designer} />
          ))}
        </div>
        <DragOverlay dropAnimation={null}>
          {activeTask && <PendingTaskCard {...activeTask} />}
        </DragOverlay>
      </section>
    </DndContext>
  )
}
