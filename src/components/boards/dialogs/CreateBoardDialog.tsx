import { Button } from '@/components/ui/button'
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
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Plus } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAdminBoards } from '@/hooks/admin/useAdminBoards'
import { createBoardSchema } from './schemas/board.schemas'
import { useEffect, useMemo, useState } from 'react'
import { FormError } from '@/components/global/FormError'
import { Spinner } from '@/components/ui/spinner'

export const CreateBoardDialog = () => {
  const form = useForm<z.infer<typeof createBoardSchema>>({
    defaultValues: {
      name: '',
      slug: '',
      prefix: '',
      color: '#000000',
    },
    resolver: zodResolver(createBoardSchema),
  })

  const { createBoard } = useAdminBoards()

  const { mutate, isPending, error, isSuccess } = useMemo(
    () => ({
      mutate: createBoard.mutate,
      isPending: createBoard.isPending,
      error: createBoard.error,
      isSuccess: createBoard.isSuccess,
    }),
    [createBoard.isPending, createBoard.error, createBoard.isSuccess],
  )

  const onSubmit = (data: z.infer<typeof createBoardSchema>) => mutate(data)

  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (isSuccess) {
      setOpen(false)
      form.reset()
    }
  }, [isSuccess, form])

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        setOpen(open)
        if (open) form.reset()
      }}
    >
      <DialogTrigger asChild>
        <Button variant="outline">
          <Plus />
          Crear Tablero
        </Button>
      </DialogTrigger>

      <Form {...form}>
        <DialogContent className="sm:max-w-[425px]">
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <DialogHeader>
              <DialogTitle>Crea un nuevo tablero</DialogTitle>
              <DialogDescription>
                Ingresa los datos del nuevo tablero a continuación.
              </DialogDescription>
            </DialogHeader>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input placeholder="Nombre del tablero" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Slug</FormLabel>
                  <FormControl>
                    <Input placeholder="Slug" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="prefix"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Prefijo</FormLabel>
                  <FormControl>
                    <Input placeholder="PX" {...field} maxLength={2} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="color"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Color</FormLabel>
                  <FormControl>
                    <Input type="color" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormError
              title="Error al crear el tablero"
              error={error?.details ?? error?.message}
              isPending={isPending}
            />
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline" disabled={isPending}>
                  Cancelar
                </Button>
              </DialogClose>
              <Button type="submit" disabled={isPending}>
                {isPending ? (
                  <>
                    <Spinner />
                    Creando...
                  </>
                ) : (
                  'Crear Tablero'
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Form>
    </Dialog>
  )
}
