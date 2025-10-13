import type { FC } from 'react'
import { Link } from '@tanstack/react-router'

interface Props {
  slug: string
  prefix: string
  name: string
}

export const BoardNavlink: FC<Props> = ({ slug, prefix, name }) => {
  return (
    <Link
      to={`/tableros/$tablero`}
      params={{
        tablero: slug,
      }}
      className="flex items-center py-2 px-3 rounded hover:bg-violet-200 transition-colors"
      activeProps={{ className: 'bg-violet-200' }}
      inactiveProps={{ className: 'bg-gray-200' }}
    >
      <span className={`size-5 mr-2 text-xs`}>{prefix}</span>
      <span className="text-sm">{name}</span>
    </Link>
  )
}
