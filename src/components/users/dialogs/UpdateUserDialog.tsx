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
import { useEffect, useMemo } from 'react'
import { updateUserSchema } from './schemas/user.schemas'
import { useForm } from 'react-hook-form'
import type { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAdminUsers } from '@/hooks/admin/useAdminUsers'
import { SelectRole } from '../inputs/SelectRole'
import type { User } from '@/lib/api/interfaces/users.interface'
import { toast } from 'sonner'

interface Props {
  user: User | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export const UpdateUserDialog = ({ user, open, onOpenChange }: Props) => {
  const form = useForm<z.infer<typeof updateUserSchema>>({
    defaultValues: {
      name: user?.name ?? '',
      email: user?.email ?? '',
      username: user?.username ?? '',
      password: undefined,
      role: user?.role ?? undefined,
    },
    resolver: zodResolver(updateUserSchema),
  })

  const { updateUser } = useAdminUsers()

  const { mutate, isPending, error, isSuccess, reset } = useMemo(
    () => ({
      mutate: updateUser.mutate,
      isPending: updateUser.isPending,
      error: updateUser.error,
      isSuccess: updateUser.isSuccess,
      reset: updateUser.reset,
    }),
    [updateUser.isPending, updateUser.error, updateUser.isSuccess],
  )

  const onSubmit = (data: z.infer<typeof updateUserSchema>) => {
    if (!user) {
      toast.error('No se pudo actualizar el usuario.', {
        description: 'Se esperaba un id válido.',
        descriptionClassName: '!text-neutral-500',
      })
      return
    }

    mutate({
      id: user.id,
      ...data,
    })
  }

  useEffect(() => {
    if (user) {
      form.reset(user)
    }
  }, [user])

  useEffect(() => {
    if (isSuccess) {
      onOpenChange(false)
      form.reset()
    }
  }, [isSuccess, form])

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        onOpenChange(open)
        if (open) {
          form.reset()
        } else {
          setTimeout(() => {
            reset()
          }, 300)
        }
      }}
    >
      <Form {...form}>
        <DialogContent className="sm:max-w-[425px]">
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <DialogHeader>
              <DialogTitle>Editar usuario</DialogTitle>
              <DialogDescription>
                Ingresa los nuevos datos del usuario{' '}
                <span className="font-medium">{user?.name}</span> a
                continuación.
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
              title="Error al actualizar el usuario"
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
                    Actualizando...
                  </>
                ) : (
                  'Actualizar usuario'
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Form>
    </Dialog>
  )
}
