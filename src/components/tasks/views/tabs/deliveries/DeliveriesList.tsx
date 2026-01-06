import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from '@/components/ui/accordion'
import * as AccordionPrimitive from '@radix-ui/react-accordion'
import {
  VersionStatus,
  type Delivery,
  type Version,
} from '@/lib/api/interfaces/deliveries.interface'
import { useMemo, type FC } from 'react'
import {
  ChevronRight,
  Download,
  ExternalLink,
  Eye,
  Image,
  MessageSquare,
  Plus,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useVersion } from '@/hooks/useVersion'
import { ProtectedItem } from '@/components/protected/ProtectedItem'

interface Props extends Delivery {
  onOpenVersionDialog: (deliveryId: string) => void
  onOpenCheckVersionDialog: (version: Version) => void
  onOpenPreviewVersionDialog: (version: Version) => void
}

export const DeliveriesList: FC<Props> = ({
  id,
  name,
  versions,
  onOpenVersionDialog,
  onOpenCheckVersionDialog,
  onOpenPreviewVersionDialog,
}) => {
  const { versionFileMutation } = useVersion()

  const anyVersionPending = useMemo(() => {
    return versions?.some((version) => version.status === VersionStatus.PENDING)
  }, [versions])

  const anyVersionAccepted = useMemo(() => {
    return versions?.some(
      (version) => version.status === VersionStatus.ACCEPTED,
    )
  }, [versions])

  const handleVersionFile = (versionId: string, download: boolean) => {
    versionFileMutation.mutate({
      versionId,
      download,
    })
  }

  return (
    <Accordion type="single" collapsible className="mb-4 border">
      <AccordionItem value={id}>
        <AccordionPrimitive.Header className="flex text-xs px-4 py-2 bg-purple-100">
          <AccordionPrimitive.Trigger className="group flex items-center w-full gap-2">
            <ChevronRight
              size={16}
              className="transition-transform group-data-[state=open]:rotate-90"
            />
            <span className="font-medium">{name}</span>
          </AccordionPrimitive.Trigger>
          <button
            className={cn(
              'flex items-center gap-1 hover:underline cursor-pointer',
              (anyVersionPending || anyVersionAccepted) &&
                'opacity-50 cursor-not-allowed',
            )}
            disabled={anyVersionPending || anyVersionAccepted}
          >
            <p
              className="font-medium text-nowrap"
              onClick={() => onOpenVersionDialog(id)}
            >
              Nueva versión
            </p>
            <Plus size={16} />
          </button>
        </AccordionPrimitive.Header>
        <AccordionContent className="bg-gray-50 p-0 divide-y">
          {!versions || !versions.length ? (
            <div className="flex items-center justify-center py-2">
              <small className="text-muted-foreground">No hay versiones.</small>
            </div>
          ) : (
            versions.reverse().map((version, index) => (
              <div
                key={version.id}
                className={cn(
                  'px-2 py-1 flex items-center gap-2',
                  version.status === VersionStatus.ACCEPTED && 'bg-green-50',
                  version.status === VersionStatus.REJECTED &&
                    'bg-red-50 opacity-50',
                )}
              >
                <Image size={16} />
                <p>
                  Versión {index + 1}: {version.description}
                </p>
                <div className="ml-auto space-x-4">
                  <button>
                    <ExternalLink
                      size={16}
                      onClick={() => handleVersionFile(version.id, false)}
                    />
                  </button>
                  <button>
                    <Download
                      size={16}
                      onClick={() => handleVersionFile(version.id, true)}
                    />
                  </button>
                  <button onClick={() => onOpenPreviewVersionDialog(version)}>
                    <Eye size={16} />
                  </button>
                  <ProtectedItem role="pub-des-manager">
                    {index === versions.length - 1 && (
                      <button onClick={() => onOpenCheckVersionDialog(version)}>
                        <MessageSquare size={16} />
                      </button>
                    )}
                  </ProtectedItem>
                </div>
              </div>
            ))
          )}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
