import { Priority, TaskType } from '@/lib/api/interfaces/tasks.interface'

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
  NORMAL = 'Media',
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
