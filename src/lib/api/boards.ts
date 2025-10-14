import { apiGet } from './api'
import type { Board } from './interfaces/boards.interface'

export const getMyBoards = async () => {
  return await apiGet<Board[]>('/boards/my-boards')
}
