import { FormError } from '@/components/global/FormError'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import type { FC } from 'react'

interface Props {
  error?: string | string[]
  isPending: boolean
  isOpen: boolean
  step: number
  setStep: (step: number) => void
  setIsOpen: (isOpen: boolean) => void
}

export const FilesMessageDialog: FC<Props> = ({
  error,
  isPending,
  isOpen,
  step,
  setStep,
  setIsOpen,
}) => {
  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>¡Atención!</AlertDialogTitle>
          <AlertDialogDescription className="space-y-5">
            <p>
              Hubo un problema al subir los archivos adjuntos. La tarea se ha
              creado correctamente, pero los archivos no se han podido asociar.
              Por favor, intenta subirlos de nuevo más tarde.
            </p>
            <FormError
              error={error}
              isPending={isPending}
              title="Error al subir los archivos"
            />
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          {/* TODO: change step to done */}
          <AlertDialogAction onClick={() => {
            setIsOpen(false)
            setStep(5)
          }}>
            Entendido
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
