import type { FC } from 'react'
import { Link } from '@tanstack/react-router'
import { DynamicIcon, type IconName } from 'lucide-react/dynamic'
import type { LinkProps } from '@tanstack/react-router'
import { cn } from '@/lib/utils'

interface Props {
  to: LinkProps['to']
  icon: IconName
  label: string
  collapsed: boolean
}

export const Navlink: FC<Props> = ({ to, icon, label, collapsed }) => {
  return (
    <Link
      to={to}
      className={cn(
        'flex items-center gap-2 h-8.5 w-full overflow-hidden rounded hover:bg-violet-200 transition-colors px-2',
        collapsed && 'p-1.5 gap-0 size-min',
      )}
      activeProps={{ className: 'bg-violet-200' }}
      inactiveProps={{ className: 'bg-gray-100' }}
      activeOptions={{ exact: to === '/' ? true : false }}
    >
      {({ isActive }) => (
        <>
          <DynamicIcon
            name={icon}
            strokeWidth={1.5}
            className={`min-w-6 min-h-6 size-6 transition-colors ${isActive ? 'text-violet-700' : 'text-black'}`}
          />
          {!collapsed && (
            <span className="text-sm whitespace-nowrap">{label}</span>
          )}
        </>
      )}
    </Link>
  )
}
