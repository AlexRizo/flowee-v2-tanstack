import { Link } from '@tanstack/react-router'
import { Button } from '../ui/button'
export const Error404 = ({ error }: { error: Error }) => {
  return (
    <section className="text-center flex flex-col items-center justify-center h-screen">
      <h1 className="text-7xl font-bold">ERROR 404</h1>
      <p className="text-2xl">Ha ocurrido un error al buscar la ruta</p>
      <small className="text-gray-500 text-base">{error.message}</small>
      <Link to="/" className='mt-4'>
        <Button>Volver al inicio</Button>
      </Link>
    </section>
  )
}
