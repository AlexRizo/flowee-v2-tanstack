import type { ApiError } from '@/lib/api/api'
import { login, logout } from '@/lib/api/auth'
import type { AuthUser, LoginDto } from '@/lib/api/interfaces/auth.interface'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { toast } from 'sonner'

export const useAuth = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const user = queryClient.getQueryData<AuthUser>(['auth', 'user'])

  const {
    mutate: loginMutate,
    isPending: isLoginPending,
    error: loginError,
  } = useMutation<AuthUser, ApiError, LoginDto>({
    mutationFn: login,
    onSuccess: (user) => {
      queryClient.setQueryData(['auth', 'user'], user)
      navigate({ to: '/' })
    },
  })

  const {
    mutate: logoutMutate,
    isPending: isLogoutPending,
    error: logoutError,
  } = useMutation<{ message: string }, ApiError>({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ['auth', 'user'] })
      navigate({ to: '/auth' })
    },
    onError: (error) => {
      toast.error('Ha ocurrido un error al intentar cerrar sesión', {
        description: error.message,
      })
    },
  })

  return {
    // ? Props
    user,

    // ? Methods
    loginMutate,
    isLoginPending,
    loginError: loginError?.message,

    logoutMutate,
    isLogoutPending,
    logoutError: logoutError?.message,
  }
}
