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
import { getVersionStatus } from '@/helpers/version'
import {
  VersionStatus,
  type Version,
} from '@/lib/api/interfaces/deliveries.interface'
import { getVersionFile } from '@/lib/api/versions'
import { cn } from '@/lib/utils'
import { useQuery } from '@tanstack/react-query'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
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
            <p>
              <strong>Fecha:</strong>{' '}
              {format(
                new Date(version?.createdAt || new Date()),
                "dd 'de' MMMM 'del' yyyy 'a las' hh:mm a",
                {
                  locale: es,
                },
              )}
            </p>
            <p>
              <strong>Estado:</strong>{' '}
              <span
                className={cn(
                  'font-medium',
                  version?.status === VersionStatus.ACCEPTED
                    ? 'text-green-700'
                    : version?.status === VersionStatus.REJECTED
                      ? 'text-red-700'
                      : 'text-yellow-600',
                )}
              >
                {getVersionStatus(version?.status || VersionStatus.PENDING)}.
              </span>
            </p>
            {isPending ? (
              <Spinner />
            ) : (
              <img
                src={path}
                alt={version?.description}
                className="rounded mt-4"
              />
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
