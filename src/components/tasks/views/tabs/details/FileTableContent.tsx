import { useRef, type FC } from 'react'
import { FileItem } from './FileItem'
import type { TaskFiles } from '@/lib/api/interfaces/tasks.interface'
import { Plus } from 'lucide-react'
import { useTasks } from '@/hooks/useTasks'

interface Props {
  files: TaskFiles
  tabType: 'REQUIRED' | 'REFERENCE'
  taskId: string
}

export const FileTableContent: FC<Props> = ({ files, tabType, taskId }) => {
  const { uploadTaskFile } = useTasks({})

  const fileRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      uploadTaskFile.mutate({ taskId, file, type: tabType })
    }
  }

  return (
    <div className="flex flex-col divide-y">
      {!files || !files.length ? (
        <p className="text-center text-gray-500 text-sm py-4">
          No hay archivos
        </p>
      ) : (
        files.map((file) => <FileItem {...file} key={file.key} />)
      )}
      {files.length < 5 && (
        <>
          <button
            className="text-center text-gray-900 hover:text-violet-500 cursor-pointer text-sm py-1 flex items-center mx-auto"
            onClick={() => fileRef.current?.click()}
          >
            <Plus size={16} />
            Agregar archivo
          </button>
          <input
            type="file"
            className="hidden"
            onChange={handleFileChange}
            ref={fileRef}
          />
        </>
      )}
    </div>
  )
}
