import {
  Priority,
  TaskStatus,
  type CreateSpecialTaskDTO,
  TaskType,
  type CreateTaskBaseDTO,
} from '@/lib/api/interfaces/tasks.interface'
import { create } from 'zustand'

interface TaskStore {
  step: number
  type: TaskType | null
  digitalTask: any
  ecommerceTask: any
  printTask: any
  specialTask: CreateSpecialTaskDTO
  setStep: (step: number) => void
  setType: (taskType: TaskType) => void
  updateDigitalTask: (data: any) => void
  updateEcommerceTask: (data: any) => void
  updatePrintTask: (data: any) => void
  updateSpecialTask: (data: Partial<CreateSpecialTaskDTO>) => void
  reset: () => void
}

const taskBase: Omit<CreateTaskBaseDTO, 'type'> = {
  title: '',
  description: '',
  priority: Priority.LOW,
  status: TaskStatus.PENDING,
  dueDate: '',
  boardId: '',
  assignedToId: '',
  authorId: '',
}

const specialTask: CreateSpecialTaskDTO = {
  ...taskBase,
  size: '',
  legals: '',
  type: TaskType.SPECIAL,
}

export const useTaskStore = create<TaskStore>((set) => ({
  step: 1,
  type: null,
  digitalTask: {},
  ecommerceTask: {},
  printTask: {},
  specialTask,
  setStep: (step) => set({ step }),
  setType: (taskType) => set({ type: taskType }),
  updateDigitalTask: (data) =>
    set((state) => ({ digitalTask: { ...state.digitalTask, ...data } })),
  updateEcommerceTask: (data) =>
    set((state) => ({ ecommerceTask: { ...state.ecommerceTask, ...data } })),
  updatePrintTask: (data) =>
    set((state) => ({ printTask: { ...state.printTask, ...data } })),
  updateSpecialTask: (data) =>
    set((state) => ({ specialTask: { ...state.specialTask, ...data } })),
  reset: () =>
    set({
      step: 1,
      type: null,
      digitalTask: {},
      ecommerceTask: {},
      printTask: {},
      specialTask,
    }),
}))
