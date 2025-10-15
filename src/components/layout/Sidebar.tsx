import { LogOut, SquareChevronLeft } from 'lucide-react'
import { Button } from '../ui/button'
import { Navlink } from './Navlink'
import { useState } from 'react'
import { cn } from '@/lib/utils'

export const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <aside
      className={cn(
        'h-screen p-4 bg-white border-r flex flex-col transition-[width]',
        isCollapsed ? 'w-18' : 'w-64',
      )}
    >
      <div className="flex items-center gap-2">
        <h1 className={cn('text-2xl font-black', isCollapsed && 'hidden')}>
          Flowee
        </h1>
        <img
          src="/logos/flowee-icon.webp"
          alt="Logo de Flowee"
          className={cn(
            'size-4 transition-[width_height]',
            isCollapsed && 'size-7.5 mx-auto',
          )}
        />
      </div>
      <nav className="mt-6 flex flex-col gap-4 h-full">
        <div className="flex flex-col gap-2">
          <small
            className={cn(
              'text-muted-foreground whitespace-nowrap',
              isCollapsed && 'hidden',
            )}
          >
            Centro de control
          </small>
          <Navlink to="/" icon="home" label="Inicio" collapsed={isCollapsed} />
          <Navlink
            to="/centro-de-asignaciones"
            icon="git-pull-request-create-arrow"
            label="Centro de asignaciones"
            collapsed={isCollapsed}
          />
          <Navlink
            to="/mis-tareas"
            icon="rocket"
            label="Mis tareas"
            collapsed={isCollapsed}
          />
          <Navlink
            to="/solicitudes"
            icon="clipboard-list"
            label="Solicitudes"
            collapsed={isCollapsed}
          />
        </div>
        <div className="flex flex-col gap-2">
          <small
            className={cn(
              'text-muted-foreground whitespace-nowrap',
              isCollapsed && 'hidden',
            )}
          >
            Configuración
          </small>
          <Navlink
            to="/usuarios"
            icon="users"
            label="Usuarios"
            collapsed={isCollapsed}
          />
          <Navlink
            to="/tableros"
            icon="folder-tree"
            label="Tableros"
            collapsed={isCollapsed}
          />
          <Navlink
            to="/cuenta"
            icon="user"
            label="Cuenta"
            collapsed={isCollapsed}
          />
          <Navlink
            to="/ajustes"
            icon="settings"
            label="Ajustes"
            collapsed={isCollapsed}
          />
        </div>
        <div className="flex flex-col mt-auto">
          <Button className="whitespace-nowrap">
            <LogOut />
            {!isCollapsed && 'Cerrar sesión'}
          </Button>
          <aside className="flex mt-2 items-center">
            <div>
              <img
                src="/logos/alowee-interactive.webp"
                alt="Alowee Interactive"
                className={cn('w-16', isCollapsed && 'hidden')}
              />
              <small
                className={cn('text-muted-foreground', isCollapsed && 'hidden')}
              >
                &copy; Flowee - {new Date().getFullYear()} Alowee Interactive.
              </small>
            </div>
            <SquareChevronLeft
              className={cn(
                'cursor-pointer hover:text-indigo-600 transition-colors',
                isCollapsed && 'rotate-180 mx-auto',
              )}
              onClick={() => setIsCollapsed((prev) => !prev)}
            />
          </aside>
        </div>
      </nav>
    </aside>
  )
}
