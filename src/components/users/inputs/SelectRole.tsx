import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { getUserRole } from '@/helpers/user'
import { Role } from '@/lib/api/interfaces/auth.interface'

interface Props {
  value: Role
  onChange: (value: Role) => void
}

export const SelectRole = ({ value, onChange }: Props) => {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Selecciona un rol:" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Roles</SelectLabel>
          {Array.from(Object.values(Role)).map((role) => (
            <SelectItem key={role} value={role}>
              {getUserRole(role)}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
