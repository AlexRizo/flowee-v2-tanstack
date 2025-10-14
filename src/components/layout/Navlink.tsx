import type { FC } from 'react'
import { Link } from '@tanstack/react-router'
import { DynamicIcon, type IconName } from 'lucide-react/dynamic'
import type { LinkProps } from '@tanstack/react-router'

interface Props {
  to: LinkProps['to']
  icon: IconName
  label: string
}

export const Navlink: FC<Props> = ({ to, icon, label }) => {
  return (
    <Link
      to={to}
      className="flex items-center py-2 px-3 rounded hover:bg-violet-200 transition-colors"
      activeProps={{ className: 'bg-violet-200' }}
      inactiveProps={{ className: 'bg-gray-100' }}
      activeOptions={{ exact: to === '/' ? true : false }}
    >
      {({ isActive }) => (
        <>
          <DynamicIcon
            name={icon}
            strokeWidth={1.5}
            className={`size-5 mr-2 transition-colors ${isActive ? 'text-violet-700' : 'text-black'}`}
          />
          <span className='text-sm'>{label}</span>
        </>
      )}
    </Link>
  )
}
