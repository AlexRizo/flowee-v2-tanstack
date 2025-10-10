import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { getMe } from '@/lib/api/auth'
import type { AuthUser } from '@/lib/api/interfaces/auth.interface'
import { createFileRoute, redirect } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAuth } from '@/hooks/useAuth'
import { Spinner } from '@/components/ui/spinner'
import { AuthError } from '@/components/auth/AuthError'

export const Route = createFileRoute('/auth/')({
  component: Auth,
  beforeLoad: async ({ context }) => {
    try {
      const user =
        context.queryClient.getQueryData<AuthUser>(['auth', 'user']) ??
        (await context.queryClient.fetchQuery({
          queryKey: ['auth', 'user'],
          queryFn: async () => await getMe(),
        }))

      if (!user) {
        return redirect({
          to: '/',
        })
      }
    } catch (error) {
      context.queryClient.removeQueries({ queryKey: ['auth', 'user'] })
    }
  },
})

const loginSchema = z.object({
  email: z
    .email({ error: 'El correo no es válido' })
    .min(1, 'El correo es obligatorio'),
  password: z
    .string({
      error: 'La contraseña es obligatoria',
    })
    .min(1, 'La contraseña es obligatoria'),
})

function Auth() {
  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(loginSchema),
  })

  const { loginMutate, isLoginPending, loginError } = useAuth()

  const onSubmit = (data: z.infer<typeof loginSchema>) => {
    loginMutate(data)
  }

  return (
    <main className="h-screen w-screen">
      <section className="w-full h-full flex">
        <aside className="size-full bg-gradient-to-tr from-rose-500 to-amber-500"></aside>
        <div className="px-30 flex flex-col justify-center">
          <h1 className="text-4xl font-bold">¡Bienvenido/a!</h1>
          <p className="text-muted-foreground mb-6 mt-1">
            Inicia sesión para continuar
          </p>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6 w-xs"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Correo electrónico</FormLabel>
                    <FormControl>
                      <Input placeholder="jhon@doe.com" {...field} />
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
                        placeholder="*********"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <AuthError message={loginError} isPending={isLoginPending} />

              <Button type="submit" disabled={isLoginPending} className="w-full">
                {
                  isLoginPending ? <>
                    <Spinner />
                    Validando
                  </> : 'Iniciar sesión'
                }
              </Button>
            </form>
          </Form>

          <small className="text-muted-foreground mb-6 mt-1 text-center">
            ¿No tienes una cuenta?{' '}
            <a href="/register" className="text-orange-500 hover:underline">
              Regístrate
            </a>
          </small>

          <small className="absolute bottom-5 text-gray-500">
            Copyright © {new Date().getFullYear()} Flowee. Todos los derechos
            reservados.
          </small>
        </div>
      </section>
    </main>
  )
}
