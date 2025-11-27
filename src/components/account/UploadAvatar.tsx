import { env } from '@/env'
import type { ApiError } from '@/lib/api/api'
import type { AuthUser } from '@/lib/api/interfaces/auth.interface'
import type { AvatarResponse, User } from '@/lib/api/interfaces/users.interface'
import { uploadAvatar } from '@/lib/api/users'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ImageUp } from 'lucide-react'
import { useRef, type FC } from 'react'
import { toast } from 'sonner'

interface Props {
  id: string
  avatar?: string
}

export const UploadAvatar: FC<Props> = ({ id, avatar }) => {
  const ref = useRef<HTMLInputElement>(null)
  const queryClient = useQueryClient()

  const handleUpload = (file?: File) => {
    if (!file) return
    mutate({ id, file })
  }

  const { mutate } = useMutation<
    AvatarResponse,
    ApiError,
    { id: string; file: File }
  >({
    mutationFn: async ({ id, file }) => await uploadAvatar(id, file),
    onSuccess: (response) => {
      queryClient.setQueryData<AuthUser>(['auth', 'user'], (old) => {
        if (!old) return old
        return {
          ...old,
          avatar: response.avatar,
        }
      })

      queryClient.setQueryData<User>(['user', id], (old) => {
        if (!old) return old
        return {
          ...old,
          avatar: response.avatar,
        }
      })
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  return (
    <div
      role="img"
      className="relative size-32 rounded-full overflow-hidden group cursor-pointer"
      onClick={() => ref.current?.click()}
    >
      <img
        src={
          avatar
            ? `${env.VITE_CF_URL}${avatar}`
            : '/dashboard/user/default-avatar.webp'
        }
        alt="Avatar"
        className="object-cover size-full"
      />
      <div className="absolute inset-0 bg-white/50 size-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
        <ImageUp size={32} />
      </div>
      <input
        ref={ref}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => handleUpload(e.target.files?.[0])}
      />
    </div>
  )
}
