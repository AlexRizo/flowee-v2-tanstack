import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
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
    <ToggleGroup
      type="single"
      value={status}
      onValueChange={handleOnChange}
      spacing={2}
      className=""
    >
      <ToggleGroupItem
        value={VersionStatus.ACCEPTED}
        className={cn(
          'w-full',
          status === VersionStatus.ACCEPTED && '!bg-purple-500 !text-white',
        )}
      >
        <GitPullRequestCreate />
        Aceptar
      </ToggleGroupItem>
      <ToggleGroupItem
        value={VersionStatus.REJECTED}
        className={cn(
          'w-full',
          status === VersionStatus.REJECTED && '!bg-red-500 !text-white',
        )}
      >
        <GitPullRequestClosed />
        Rechazar
      </ToggleGroupItem>
    </ToggleGroup>
  )
}
