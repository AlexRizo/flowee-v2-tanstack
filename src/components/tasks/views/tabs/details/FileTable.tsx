import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { FileTableContent } from './FileTableContent'
import { useEffect, type FC } from 'react'
import { useTasks } from '@/hooks/useTasks'
import { toast } from 'sonner'
import { Spinner } from '@/components/ui/spinner'

interface Props {
  taskId: string
}

export const FileTable: FC<Props> = ({ taskId }) => {
  const { taskFilesQuery } = useTasks({ taskId })

  useEffect(() => {
    if (taskFilesQuery.error) {
      toast.error(taskFilesQuery.error.message)
    }
  }, [taskFilesQuery.error])

  const referenceFiles = (taskFilesQuery.data || []).filter(
    (file) => file.type === 'REFERENCE',
  )
  const requiredFiles = (taskFilesQuery.data || []).filter(
    (file) => file.type === 'REQUIRED',
  )

  return (
    <Tabs defaultValue="references" className="bg-gray-100 rounded-md">
      <TabsList className="w-full">
        <TabsTrigger value="references">Referencias gráficas</TabsTrigger>
        <TabsTrigger value="required">Archivos para el diseño</TabsTrigger>
      </TabsList>
      <TabsContent value="references" className="border rounded-b">
        {taskFilesQuery.isPending ? (
          <Spinner className="mx-auto my-4" />
        ) : (
          <FileTableContent
            files={referenceFiles}
            tabType="REFERENCE"
            taskId={taskId}
          />
        )}
      </TabsContent>
      <TabsContent value="required" className="border rounded-b">
        {taskFilesQuery.isPending ? (
          <Spinner className="mx-auto my-4" />
        ) : (
          <FileTableContent
            files={requiredFiles}
            tabType="REQUIRED"
            taskId={taskId}
          />
        )}
      </TabsContent>
    </Tabs>
  )
}
