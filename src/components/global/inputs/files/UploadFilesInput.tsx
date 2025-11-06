import { FileUp } from 'lucide-react'
import { useRef, useState, type FC } from 'react'
import { FileItem } from './FileItem'

const DEFAULT_MAX_FILE_SIZE = 5 * 1024 * 1024 // 5 Mb
const FILES_COUNT_LIMIT = 5
const DEFAULT_MIME_TYPES = [
  'image/*',
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/zip',
]

interface Props {
  maxFileSize?: number
  filesCountLimit?: number
  acceptedMimeTypes?: string[]
  initialFiles?: FileList | []
}

export const UploadFilesInput: FC<Props> = ({
  maxFileSize = DEFAULT_MAX_FILE_SIZE,
  filesCountLimit = FILES_COUNT_LIMIT,
  acceptedMimeTypes = DEFAULT_MIME_TYPES,
  initialFiles = [],
}) => {
  const ref = useRef<HTMLInputElement>(null)

  const [files, setFiles] = useState<FileList | []>(initialFiles)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      setFiles(files)
    }
  }

  return (
    <>
      <div
        onClick={() => ref.current?.click()}
        role="figure"
        className="w-full border-dashed border-2 p-6 flex-col justify-center items-center flex rounded-md hover:border-violet-400 cursor-pointer transition-colors"
      >
        <div role="complementary">
          <FileUp className="text-muted-foreground mx-auto" />
          <p className="text-sm text-muted-foreground">
            Sube o arrastra tus archivos aquí
          </p>
        </div>
        <div role="list" className="mt-2 w-full space-y-1">
          {files && files.length > 0 ? (
            Array.from(files).map((file, index) => (
              <FileItem key={index} file={file} maxFileSize={DEFAULT_MAX_FILE_SIZE} />
            ))
          ) : (
            <p className='text-muted-foreground text-center text-xs'>No hay archivos seleccionados</p>
          )}
        </div>
      </div>

      <input
        ref={ref}
        type="file"
        onChange={handleChange}
        multiple
        accept={acceptedMimeTypes.join(',')}
        className="sr-only"
      />
    </>
  )
}
