import { FormError } from '@/components/global/FormError'
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import { useAdminUsers } from '@/hooks/admin/useAdminUsers'
import { useEffect, useMemo, type FC } from 'react'
import { toast } from 'sonner'

interface Props {
  open: boolean
  setOpen: (open: boolean) => void
  name?: string
  id?: string
}

export const DeleteUserDialog: FC<Props> = ({ name, id, open, setOpen }) => {
  const { deleteUser } = useAdminUsers()

  const { mutate, error, isSuccess, isPending, reset } = useMemo(
    () => ({
      mutate: deleteUser.mutate,
      error: deleteUser.error,
      isSuccess: deleteUser.isSuccess,
      isPending: deleteUser.isPending,
      reset: deleteUser.reset,
    }),
    [deleteUser.error, deleteUser.isSuccess, deleteUser.isPending],
  )

  useEffect(() => {
    reset()

    if (isSuccess) {
      toast.success(`El usuario "${name}" ha sido eliminado.`)
      setOpen(false)
    }
  }, [isSuccess])

  return (
    <AlertDialog
      open={open}
      onOpenChange={(open) => {
        if (!open) {
          setTimeout(() => {
            reset()
          }, 300)
        }
        setOpen(open)
      }}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta acción no se puede deshacer. Esto eliminará permanentemente al
            usuario "
            <span className="font-medium">{name ?? 'desconocido'}</span>" pero
            las referencias a sus datos seguirán existiendo.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <FormError
          title="Error al eliminar el usuario"
          description="Detalles:"
          error={error?.details ?? error?.message}
          isPending={isPending}
        />
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancelar</AlertDialogCancel>
          <Button
            onClick={() => mutate(id as string)}
            disabled={isPending}
            className="bg-red-600 hover:bg-red-500"
          >
            {isPending ? (
              <>
                <Spinner />
                Eliminando
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
