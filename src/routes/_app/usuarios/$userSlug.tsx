import { NotFoundPage } from '@/components/errors/404'
import { UserBoards } from '@/components/users/profile/UserBoards'
import { UserProp } from '@/components/users/profile/UserProp'
import { UserStats } from '@/components/users/profile/UserStats'
import { getUserRole } from '@/helpers/user'
import { useAdminBoards } from '@/hooks/admin/useAdminBoards'
import { getUser } from '@/lib/api/users'
import { createFileRoute } from '@tanstack/react-router'
import { AtSign, Mail, ShieldUser } from 'lucide-react'
import { useEffect } from 'react'
import { toast } from 'sonner'

export const Route = createFileRoute('/_app/usuarios/$userSlug')({
  component: RouteComponent,
  loader: async ({ params, context }) => {
    const user = await context.queryClient.fetchQuery({
      queryKey: ['user', params.userSlug],
      queryFn: () => getUser(params.userSlug),
    })

    return { user }
  },
  errorComponent: NotFoundPage,
})

function RouteComponent() {
  const { user } = Route.useLoaderData()

  const { userBoards } = useAdminBoards(user.id)

  useEffect(() => {
    if (userBoards.isError) {
      toast.error(userBoards.error?.message)
    }
  }, [userBoards.isError, userBoards.error])

  return (
    <section className="w-full max-w-3xl mx-auto ">
      <div role="heading" className="flex gap-4">
        <img
          src={user.avatar ?? '/dashboard/user/default-avatar.webp'}
          alt="Avatar"
          className="size-32 rounded-full"
        />
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
      <UserBoards
        boards={userBoards.data ?? []}
        isPending={userBoards.isPending}
        userId={user.id}
      />
    </section>
  )
}
