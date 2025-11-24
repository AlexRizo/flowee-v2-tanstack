import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useState, type FC, type ReactNode } from 'react'
import { SelectBoardToAssign } from '../inputs/SelectBoardToAssign'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import type {
  AssignBoardToUserDto,
  Board,
} from '@/lib/api/interfaces/boards.interface'
import type { ApiError } from '@/lib/api/api'
import { assignBoardToUser } from '@/lib/api/boards'

interface Props {
  children: ReactNode
  targetId: string
}

export const AssignBoardToUserDialog: FC<Props> = ({ children, targetId }) => {
  const [boardId, setBoardId] = useState<string | null>(null)
  const queryClient = useQueryClient()

  const currentUserBoards = queryClient.getQueryData<Board[]>([
    'boards',
    targetId,
  ])

  const { mutate: assignBoard, isPending } = useMutation<
    Board,
    ApiError,
    AssignBoardToUserDto
  >({
    mutationKey: ['boards', targetId],
    mutationFn: assignBoardToUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['boards', targetId] })
    },
    onError: (error) => {
      alert(error.message)
    },
  })

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
        {/* TODO: Implementar la lista de tableros */}
        <SelectBoardToAssign
          onChange={(boardId) => setBoardId(boardId)}
          currentUserBoards={currentUserBoards?.map((board) => board.id) ?? []}
        />
        <Button
          onClick={() => assignBoard({ boardId: boardId!, userId: targetId })}
        >
          Asignar
        </Button>
      </DialogContent>
    </Dialog>
  )
}
