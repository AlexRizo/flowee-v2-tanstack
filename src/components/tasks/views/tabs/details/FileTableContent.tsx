import type { FC } from 'react'
import { FileItem } from './FileItem'
import type { TaskFiles } from '@/lib/api/interfaces/tasks.interface'

interface Props {
  files: TaskFiles
}

export const FileTableContent: FC<Props> = ({ files }) => {
  return (
    <div className="flex flex-col divide-y">
      {!files || !files.length ? (
        <p className="text-center text-gray-500 text-sm py-4">
          No hay archivos
        </p>
      ) : (
        files.map((file) => <FileItem {...file} key={file.key} />)
      )}
    </div>
  )
}
