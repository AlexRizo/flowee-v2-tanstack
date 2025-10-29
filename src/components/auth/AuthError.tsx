import type { FC } from 'react'

interface AuthErrorProps {
  message?: string
  isPending: boolean
}

export const AuthError: FC<AuthErrorProps> = ({ message, isPending }) => {
  return (
    <p
      className={`text-sm text-red-500 overflow-hidden max-h-0 opacity-0 transition-[max-height_opacity] duration-300 text-center ${!isPending && 'animate-shake max-h-20 opacity-100'}`}
    >
      {message}
    </p>
  )
}
