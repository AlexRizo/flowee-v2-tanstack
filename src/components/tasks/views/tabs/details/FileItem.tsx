import { useTasks } from '@/hooks/useTasks'
import type { TaskFile } from '@/lib/api/interfaces/tasks.interface'
import { Download, ExternalLink, File, Trash } from 'lucide-react'
import type { FC } from 'react'

interface Props extends TaskFile {}

export const FileItem: FC<Props> = ({ id, fileName, taskId }) => {
  const { taskFile } = useTasks({})

  const handlePreviewFile = () => {
    taskFile.mutate({ taskId, fileId: id, action: 'preview', fileName, download: false })
  }

  const handleDownloadFile = () => {
    taskFile.mutate({ taskId, fileId: id, action: 'download', fileName, download: true })
  }

  return (
    <div className="flex justify-between px-4 py-1">
      <div className="flex gap-2 items-center">
        <File className="" size={16} />
        <p className="text-sm truncate ">{fileName}</p>
      </div>
      <div className="flex gap-3">
        <ExternalLink onClick={handlePreviewFile} size={16} />
        <Download onClick={handleDownloadFile} size={16} />
        <Trash size={16} />
      </div>
    </div>
  )
}
