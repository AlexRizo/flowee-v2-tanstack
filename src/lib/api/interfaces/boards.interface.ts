export interface Board {
  id: string
  name: string
  prefix: string
  slug: string
  color: string
  createdAt: string
  updatedAt: string
}

export interface CreateBoardDto {
  name: string
  prefix: string
  slug: string
  color: string
}

export interface AssignBoardToUserDto {
  boardId: string
  userId: string
}

export interface LeaveBoardDto {
  boardId: string
  userId: string
}