import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { useTaskViewStore } from '@/store/taskViewStore'
import { Files, Menu, MessagesSquare } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { TabButton, type Tabs } from './tabs/TabButton'
import { TaskDetails } from './tabs/details/TaskDetails'
import type { Task } from '@/lib/api/interfaces/tasks.interface'
import { TaskChat } from './tabs/chat/TaskChat'

type CloseReason = 'outside' | 'escape' | 'button' | 'programmatic'

export const TaskView = () => {
  const { task, clearTask } = useTaskViewStore()

  const [taskCopy, setTaskCopy] = useState<Task | null>(task)
  const [tab, setTab] = useState<Tabs>('Detalles')

  useEffect(() => {
    if (!task) return
    setTaskCopy(task)
  }, [task])

  const handleTabChange = (tab: Tabs) => {
    setTab(tab)
  }

  const closeReasonRef = useRef<CloseReason>('programmatic')

  return (
    <Sheet
      open={!!task}
      onOpenChange={(nextOpen) => {
        if (!nextOpen) {
          closeReasonRef.current = 'programmatic'
          clearTask()
        }
      }}
    >
      <SheetContent
        className="!max-w-2xl w-full gap-0"
        onInteractOutside={() => {
          closeReasonRef.current = 'outside'
        }}
        onEscapeKeyDown={() => {
          closeReasonRef.current = 'escape'
        }}
      >
        <SheetHeader className="border-b">
          <SheetTitle>{tab}</SheetTitle>
          <SheetDescription />
        </SheetHeader>
        <div className="flex h-full">
          <div className="size-full flex flex-col p-4">
            {tab === 'Detalles' && taskCopy ? (
              <TaskDetails {...taskCopy} />
            ) : tab === 'Chat' && taskCopy ? (
              <TaskChat taskId={taskCopy.id} />
            ) : null}
          </div>
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
