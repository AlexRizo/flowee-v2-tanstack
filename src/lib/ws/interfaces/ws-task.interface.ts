import type { TaskStatus } from "@/lib/api/interfaces/tasks.interface"

export interface UpdateTaskStatusPayload {
  taskId: string
  oldStatus: TaskStatus
  newStatus: TaskStatus
}