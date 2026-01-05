import { Button } from '@/components/ui/button'
import { VersionStatus } from '@/lib/api/interfaces/deliveries.interface'
import { cn } from '@/lib/utils'
import { GitPullRequestClosed, GitPullRequestCreate } from 'lucide-react'
import { useState, type FC } from 'react'

interface Props {
  value?: VersionStatus
  onChange: (value: VersionStatus) => void
}

export const SelectVersionStatus: FC<Props> = ({ value, onChange }) => {
  const [status, setStatus] = useState<VersionStatus>(
    value || VersionStatus.PENDING,
  )

  const handleOnChange = (value: VersionStatus) => {
    setStatus(value)
    onChange(value)
  }

  return (
    <div className="w-full grid grid-cols-2 gap-2">
      <Button
        className={cn(status === VersionStatus.ACCEPTED && 'bg-violet-500')}
        onClick={() => handleOnChange(VersionStatus.ACCEPTED)}
      >
        <GitPullRequestCreate />
        Aceptar
      </Button>
      <Button
        className={cn(status === VersionStatus.REJECTED && 'bg-red-500')}
        onClick={() => handleOnChange(VersionStatus.REJECTED)}
      >
        <GitPullRequestClosed />
        Rechazar
      </Button>
    </div>
  )
}
