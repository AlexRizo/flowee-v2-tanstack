import { Navlink } from './Navlink'

export const Sidebar = () => {
  return (
    <aside className="h-screen w-60 bg-gray-100 px-4 pt-2 flex flex-col">
      <h1 className="text-2xl font-bold">Flowee</h1>
      <nav className="mt-6 space-y-4">
        <div className="flex flex-col gap-2">
          <small className="text-muted-foreground">Centro de control</small>
          <Navlink to="/" icon="home" label="Inicio" />
          <Navlink
            to="/centro-de-asignaciones"
            icon="git-compare-arrows"
            label="Centro de asignaciones"
          />
          <Navlink to="/mis-tareas" icon="clipboard-list" label="Mis tareas" />
        </div>
        <div className="flex flex-col gap-2">
          <small className="text-muted-foreground">Tableros</small>
          <Navlink to="/" icon="home" label="Inicio" />
          <Navlink
            to="/centro-de-asignaciones"
            icon="git-compare-arrows"
            label="Centro de asignaciones"
          />
          <Navlink to="/mis-tareas" icon="clipboard-list" label="Mis tareas" />
        </div>
      </nav>
    </aside>
  )
}
