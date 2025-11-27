import { MyBoards } from '@/components/account/MyBoards'
import { UploadAvatar } from '@/components/account/UploadAvatar'
import { NotFoundPage } from '@/components/errors/404'
import { UserProp } from '@/components/users/profile/UserProp'
import { UserStats } from '@/components/users/profile/UserStats'
import { getUserRole } from '@/helpers/user'
import { useBoards } from '@/hooks/useBoards'
import { getMe } from '@/lib/api/auth'
import type { AuthUser } from '@/lib/api/interfaces/auth.interface'
import { createFileRoute } from '@tanstack/react-router'
import { AtSign, Mail, ShieldUser } from 'lucide-react'
import { useEffect } from 'react'
import { toast } from 'sonner'

export const Route = createFileRoute('/_app/cuenta')({
  component: RouteComponent,
  loader: async ({ context }) => {
    const authUser = context.queryClient.getQueryData<AuthUser>([
      'auth',
      'user',
    ])

    if (!authUser) {
      throw new Error('Usuario no autenticado')
    }

    const userData = await context.queryClient.fetchQuery({
      queryKey: ['user', authUser.id],
      queryFn: () => getMe(),
    })

    return { user: userData }
  },
  errorComponent: NotFoundPage,
})

function RouteComponent() {
  const { user } = Route.useLoaderData()

  const { boards, boardsError, isBoardsPending } = useBoards()

  useEffect(() => {
    if (boardsError) {
      toast.error(boardsError?.message)
    }
  }, [boardsError])

  useEffect(() => {
    console.log(user.avatar)
  }, [user.avatar])

  return (
    <section className="w-full max-w-3xl mx-auto ">
      <section className="w-full max-w-3xl mx-auto ">
        <div role="heading" className="flex gap-4">
          <UploadAvatar id={user.id} avatar={user.avatar} />
          <article>
            <h1 className="text-4xl font-bold">{user.name}</h1>
            <UserProp text={user.email}>
              <Mail size={20} />
            </UserProp>
            <UserProp text={user.username}>
              <AtSign size={20} />
            </UserProp>
            <UserProp text={getUserRole(user.role)}>
              <ShieldUser size={20} />
            </UserProp>
          </article>
        </div>
        <UserStats />
        <MyBoards
          boards={boards ?? []}
          isPending={isBoardsPending}
          userId={user.id}
        />
      </section>
    </section>
  )
}
