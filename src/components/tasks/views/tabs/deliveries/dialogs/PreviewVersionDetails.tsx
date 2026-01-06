import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Spinner } from '@/components/ui/spinner'
import type { Version } from '@/lib/api/interfaces/deliveries.interface'
import { getVersionFile } from '@/lib/api/versions'
import { useQuery } from '@tanstack/react-query'
import { type FC } from 'react'

interface Props {
  version?: Version
  open: boolean
  onOpenChange: (open: boolean) => void
}

export const PreviewVersionDetails: FC<Props> = ({
  version,
  open,
  onOpenChange,
}) => {
  const { data: path, isPending } = useQuery({
    queryKey: ['version-file', version?.id],
    queryFn: () => getVersionFile({ versionId: version?.id!, download: false }),
    enabled: !!version,
  })

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Detalles de la versión: {version?.description}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {version?.comment ? version.comment : '<No hay comentarios>'}
          </AlertDialogDescription>
          <div>
            <p>Estado: {version?.status}</p>
            <p>Fecha: {version?.createdAt}</p>
            {isPending ? (
              <Spinner />
            ) : (
              <img src={path} alt={version?.description} />
            )}
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction>Cerrar</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
