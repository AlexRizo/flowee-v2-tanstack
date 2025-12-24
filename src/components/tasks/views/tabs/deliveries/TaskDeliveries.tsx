import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { useState, type FC } from 'react'
import { AddDelivery } from './AddDelivery'
import { useDeliveries } from '@/hooks/useDeliveries'
import { DeliveriesList } from './DeliveriesList'
import { Spinner } from '@/components/ui/spinner'
import { CreateVersion } from './CreateVersion'
import { CheckVersion } from './CheckVersion'
import type { Version } from '@/lib/api/interfaces/deliveries.interface'

interface Props {
  taskId: string
}

export const TaskDeliveries: FC<Props> = ({ taskId }) => {
  const { deliveriesQuery } = useDeliveries(taskId)

  const [deliveryId, setDeliveryId] = useState<string | undefined>(undefined)
  const [version, setVersion] = useState<Version | undefined>(undefined)

  const [openVersionDialog, setOpenVersionDialog] = useState(false)
  const [openCheckVersionDialog, setOpenCheckVersionDialog] = useState(false)

  const handleCreateVersion = (deliveryId: string) => {
    setDeliveryId(deliveryId)
    setOpenVersionDialog(!openVersionDialog)
  }

  const handleCheckVersion = (version: Version) => {
    setVersion(version)
    setOpenCheckVersionDialog(!openCheckVersionDialog)
  }

  return (
    <>
      <div className="flex items-center mb-6">
        <h1 className="font-bold mr-4">Listado de entregas</h1>
        <AddDelivery taskId={taskId}>
          <Button size="sm">
            <Plus /> Nueva
          </Button>
        </AddDelivery>
      </div>
      <article className="bg-amber-50 rounded-md p-4">
        <h2 className="font-medium">Pro Tip</h2>
        <p className="text-sm">
          Crea todas las entregas necesarias. Nombra cada una de forma simple y
          descriptiva, pensando en que puedes generar múltiples entregas para la
          misma tarea.
        </p>
      </article>
      {deliveriesQuery.isPending ? (
        <div className="flex items-center justify-center mt-6">
          <Spinner />
        </div>
      ) : (
        <div className="mt-6">
          {!deliveriesQuery.data ? (
            <small className="text-muted-foreground">No hay entregas</small>
          ) : (
            deliveriesQuery.data?.map((delivery) => (
              <DeliveriesList
                key={delivery.id}
                {...delivery}
                onOpenVersionDialog={handleCreateVersion}
                onOpenCheckVersionDialog={handleCheckVersion}
              />
            ))
          )}
        </div>
      )}

      <CreateVersion
        deliveryId={deliveryId}
        open={openVersionDialog}
        onOpenChange={setOpenVersionDialog}
      />
      <CheckVersion
        version={version}
        open={openCheckVersionDialog}
        onOpenChange={setOpenCheckVersionDialog}
      />
    </>
  )
}
