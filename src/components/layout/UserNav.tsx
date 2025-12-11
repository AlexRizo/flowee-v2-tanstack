import { useBoardStore } from '@/store/boardStore'
import { useEffect } from 'react'
import { toast } from 'sonner'
import { Spinner } from '../ui/spinner'
import { useBoardUsers } from '@/hooks/useBoardUsers'
import { useUserStore } from '@/store/userStore'
import { User } from './User'

export const UserNav = () => {
  const { selectedBoardId } = useBoardStore()
  const { setUsers, selectUser, selectedUserId, users } = useUserStore()
  const { boardUsersQuery } = useBoardUsers(selectedBoardId)

  useEffect(() => {
    if (boardUsersQuery.error) {
      toast.error('Error al cargar los tableros', {
        description: boardUsersQuery.error.message,
      })
    }

    if (boardUsersQuery.data) {
      setUsers(boardUsersQuery.data)
    }
  }, [boardUsersQuery.data])

  if (boardUsersQuery.isPending) {
    return <Spinner />
  }

  return (
    <div className="border rounded-full p-2 flex gap-2">
      {users?.map((user) => (
        <User
          key={user.id}
          id={user.id}
          name={user.name}
          avatar={user.avatar}
          select={() => selectUser(user.id)}
          selectedId={selectedUserId}
        />
      ))}
    </div>
  )
}
