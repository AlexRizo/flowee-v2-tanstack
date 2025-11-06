import {
  FileImage,
  FileQuestionMark,
  FileText,
  FolderArchive,
} from 'lucide-react'
import { type FC } from 'react'

interface Props {
  mimeType?: string
}

export const IconFile: FC<Props> = ({ mimeType }) => {
  return (
    <>
      {mimeType?.startsWith('image/') ? (
        <FileImage className="text-muted-foreground" size={16} />
      ) : mimeType === 'application/pdf' ? (
        <FileText className="text-red-700" size={16} />
      ) : mimeType ===
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ? (
        <FileText className="text-blue-400" size={16} />
      ) : mimeType === 'application/zip' ? (
        <FolderArchive className="text-yellow-600" size={16} />
      ) : (
        <FileQuestionMark size={16} />
      )}
    </>
  )
}
