import type { Board } from './boards.interface'
import type { User } from './users.interface'

export enum Priority {
  LOW = 'LOW',
  NORMAL = 'NORMAL',
  HIGH = 'HIGH',
  URGENT = 'URGENT',
}

export enum TaskType {
  PRINT = 'PRINT',
  DIGITAL = 'DIGITAL',
  ECOMMERCE = 'ECOMMERCE',
  SPECIAL = 'SPECIAL',
}

export enum TaskStatus {
  PENDING = 'PENDING',
  ATTENTION = 'ATTENTION',
  IN_PROGRESS = 'IN_PROGRESS',
  FOR_REVIEW = 'FOR_REVIEW',
  DONE = 'DONE',
}

export interface Task {
  id: string
  title: string
  description: string
  status: TaskStatus
  type: TaskType
  priority: Priority
  board: Board
  assignedTo?: User
  author: User
  dueDate: string
  createdAt: string
  updatedAt: string
  printTask?: any
  digitalTask?: any
  ecommerceTask?: any
  specialTask?: specialTask
}

interface specialTask {
  size: string
  legals: string
}

export interface CreateTaskBaseDTO {
  title: string
  description: string
  type: TaskType
  priority: Priority
  status?: TaskStatus
  dueDate: string | Date
  boardId: string
  assignedToId?: string
  authorId?: string
  referenceFiles?: File[]
  requiredFiles?: File[]
}

export interface CreateSpecialTaskDTO extends CreateTaskBaseDTO {
  size: string
  legals?: string
}

export interface UpdateSpecialTaskDTO extends Partial<CreateSpecialTaskDTO> {}

export interface UploadTaskFilesDTO {
  taskId: string
  files: {
    referenceFiles?: File[]
    requiredFiles?: File[]
  }
}

export interface CreateTaskResponse {
  task: Task
  message?: string | string[]
}

export type OrderTasks = Record<TaskStatus, Task[]>

export interface TasksResult {
  unorder: Task[]
  order: OrderTasks
}