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
  FormDescription,
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useDeliveries } from '@/hooks/useDeliveries'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useEffect } from 'react'
import {
  VersionStatus,
  type Version,
} from '@/lib/api/interfaces/deliveries.interface'
import { updateVersionSchema } from './schemas/delivery.schema'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import { Textarea } from '@/components/ui/textarea'
import { SelectVersionStatus } from './SelectVersionStatus'

interface Props {
  version?: Version
  open: boolean
  onOpenChange: (open: boolean) => void
}

export const CheckVersion = ({ version, open, onOpenChange }: Props) => {
  const { checkVersion } = useDeliveries()

  const form = useForm<z.infer<typeof updateVersionSchema>>({
    resolver: zodResolver(updateVersionSchema),
    defaultValues: {
      comment: version?.comment || '',
      versionId: version?.id,
      status: version?.status,
    },
  })

  const onSubmit = async (version: z.infer<typeof updateVersionSchema>) => {
    checkVersion.mutate(version)
    onOpenChange(false)
  }

  useEffect(() => {
    if (version) {
      form.reset({
        comment: version.comment || '',
        status: version.status,
        versionId: version.id,
      })
    }
  }, [version?.id])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Versión: {version?.description}</DialogTitle>
          <DialogDescription>
            Acepta/Rechaza y envía una observación para la versión seleccionada
          </DialogDescription>
        </DialogHeader>
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 flex flex-col"
              id="check-version-form"
            >
              <FormField
                control={form.control}
                name="comment"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descripción corta</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Escribe la descripción para esta versión"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Estado</FormLabel>
                    <FormControl>
                      <SelectVersionStatus
                        value={field.value}
                        onChange={field.onChange}
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
            form="check-version-form"
            disabled={checkVersion.isPending}
          >
            {checkVersion.isPending ? (
              <>
                <Spinner />
                Enviando
              </>
            ) : (
              'Enviar'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
