import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormDescription,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { createDeliverySchema } from './schemas/delivery.schema'
import type { z } from 'zod'
import { Button } from '@/components/ui/button'
import { useDeliveries } from '@/hooks/useDeliveries'
import { useEffect, useState } from 'react'
import { Spinner } from '@/components/ui/spinner'

interface Props {
  taskId: string
  children: React.ReactNode
}

export const AddDelivery = ({ taskId, children }: Props) => {
  const { createDelivery } = useDeliveries()

  const form = useForm<z.infer<typeof createDeliverySchema>>({
    resolver: zodResolver(createDeliverySchema),
    defaultValues: {
      name: '',
      taskId,
    },
  })

  const [open, setOpen] = useState(false)

  const onSubmit = async (delivery: z.infer<typeof createDeliverySchema>) => {
    createDelivery.mutate(delivery)
  }

  useEffect(() => {
    if (createDelivery.isSuccess) {
      setOpen(false)
    }
  }, [createDelivery.isSuccess])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nueva entrega</DialogTitle>
          <DialogDescription>
            Agrega una nueva entrega a la tarea
          </DialogDescription>
        </DialogHeader>
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8 flex flex-col"
              id="delivery-form"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Escribe el nombre de esta entrega"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Ejemplo: "Entrega: Espectacular madero"
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DialogClose>
          <Button
            type="submit"
            form="delivery-form"
            disabled={createDelivery.isPending}
          >
            {createDelivery.isPending ? (
              <>
                <Spinner />
                Agregando
              </>
            ) : (
              'Agregar'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
