import { BoardsNav } from './BoardsNav'
import { Breadcrumbs } from './Breadcrumbs'

export const Navbar = () => {
  return (
    <nav className='w-full px-4 h-16 flex items-center justify-between bg-white border-b relative'>
      <Breadcrumbs />
      <BoardsNav />
      <div className='ml-auto'></div>
    </nav>
  )
}
