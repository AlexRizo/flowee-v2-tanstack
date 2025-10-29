import { type FC } from 'react'
import { Alert, AlertDescription, AlertTitle } from '../ui/alert'
import { AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Props {
  title: string
  description?: string
  error?: string[] | string
  isPending: boolean
}

export const FormError: FC<Props> = ({
  title,
  description = 'Por favor, revisa la información.',
  error,
  isPending,
}) => {

  return (
    <Alert
      variant="destructive"
      className={cn(
        'transition-[height_max-height_opacity]',
        !!error && !isPending
          ? 'max-h-96 opacity-100'
          : 'max-h-0 overflow-hidden my-0 py-0 opacity-0',
      )}
    >
      <AlertCircle />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>
        <p>{description}</p>
        <ul className="list-inside list-disc text-sm">
          {Array.isArray(error) ? (
            error.map((err, index) => (
              <li key={`err-${index}`} className="leading-tight">
                {err}.
              </li>
            ))
          ) : (
            <li className="leading-tight">{error}.</li>
          )}
        </ul>
      </AlertDescription>
    </Alert>
  )
}
