import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { AlertCircle } from "lucide-react"

export const FileSizeAlert = () => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <AlertCircle className="text-red-600 mr-1" size={16} />
      </TooltipTrigger>
      <TooltipContent>
        Excede el tamaño máximo (5 Mb)
      </TooltipContent>
    </Tooltip>
  )
}
