import { TaskTypeCard } from '@/components/tasks/TaskTypeCard'
import { Button } from '@/components/ui/button'
import { TaskType } from '@/lib/api/interfaces/tasks.interface'
import { useTaskStore } from '@/store/taskStore'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import type { IconName } from 'lucide-react/dynamic'
import { toast } from 'sonner'

export const Route = createFileRoute('/_app/tareas/nueva/')({
  component: RouteComponent,
})
const taskTypes = [
  {
    title: 'Ecommerce',
    description: 'Banner, News, Diseño web...',
    iconName: 'store',
    id: TaskType.ECOMMERCE,
  },
  {
    title: 'Impresa',
    description: 'Espectaculares, pendones...',
    iconName: 'printer',
    id: TaskType.PRINT,
  },
  {
    title: 'Digital',
    description: 'Redes sociales y CRM',
    iconName: 'monitor-smartphone',
    id: TaskType.DIGITAL,
  },
  {
    title: 'Especial',
    description: 'Material distinto',
    iconName: 'sparkles',
    id: TaskType.SPECIAL,
  },
]

function RouteComponent() {
  const navigate = useNavigate()

  const { type, setType, setStep } = useTaskStore()

  const getTaskType = (id: TaskType | null) => {
    if (!id) return

    const tt =
      id === TaskType.ECOMMERCE
        ? 'ecommerce'
        : id === TaskType.PRINT
          ? 'impresa'
          : id === TaskType.DIGITAL
            ? 'digital'
            : id === TaskType.SPECIAL
              ? 'especial'
              : null

    if (!tt) {
      toast.error('Se esperaba un tipo de tarea válido')
      return
    }

    setStep(2)
    navigate({ to: `/tareas/nueva/${tt}` })
  }

  return (
    <>
      <h1 className="font-bold text-xl text-center">
        Selecciona el tipo de solicitud
      </h1>
      <div className="mt-6 grid grid-cols-2 gap-4">
        {taskTypes.map((t) => (
          <TaskTypeCard
            key={t.id}
            id={t.id}
            iconName={t.iconName as IconName}
            title={t.title}
            description={t.description}
            onSelect={setType}
            selectedId={type}
          />
        ))}
      </div>
      <Button
        type="button"
        size="lg"
        onClick={() => {
          getTaskType(type)
        }}
        className="bg-violet-600 hover:bg-violet-700 mx-auto mt-4"
      >
        Continuar
      </Button>
    </>
  )
}
