import { env } from '@/env'
import axios, { AxiosError } from 'axios'

export const api = axios.create({
  baseURL: env.VITE_API_URL,
  withCredentials: true,
  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',
})

export type ApiError = {
  status: number
  message: string
  title?: string
  code?: string
  details?: string[]
  raw?: unknown
}

const toApiError = (error: unknown): ApiError => {
  if (axios.isAxiosError(error)) {
    const ax = error as AxiosError<any>
    const status = ax.response?.status ?? 0
    const body = ax.response?.data

    if (body && typeof body === 'object') {
      const statusCode = body.statusCode ?? status
      const title = typeof body.error === 'string' ? body.error : undefined

      if (Array.isArray(body.message)) {
        return {
          status: statusCode,
          title,
          message: body.message.join(', '),
          details: body.message as string[],
          raw: body,
        }
      }

      return {
        status: statusCode,
        title,
        message: String(
          body.message ?? title ?? 'Ha ocurrido un error inesperado',
        ),
        raw: body,
      }
    }

    return {
      status,
      code: ax.code,
      message:
        ax.message ||
        (status === 0
          ? 'Error de conexión'
          : 'Ha ocurrido un error inesperado'),
      raw: ax.response,
    }
  }

  return {
    status: 0,
    message: 'Ha ocurrido un error desconocido',
    raw: error,
  }
}

let isRefreshing = false
let queue: Array<() => void> = []

api.interceptors.response.use(
  (res) => res,
  async (error: AxiosError) => {
    const originalReq = (error.config as any) ?? {}
    const status = error?.response?.status

    if (
      status === 401 &&
      !originalReq._retry &&
      originalReq?.url !== '/auth/refresh'
    ) {
      originalReq._retry = true

      if (isRefreshing) {
        await new Promise<void>((resolve) => queue.push(resolve))
        return api(originalReq)
      }

      try {
        isRefreshing = true

        if ((error.response?.data as any)?.message !== 'No auth token') {
          throw error
        }

        await axios.post(
          `${env.VITE_API_URL}/auth/refresh`,
          {},
          {
            withCredentials: true,
            xsrfCookieName: 'XSRF-TOKEN',
            xsrfHeaderName: 'X-XSRF-TOKEN',
          },
        )

        queue.forEach((fn) => fn())
        queue = []
        return api(originalReq)
      } catch (error) {
        queue = []
        return Promise.reject(toApiError(error))
      } finally {
        isRefreshing = false
      }
    }
  },
)

export const apiGet = async <T>(url: string, cfg?: any): Promise<T> => {
  const { data } = await api.get<T>(url, cfg)
  return data
}

export const apiPost = async <T, B = unknown>(
  url: string,
  body?: B,
  cfg?: any,
): Promise<T> => {
  const { data } = await api.post<T>(url, body, cfg)
  return data
}

export const apiPatch = async <T, B = unknown>(
  url: string,
  body?: B,
  cfg?: any,
): Promise<T> => {
  const { data } = await api.patch<T>(url, body, cfg)
  return data
}
