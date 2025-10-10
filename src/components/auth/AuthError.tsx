import type { FC } from 'react'

interface AuthErrorProps {
  message?: string
  isPending: boolean
}

export const AuthError: FC<AuthErrorProps> = ({ message, isPending }) => {
  return (
    message && (
      <p
        className={`text-sm text-red-500 overflow-hidden transition-all max-h-0 text-center ${!isPending  && 'animate-shake max-h-5'}`}
      >
        {message}
      </p>
    )
  )
}
