import { FileUp } from 'lucide-react'
import { useRef, useState, type FC } from 'react'
import { FileItem } from './FileItem'
import {
  DEFAULT_MAX_FILE_SIZE,
  DEFAULT_MIME_TYPES,
  FILES_COUNT_LIMIT,
} from '@/components/tasks/forms/schemas/special.schemas'

interface Props {
  maxFileSize?: number
  filesCountLimit?: number
  acceptedMimeTypes?: string[]
  initialFiles?: FileList | []
  onChange: (files: FileList | File[]) => void
  name?: string
}

export const UploadFilesInput: FC<Props> = ({
  maxFileSize = DEFAULT_MAX_FILE_SIZE,
  filesCountLimit = FILES_COUNT_LIMIT,
  acceptedMimeTypes = DEFAULT_MIME_TYPES,
  initialFiles = [],
  onChange,
  name = 'files',
}) => {
  const ref = useRef<HTMLInputElement>(null)

  const [files, setFiles] = useState<FileList | File[]>(initialFiles)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const incomingFiles = e.target.files

    let files: FileList | File[] = []

    if (incomingFiles?.length && incomingFiles.length > filesCountLimit) {
      files = Array.from(incomingFiles).slice(
        0,
        filesCountLimit,
      ) as unknown as FileList
    } else {
      files = incomingFiles ? Array.from(incomingFiles) : []
    }

    if (files && files.length) {
      setFiles(files)
      onChange(files)
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
              <FileItem
                key={index}
                file={file}
                maxFileSize={DEFAULT_MAX_FILE_SIZE}
              />
            ))
          ) : (
            <p className="text-muted-foreground text-center text-xs">
              No hay archivos seleccionados
            </p>
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
        name={name}
      />
    </>
  )
}
