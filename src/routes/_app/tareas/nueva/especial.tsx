import { Special } from '@/components/tasks/forms/Special'
import { useTaskStore } from '@/store/taskStore'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'

export const Route = createFileRoute('/_app/tareas/nueva/especial')({
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = useNavigate()
  const { step } = useTaskStore()

  useEffect(() => {
    if (step < 2) {
      navigate({ to: '/tareas/nueva' })
    }
  }, [step, navigate])

  return (
    <>
      {step === 2 ? (
        <Special />
      ) : (
        <div className="text-center">Selecciona el tipo de tarea especial</div>
      )}
    </>
  )
}
