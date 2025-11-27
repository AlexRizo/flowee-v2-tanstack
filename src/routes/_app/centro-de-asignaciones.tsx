import { DesignerCard } from '@/components/assignments/DesignerCard'
import { PendingColumn } from '@/components/assignments/PendingColumn'
import { useAssignments } from '@/hooks/useAssignments'
import { usePendingTasks } from '@/hooks/useTasks'
import { useBoardStore } from '@/store/boardStore'
import { createFileRoute } from '@tanstack/react-router'
import { useEffect } from 'react'

export const Route = createFileRoute('/_app/centro-de-asignaciones')({
  component: RouteComponent,
})

function RouteComponent() {
  const { selectedBoardId } = useBoardStore()

  const { pendingTasksQuery } = usePendingTasks({ boardId: selectedBoardId })

  const { boardDesigners } = useAssignments(selectedBoardId)

  useEffect(() => {
    if (!boardDesigners.users) return

    console.log(boardDesigners.users)
  }, [boardDesigners.users])

  return (
    <section>
      <h1 className="text-3xl font-medium">Centro de Asignaciones</h1>
      <div role="group" className="flex gap-8 my-8">
        <PendingColumn pendingTasks={pendingTasksQuery.data || []} />
        <div role="grid" className="w-fit flex flex-row flex-wrap gap-2">
          {boardDesigners.users?.map((designer) => (
            <DesignerCard key={designer.id} {...designer} />
          ))}
        </div>
      </div>
    </section>
  )
}
