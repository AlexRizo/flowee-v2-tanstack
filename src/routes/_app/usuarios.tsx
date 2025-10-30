import { createFileRoute } from '@tanstack/react-router'
import { CreateUserDialog } from '@/components/users/dialogs/CreateUserDialog'
import { UsersTable } from '@/components/users/UsersTable'
import { useAdminUsers } from '@/hooks/admin/useAdminUsers'

export const Route = createFileRoute('/_app/usuarios')({
  component: RouteComponent,
})

function RouteComponent() {
  const { users } = useAdminUsers()

  return (
    <section className="w-full">
      <div className="flex justify-between pb-4 px-1.5 border-b" role="heading">
        <h1 className="text-2xl font-semibold">Usuarios</h1>
        <CreateUserDialog />
      </div>
      <UsersTable users={users.data ?? []} />
    </section>
  )
}
