import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { getTaskPriority } from '@/helpers/task'
import { Priority } from '@/lib/api/interfaces/tasks.interface'

interface Props {
  value?: Priority
  onChange: (value: Priority) => void
}

export const SelectTaskPriority = ({ value, onChange }: Props) => {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Selecciona un rol:" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Prioridades</SelectLabel>
          {Array.from(Object.values(Priority)).map((role) => (
            <SelectItem key={role} value={role}>
              {getTaskPriority(role)}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
