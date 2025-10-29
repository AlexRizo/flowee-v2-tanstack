import { CreateBoardDialog } from '@/components/boards/dialogs/CreateBoardDialog'
import { BoardsGrid } from '@/components/boards/grid/BoardsGrid'
import { useAdminBoards } from '@/hooks/admin/useAdminBoards'
import { createFileRoute } from '@tanstack/react-router'
import { useEffect } from 'react'
import { toast } from 'sonner'

export const Route = createFileRoute('/_app/tableros/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { boards } = useAdminBoards()

  useEffect(() => {
    if (boards.error) {
      toast.error(boards.error.message)
    }
  }, [boards])

  return (
    <section className="w-full">
      <div role="heading" className="flex justify-between pb-4 px-1.5 border-b">
        <h1 className="text-2xl font-semibold">Tableros</h1>
        <CreateBoardDialog />
      </div>
      <BoardsGrid boards={boards.data ?? []} />
    </section>
  )
}
