import type { FC, ReactNode } from 'react'

interface Props {
  children: ReactNode
  text: string
}

export const UserProp: FC<Props> = ({ children, text }) => {
  return (
    <div className="flex items-center gap-1 text-neutral-500">
      {children}
      <span className="text-lg">{text}</span>
    </div>
  )
}
