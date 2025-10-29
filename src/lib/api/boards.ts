import { apiGet, apiPost } from './api'
import type { Board, CreateBoardDto } from './interfaces/boards.interface'

export const getMyBoards = async () => {
  return await apiGet<Board[]>('/boards/my-boards')
}

// ? Este método es para usuarios administradores
export const getAllBoards = async () => {
  return await apiGet<Board[]>(`/boards`)
}

export const createBoard = async (board: CreateBoardDto) => {
  return await apiPost<Board>('/boards', board)
}