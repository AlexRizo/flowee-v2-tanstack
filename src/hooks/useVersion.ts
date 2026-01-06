import type { ApiError } from '@/lib/api/api'
import type { GetVersionFileDTO } from '@/lib/api/interfaces/deliveries.interface'
import { getVersionFile } from '@/lib/api/versions'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

export const useVersion = () => {
  const versionFileMutation = useMutation<string, ApiError, GetVersionFileDTO>({
    mutationFn: getVersionFile,
    onSuccess: (data, dto) => {
      if (dto.download) {
        const link = document.createElement('a')
        link.href = data
        link.download = dto.versionId
        link.click()
        link.remove()
      } else {
        window.open(data, '_blank')
      }
    },
    onError: (error) => {
      toast.error(
        'Ha ocurrido un error al intentar obtener el archivo del servidor',
        {
          description: error.message,
        },
      )
    },
  })

  return {
    versionFileMutation,
  }
}
