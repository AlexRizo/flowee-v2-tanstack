import { Link, useLocation, type LinkProps } from '@tanstack/react-router'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '../ui/breadcrumb'
import { Home } from 'lucide-react'
import { Fragment, useMemo, type FC } from 'react'
import { sanitizePath } from '@/helpers/sanitizePath'

export const Breadcrumbs: FC = () => {
  const location = useLocation()

  const paths = useMemo(() => {
    const segments = location.pathname.split('/').filter(Boolean)
    console.log(segments)
    return segments
  }, [location.pathname])

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link to="/">
              <Home className="size-5" />
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        {paths.map((path, index) => {
          const to = ('/' +
            paths.slice(0, index + 1).join('/')) as LinkProps['to']

          return (
            <Fragment key={path}>
              <BreadcrumbSeparator>
                <span className="font-medium pointer-events-none">/</span>
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to={to}>
                    <span className="text-sm">{sanitizePath(path)}</span>
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
            </Fragment>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
