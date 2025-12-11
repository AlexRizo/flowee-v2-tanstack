import { BoardsNav } from './BoardsNav'
import { Breadcrumbs } from './Breadcrumbs'
import { UserNav } from './UserNav'

export const Navbar = () => {
  return (
    <nav className="w-full px-4 h-16 flex items-center justify-between bg-white border-b relative">
      <Breadcrumbs />
      <div className="flex items-center gap-2 absolute left-1/2 -translate-x-1/2">
        <BoardsNav />
        <UserNav />
      </div>
      <div className="ml-auto"></div>
    </nav>
  )
}
