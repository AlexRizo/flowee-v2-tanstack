import { FormError } from '@/components/global/FormError'
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
import { Spinner } from '@/components/ui/spinner'
import { Plus } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { createUserSchema } from './schemas/user.schemas'
import { useForm } from 'react-hook-form'
import type { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAdminUsers } from '@/hooks/admin/useAdminUsers'
import { SelectRole } from '../inputs/SelectRole'

export const CreateUserDialog = () => {
  const form = useForm<z.infer<typeof createUserSchema>>({
    defaultValues: {
      name: '',
      email: '',
      username: '',
      password: '',
      role: undefined,
    },
    resolver: zodResolver(createUserSchema),
  })

  const { createUser } = useAdminUsers()

  const { mutate, isPending, error, isSuccess, reset } = useMemo(
    () => ({
      mutate: createUser.mutate,
      isPending: createUser.isPending,
      error: createUser.error,
      isSuccess: createUser.isSuccess,
      reset: createUser.reset,
    }),
    [createUser.isPending, createUser.error, createUser.isSuccess],
  )

  const onSubmit = (data: z.infer<typeof createUserSchema>) => mutate(data)

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
        if (open) {
          form.reset()
        } else {
          setTimeout(() => {
            reset()
          }, 300)
        }
      }}
    >
      <DialogTrigger asChild>
        <Button>
          <Plus />
          Crear Usuario
        </Button>
      </DialogTrigger>

      <Form {...form}>
        <DialogContent className="sm:max-w-[425px]">
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <DialogHeader>
              <DialogTitle>Crea un nuevo usuario</DialogTitle>
              <DialogDescription>
                Ingresa los datos del nuevo usuario a continuación.
              </DialogDescription>
            </DialogHeader>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input placeholder="Nombre del usuario" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Correo electrónico</FormLabel>
                  <FormControl>
                    <Input placeholder="ejemplo@email.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre de usuario</FormLabel>
                  <FormControl>
                    <Input placeholder="usuario-01" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contraseña</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="**********"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rol</FormLabel>
                  <FormControl>
                    <SelectRole value={field.value} onChange={field.onChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormError
              title="Error al crear el usuario"
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
                  'Crear usuario'
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Form>
    </Dialog>
  )
}
