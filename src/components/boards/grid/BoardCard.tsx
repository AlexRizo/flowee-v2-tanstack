import type { Board } from '@/lib/api/interfaces/boards.interface'
import type { FC } from 'react'

interface Props extends Board {}

export const BoardCard: FC<Props> = ({
  id,
  name,
  color,
  prefix,
  slug,
  createdAt,
}) => {
  return <div>{name}</div>
}
