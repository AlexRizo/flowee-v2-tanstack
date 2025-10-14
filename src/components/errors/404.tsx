import type { ApiError } from "@/lib/api/api"
import { Link } from "@tanstack/react-router"
import { useState } from "react"

export const NotFoundPage = ({ error }: { error: unknown }) => {
  const [apiError] = useState<ApiError>(error as ApiError)

  return (
    <div className="text-center flex flex-col my-auto">
      <h1 className="text-7xl font-bold">ERROR {apiError.status}</h1>
      <p className="text-2xl">El recurso que buscas no existe</p>
      <small className="text-gray-500 text-base">{apiError.message}</small>
      <Link className="text-violet-500 mt-2 underline" to="/">
        Volver al inicio
      </Link>
    </div>
  )
}