import { type FC } from 'react'
import { IconFile } from './IconFile'
import { FileSizeAlert } from './FileSizeAlert'

interface Props {
  file: File
  maxFileSize: number
}

export const FileItem: FC<Props> = ({ file, maxFileSize }) => {
  const fileExt = file.name.split('.').pop()
  
  return (
    <div
      role="listitem"
      className="border rounded-md flex items-center w-full gap-2 p-1 text-muted-foreground text-sm"
    >
      <IconFile mimeType={file.type} />
      <p>{file.name.slice(0, 26)}...(.{fileExt})</p>
      <p className="ml-auto">{(file.size / 1024 / 1024).toFixed(2)} Mb</p>
      {file.size > maxFileSize && <FileSizeAlert />}
    </div>
  )
}
