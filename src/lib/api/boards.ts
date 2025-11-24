import { apiDelete, apiGet, apiPost } from './api'
import type { AssignBoardToUserDto, Board, CreateBoardDto } from './interfaces/boards.interface'

// ? El term puede ser el ID o el SLUG del tablero
export const getBoard = async (term: string) => {
  return await apiGet<Board>(`/boards/${term}`)
}

export const getMyBoards = async () => {
  return await apiGet<Board[]>('/boards/my-boards')
}

export const getUserBoards = async (userId: string) => {
  return await apiGet<Board[]>(`/boards/user/${userId}`)
}

export const assignBoardToUser = async ({ boardId, userId }: AssignBoardToUserDto) => {
  return await apiPost<Board>(`/boards/${boardId}/assign`, { userId })
}

// ? Este método es para usuarios administradores
export const getAllBoards = async () => {
  return await apiGet<Board[]>('/boards')
}

export const createBoard = async (board: CreateBoardDto) => {
  return await apiPost<Board>('/boards', board)
}

export const deleteBoard = async (boardId: string) => {
  return await apiDelete<void>(`/boards/${boardId}`)
}
