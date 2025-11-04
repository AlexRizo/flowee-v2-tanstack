import { SpecialForm } from '@/components/tasks/forms/SpecialForm'
import { useTaskStore } from '@/store/taskStore'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'

export const Route = createFileRoute('/_app/tareas/nueva/especial')({
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = useNavigate()
  const { step, type, ...rest } = useTaskStore()

  useEffect(() => {
    if (step < 2) {
      navigate({ to: '/tareas/nueva' })
    }
  }, [step, navigate])

  return (
    <>
      {step >= 2 ? (
        <SpecialForm step={step} taskType={type} {...rest} />
      ) : (
        <div className="text-center">Selecciona el tipo de tarea especial</div>
      )}
    </>
  )
}
