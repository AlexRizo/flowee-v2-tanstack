import { Button } from '@/components/ui/button'
import type { CreateSpecialTaskDTO } from '@/lib/api/interfaces/tasks.interface'
import { SquarePen } from 'lucide-react'
import { useEffect, type FC } from 'react'

interface Props {
  setStep: (step: number) => void
  specialTask: CreateSpecialTaskDTO
}

export const ReviewTask: FC<Props> = ({ setStep, specialTask }) => {
  useEffect(() => {
    console.log('Special Task Data:', specialTask)
  }, [specialTask])

  return (
    <div className="size-full flex flex-col">
      <h1 className="font-bold text-xl text-center">Confirmación</h1>
      <p className="my-10 font-semibold text-sm text-center">
        Revisa los detalles y confirma tu solicitud.
      </p>
      <div className="flex-grow flex flex-col w-32 mx-auto gap-6">
        <SpecialSteps setStep={setStep} />
      </div>
      <Button
        type="submit"
        className="w-full bg-violet-600 hover:bg-violet-700 mt-auto"
      >
        Enviar
      </Button>
    </div>
  )
}

interface StepsProps extends Omit<Props, 'specialTask'> {}

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
