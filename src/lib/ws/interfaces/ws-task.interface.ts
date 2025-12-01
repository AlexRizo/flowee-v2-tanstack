import type { Task, TaskStatus } from "@/lib/api/interfaces/tasks.interface"

export interface UpdateTaskStatusPayload {
  clientId: string
  taskId: string
  fromStatus: TaskStatus
  toStatus: TaskStatus
}

export interface AssignedTaskPayload {
  task: Task
}