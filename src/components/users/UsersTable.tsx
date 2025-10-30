import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
} from '@tanstack/react-table'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import type { User } from '@/lib/api/interfaces/users.interface'
import type { FC } from 'react'
import { getUserRole, getUserStatus } from '@/helpers/user'

interface Props {
  users: User[]
  // TODO: other props...
}

const columns: ColumnDef<User>[] = [
  {
    header: 'Nombre',
    accessorKey: 'name',
  },
  {
    header: 'Correo',
    accessorKey: 'email',
  },
  {
    header: 'Usuario',
    accessorKey: 'username',
  },
  {
    header: 'Rol',
    accessorKey: 'role',
    cell: ({ row }) => getUserRole(row.original.role),
  },
  {
    header: 'Estado',
    accessorKey: 'isActive',
    cell: ({ row }) => getUserStatus(row.original.isActive),
  },
]

export const UsersTable: FC<Props> = ({ users }) => {
  const table = useReactTable({
    data: users,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <Table className="border border-t-0 rounded">
      <TableCaption>
        {!users || !users.length
          ? 'No se encontraron usuarios.'
          : 'Listado de usuarios del sistema.'}
      </TableCaption>
      <TableHeader className="bg-white">
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            <TableHead>#</TableHead>
            {headerGroup.headers.map((header) => (
              <TableHead key={header.id}>
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext(),
                )}
              </TableHead>
            ))}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody className="bg-stone-50">
        {table.getRowModel().rows.map((row) => (
          <TableRow key={row.id}>
            <TableCell>{row.index + 1}</TableCell>
            {row.getVisibleCells().map((cell) => (
              <TableCell key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
