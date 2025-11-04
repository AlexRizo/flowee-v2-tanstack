import { useTaskStore } from '@/store/taskStore'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/tareas')({
  component: RouteComponent,
})

function RouteComponent() {
  const { step } = useTaskStore()

  return (
    <section className="size-full flex items-center justify-center">
      <div
        role="form"
        className="bg-white px-14 py-8 relative rounded-lg shadow flex flex-col items-center w-[650px] h-[720px]"
      >
        <span className="bg-violet-500 size-7.5 rounded-full flex items-center justify-center text-white absolute -top-3">
          {step}
        </span>
        <Outlet />
      </div>
    </section>
  )
}
