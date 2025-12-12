import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

export type Tabs = 'Detalles' | 'Chat' | 'Entregas'

interface Props {
  children: ReactNode
  label: Tabs
  tabSelected: Tabs
  onClick: () => void
}

export const TabButton = ({ children, label, tabSelected, onClick }: Props) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        'h-30 border-b flex flex-col items-center justify-center cursor-pointer hover:text-violet-600',
        tabSelected === label && 'text-violet-600',
      )}
    >
      {children}
      {label}
    </button>
  )
}
