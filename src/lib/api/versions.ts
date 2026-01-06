import { apiGet, apiPatch } from './api'
import type {
  CheckVersionDTO,
  GetVersionFileDTO,
  Version,
} from './interfaces/deliveries.interface'

export const checkVersion = async ({
  versionId,
  ...version
}: CheckVersionDTO) => {
  return await apiPatch<Version>(`versions/${versionId}/check`, version)
}

export const getVersionFile = async ({
  versionId,
  download,
}: GetVersionFileDTO) => {
  return await apiGet<string>(
    `/versions/${versionId}/upload?download=${download}`,
  )
}