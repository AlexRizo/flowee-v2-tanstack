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
    <div className="flex flex-col">
      <Rocket className="mx-auto mt-20" size={173} strokeWidth={1} />
      <p className="my-8 text-xl font-semibold text-center">
        El equipo revisará tu<br/> solicitud y le asignará un<br/> diseñador
      </p>
      <Button type="submit" className="w-3xs mx-auto" onClick={handleSubmit}>
        Finalizar
      </Button>
    </div>
  )
}
