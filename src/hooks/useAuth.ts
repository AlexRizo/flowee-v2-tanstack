import type { ApiError } from '@/lib/api/api'
import { login } from '@/lib/api/auth'
import type { AuthUser, LoginDto } from '@/lib/api/interfaces/auth.interface'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'

export const useAuth = () => {
  const navigate = useNavigate()

  const {
    mutate: loginMutate,
    isPending: isLoginPending,
    error: loginError,
  } = useMutation<AuthUser, ApiError, LoginDto>({
    mutationFn: login,
    onSuccess: () => {
      navigate({ to: '/' })
    },
  })

  return {
    loginMutate,
    isLoginPending,
    loginError: loginError?.message,
  }
}
