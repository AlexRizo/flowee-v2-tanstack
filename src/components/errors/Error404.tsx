import { Link } from '@tanstack/react-router'
import { Button } from '../ui/button'
export const Error404 = () => {
  return (
    <section className="text-center flex flex-col items-center justify-center h-screen">
      <h1 className="text-7xl font-bold">ERROR 404</h1>
      <p className="text-2xl">La ruta que buscas no existe</p>
      <Link to="/" className="mt-4">
        <Button>Volver al inicio</Button>
      </Link>
    </section>
  )
}
