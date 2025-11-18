import {
  Priority,
  TaskStatus,
  TaskType,
  type OrderTasks,
  type Task,
} from '@/lib/api/interfaces/tasks.interface'

enum EspTaskType {
  PRINT = 'Impresa',
  DIGITAL = 'Digital',
  ECOMMERCE = 'Ecommerce',
  SPECIAL = 'Especial',
  UNKNOWN = 'Desconocida',
}

export const getTaskType = (type: TaskType): EspTaskType => {
  switch (type) {
    case TaskType.DIGITAL:
      return EspTaskType.DIGITAL
    case TaskType.ECOMMERCE:
      return EspTaskType.ECOMMERCE
    case TaskType.PRINT:
      return EspTaskType.PRINT
    case TaskType.SPECIAL:
      return EspTaskType.SPECIAL
    default:
      return EspTaskType.UNKNOWN
  }
}

enum EspPriority {
  LOW = 'Baja',
  NORMAL = 'Normal',
  HIGH = 'Alta',
  URGENT = 'Urgente',
  UNKNOWN = 'Desconocida',
}

export const getTaskPriority = (priority: Priority): EspPriority => {
  switch (priority) {
    case Priority.LOW:
      return EspPriority.LOW
    case Priority.NORMAL:
      return EspPriority.NORMAL
    case Priority.HIGH:
      return EspPriority.HIGH
    case Priority.URGENT:
      return EspPriority.URGENT
    default:
      return EspPriority.UNKNOWN
  }
}

export const groupTasksByStatus = (tasks: Task[]) => {
  const order: OrderTasks = {
    [TaskStatus.PENDING]: [],
    [TaskStatus.ATTENTION]: [],
    [TaskStatus.IN_PROGRESS]: [],
    [TaskStatus.FOR_REVIEW]: [],
    [TaskStatus.DONE]: [],
  }

  for (const task of tasks) {
    order[task.status].push(task)
  }

  return {
    unorder: tasks,
    order,
  }
}
