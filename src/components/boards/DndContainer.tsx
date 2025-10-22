import { closestCenter, DndContext, PointerSensor, useSensor, useSensors } from "@dnd-kit/core"
import { Column } from "./Column"

export const DndContainer = () => {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    })
  )
  
  return (
    <DndContext
      sensors={sensors}
      collisionDetection={ closestCenter }

    >
      <section className="grid grid-cols-5 gap-5">
        <Column></Column>
        <Column></Column>
        <Column></Column>
        <Column></Column>
        <Column></Column>
      </section>
    </DndContext>
  )
}
