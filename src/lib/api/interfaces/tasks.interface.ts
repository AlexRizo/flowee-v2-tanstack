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
  dueDate: string
  board: Board
  assignedTo: User
  author: User
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