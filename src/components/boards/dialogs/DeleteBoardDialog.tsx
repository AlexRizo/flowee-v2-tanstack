import { FormError } from '@/components/global/FormError'
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import { useAdminBoards } from '@/hooks/admin/useAdminBoards'
import { Trash } from 'lucide-react'
import { useEffect, useMemo, type FC } from 'react'
import { toast } from 'sonner'

interface Props {
  name: string
  id: string
}

export const DeleteBoardDialog: FC<Props> = ({ name, id }) => {
  const { deleteBoard } = useAdminBoards()

  const { mutate, error, isSuccess, isPending, reset } = useMemo(
    () => ({
      mutate: deleteBoard.mutate,
      error: deleteBoard.error,
      isSuccess: deleteBoard.isSuccess,
      isPending: deleteBoard.isPending,
      reset: deleteBoard.reset,
    }),
    [deleteBoard.error, deleteBoard.isSuccess, deleteBoard.isPending],
  )

  useEffect(() => {
    reset()

    if (isSuccess) {
      toast.success(`El tablero "${name}" ha sido eliminado.`)
    }
  }, [isSuccess])

  return (
    <AlertDialog
      onOpenChange={(open) => {
        if (!open) {
          setTimeout(() => {
            reset()
          }, 300)
        }
      }}
    >
      <AlertDialogTrigger>
        <span className="size-6 bg-white/60 rounded-full flex items-center justify-center cursor-pointer">
          <Trash size={16} />
        </span>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta acción no se puede deshacer. Esto eliminará permanentemente el
            tablero "<span className="font-medium">{name}</span>" y toda la
            información asociada a él.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <FormError
          title="Error al eliminar el tablero"
          description="Detalles:"
          error={error?.details ?? error?.message}
          isPending={isPending}
        />
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancelar</AlertDialogCancel>
          <Button
            onClick={() => mutate(id)}
            disabled={isPending}
            className="bg-red-600 hover:bg-red-500"
          >
            {isPending ? (
              <>
                <Spinner />
                Eliminando...
              </>
            ) : (
              'Eliminar'
            )}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
