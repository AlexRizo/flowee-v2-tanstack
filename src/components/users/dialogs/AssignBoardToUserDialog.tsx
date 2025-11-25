import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useState, type FC, type ReactNode } from 'react'
import { SelectBoardToAssign } from '../inputs/SelectBoardToAssign'
import { useAdminBoards } from '@/hooks/admin/useAdminBoards'

interface Props {
  children: ReactNode
  targetId: string
}

export const AssignBoardToUserDialog: FC<Props> = ({ children, targetId }) => {
  const [boardId, setBoardId] = useState<string | null>(null)

  const { userBoards } = useAdminBoards(targetId)

  const { assignBoardToUser } = useAdminBoards(targetId)

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Asignar Tablero</DialogTitle>
          <DialogDescription>
            Selecciona el tablero que deseas asignar al usuario.
          </DialogDescription>
        </DialogHeader>
        <SelectBoardToAssign
          onChange={(boardId) => setBoardId(boardId)}
          currentUserBoards={userBoards?.data?.map((board) => board.id) ?? []}
        />
        <DialogFooter>
          <Button
            type="submit"
            className="w-full"
            onClick={() => {
              if (boardId) {
                assignBoardToUser.mutate({ boardId: boardId, userId: targetId })
              }
            }}
          >
            Asignar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
