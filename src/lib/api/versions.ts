import { apiPatch } from './api'
import type {
  CheckVersionDTO,
  Version,
} from './interfaces/deliveries.interface'

export const checkVersion = async ({
  versionId,
  ...version
}: CheckVersionDTO) => {
  return await apiPatch<Version>(`versions/${versionId}/check`, version)
}
