export const UserStats = () => {
  return (
    <div role="grid" className="grid grid-cols-3 gap-4 mt-8">
      <div
        role="cell"
        className="bg-neutral-100 px-4 py-6 rounded-2xl text-center shadow"
      >
        <h2 className="font-medium">Tareas resueltas</h2>
        <p>{500}</p>
      </div>
      <div
        role="cell"
        className="bg-neutral-100 px-4 py-6 rounded-2xl text-center shadow"
      >
        <h2 className="font-medium">Tareas Pendientes</h2>
        <p>{500}</p>
      </div>
      <div
        role="cell"
        className="bg-neutral-100 px-4 py-6 rounded-2xl text-center shadow"
      >
        <h2 className="font-medium">Tareas en Proceso</h2>
        <p>{500}</p>
      </div>
    </div>
  )
}
