import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
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
import { createVersionSchema } from './schemas/delivery.schema'
import type { z } from 'zod'
import { Button } from '@/components/ui/button'
import { useDeliveries } from '@/hooks/useDeliveries'
import { Spinner } from '@/components/ui/spinner'
import { useEffect } from 'react'
import { useTaskStore } from '@/store/taskStore'
import { useTaskViewStore } from '@/store/taskViewStore'

interface Props {
  deliveryId?: string
  open: boolean
  onOpenChange: (open: boolean) => void
}

export const CreateVersion = ({ deliveryId, open, onOpenChange }: Props) => {
  const { createVersion } = useDeliveries()

  const { task } = useTaskViewStore()

  const form = useForm<z.infer<typeof createVersionSchema>>({
    resolver: zodResolver(createVersionSchema),
    defaultValues: {
      description: '',
      file: undefined,
      deliveryId,
    },
  })

  const onSubmit = async (version: z.infer<typeof createVersionSchema>) => {
    createVersion.mutate({ ...version, taskId: task?.id })
    onOpenChange(false)
  }

  useEffect(() => {
    if (deliveryId) {
      form.setValue('deliveryId', deliveryId)
    }
  }, [deliveryId])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nueva versión</DialogTitle>
          <DialogDescription>
            Agrega una nueva versión a la entrega
          </DialogDescription>
        </DialogHeader>
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 flex flex-col"
              id="version-form"
            >
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descripción corta</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Escribe la descripción para esta versión"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Las versiones se enumeran automáticamente.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="file"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Archivo</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        onChange={(e) => field.onChange(e.target.files?.[0])}
                      />
                    </FormControl>
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
            form="version-form"
            disabled={createVersion.isPending}
          >
            {createVersion.isPending ? (
              <>
                <Spinner />
                Creando
              </>
            ) : (
              'Crear'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
