import { Button } from '@/components/ui/button'
import { useNavigate } from '@tanstack/react-router'
import { Rocket } from 'lucide-react'
import type { FC } from 'react'

interface Props {
  reset: () => void
}

export const Done: FC<Props> = ({ reset }) => {
  const navigate = useNavigate()

  const handleSubmit = () => {
    navigate({ to: '/mis-tareas' })
    reset()
  }

  return (
    <div className="size-full flex flex-col">
      <Rocket className="mx-auto mb-5" size={48} />
      <p className="my-10 font-semibold text-sm text-center">
        El equipo revisará tu solicitud y le asignará un diseñador
      </p>
      <Button type="submit" className="w-full mt-auto" onClick={handleSubmit}>
        Finalizar
      </Button>
    </div>
  )
}
