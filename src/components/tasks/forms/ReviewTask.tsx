import { FormError } from '@/components/global/FormError'
import { Button } from '@/components/ui/button'
import { useTasks } from '@/hooks/useTasks'
import {
  TaskType,
  type CreateSpecialTaskDTO,
} from '@/lib/api/interfaces/tasks.interface'
import { SquarePen } from 'lucide-react'
import { useEffect, useState, type FC } from 'react'
import { FilesMessageDialog } from '../dialogs/FilesMessageDialog'

interface Props {
  step: number
  setStep: (step: number) => void
  taskType: TaskType | null
  specialTask: CreateSpecialTaskDTO
}

export const ReviewTask: FC<Props> = ({
  setStep,
  specialTask,
  taskType,
  step,
}) => {
  const { createSpecialTask } = useTasks({})

  const handleSubmit = () => {
    if (taskType === TaskType.SPECIAL) {
      createSpecialTask.mutate(specialTask)
    }
  }

  const [openFilesDialog, setOpenFilesDialog] = useState(false)

  useEffect(() => {
    if (createSpecialTask.isSuccess && !createSpecialTask.data.message) {
      setStep(5)
    } else {
      setOpenFilesDialog(!!createSpecialTask.data?.message)
    }
  }, [createSpecialTask.isSuccess, createSpecialTask.data])

  return (
    <>
      <div className="size-full flex flex-col">
        <h1 className="font-bold text-xl text-center">Confirmación</h1>
        <p className="my-10 font-semibold text-sm text-center">
          Revisa los detalles y confirma tu solicitud.
        </p>
        <div className="flex-grow flex flex-col w-32 mx-auto gap-3">
          <SpecialSteps setStep={setStep} />
        </div>
        <div className="mb-10">
          <FormError
            error={createSpecialTask.error?.message}
            isPending={createSpecialTask.isPending}
            title="Error al crear la tarea"
          />
        </div>
        <Button
          type="submit"
          className="w-full bg-violet-600 hover:bg-violet-700 mt-auto"
          onClick={handleSubmit}
        >
          Enviar
        </Button>
      </div>

      <FilesMessageDialog
        error={createSpecialTask.data?.message!}
        isPending={createSpecialTask.isPending}
        isOpen={openFilesDialog}
        step={step}
        setStep={setStep}
        setIsOpen={setOpenFilesDialog}
      />
    </>
  )
}

interface StepsProps {
  setStep: (step: number) => void
}

const SpecialSteps: FC<StepsProps> = ({ setStep }) => {
  const specialSteps = [
    {
      step: 2,
      name: 'Nombre',
    },
    {
      step: 2,
      name: 'Hora y fecha',
    },
    {
      step: 3,
      name: 'Descripción',
    },
    {
      step: 3,
      name: 'Referencias',
    },
    {
      step: 4,
      name: 'Medidas',
    },
    {
      step: 4,
      name: 'Legales',
    },
    {
      step: 4,
      name: 'Materiales',
    },
  ]

  return (
    <>
      {specialSteps.map((step) => (
        <div
          className="flex items-center justify-between cursor-pointer"
          key={step.name.replace(' ', '-')}
          onClick={() => setStep(step.step)}
        >
          <span className="text-gray-400 font-medium text-sm">{step.name}</span>
          <SquarePen size={18} />
        </div>
      ))}
    </>
  )
}
