import type { User } from '@/lib/api/interfaces/users.interface'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface UserStore {
  users: User[]
  selectedUserId?: string
  setUsers: (users: User[]) => void
  selectUser: (userId: string) => void
  clearUser: () => void
  clearUsers: () => void
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      users: [],
      selectedUserId: undefined,
      setUsers: (users) => set({ users }),
      selectUser: (userId) =>
        set(({ selectedUserId }) => {
          if (selectedUserId === userId) {
            return { selectedUserId: undefined }
          }
          return { selectedUserId: userId }
        }),
      clearUser: () => set({ users: [], selectedUserId: undefined }),
      clearUsers: () => set({ users: [] }),
    }),
    { name: 'user-storage' },
  ),
)
