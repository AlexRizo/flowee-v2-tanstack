import { Button } from '@/components/ui/button'
import { UsersTable } from '@/components/users/UsersTable'
import { useAdminUsers } from '@/hooks/admin/useAdminUsers'

import { createFileRoute } from '@tanstack/react-router'
import { Plus } from 'lucide-react'

export const Route = createFileRoute('/_app/usuarios')({
  component: RouteComponent,
})

function RouteComponent() {
  const { users } = useAdminUsers()

  return (
    <section className="w-full">
      <div className="flex justify-between pb-4 px-1.5 border-b" role="heading">
        <h1 className="text-2xl font-semibold">Usuarios</h1>
        <Button>
          <Plus />
          Nuevo Usuario
        </Button>
      </div>
      <UsersTable users={users.data ?? []} />
    </section>
  )
}
