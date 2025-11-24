import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useBoardStore } from '@/store/boardStore'

interface Props {
  value?: string
  onChange: (value: string) => void
  currentUserBoards: string[]
}

export const SelectBoardToAssign = ({
  value,
  onChange,
  currentUserBoards,
}: Props) => {
  const { boards } = useBoardStore()

  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Selecciona un tablero:" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Tableros</SelectLabel>
          {boards
            .filter((board) => !currentUserBoards.includes(board.id))
            .map((board) => (
              <SelectItem key={board.id} value={board.id}>
                {board.name}
              </SelectItem>
            ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
