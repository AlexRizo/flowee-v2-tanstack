import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { useTaskViewStore } from '@/store/taskViewStore'
import { Files, Menu, MessagesSquare } from 'lucide-react'
import { useEffect, useState } from 'react'
import { TabButton, type Tabs } from './tabs/TabButton'

export const TaskView = () => {
  const { task, clearTask } = useTaskViewStore()

  const [taskCopy, setTaskCopy] = useState(task)
  const [tab, setTab] = useState<Tabs>('Detalles')

  useEffect(() => {
    if (!task) return
    setTaskCopy(task)
  }, [task])

  const handleTabChange = (tab: Tabs) => {
    setTab(tab)
  }

  return (
    <Sheet open={!!task}>
      <SheetContent className="!max-w-2xl w-full gap-0">
        <SheetHeader className="border-b">
          <SheetTitle>{tab}</SheetTitle>
        </SheetHeader>
        <div className="flex h-full">
          <div className="w-full"></div>
          <div className="flex flex-col border border-t-0 h-full w-[110px] bg-gray-50">
            <TabButton
              label="Detalles"
              onClick={() => handleTabChange('Detalles')}
              tabSelected={tab}
            >
              <Menu />
            </TabButton>
            <TabButton
              label="Chat"
              onClick={() => handleTabChange('Chat')}
              tabSelected={tab}
            >
              <MessagesSquare />
            </TabButton>
            <TabButton
              label="Entregas"
              onClick={() => handleTabChange('Entregas')}
              tabSelected={tab}
            >
              <Files />
            </TabButton>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
