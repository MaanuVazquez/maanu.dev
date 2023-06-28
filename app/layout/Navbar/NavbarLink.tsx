import { NavLink } from '@remix-run/react'
import classNames from 'classnames'
import { useCallback } from 'react'

import type { RemixNavLinkProps } from '@remix-run/react/dist/components'

import { linkClasses } from './utils'

export default function NavbarLink({ className, children, ...rest }: RemixNavLinkProps) {
  const navClassName = useCallback(
    ({ isActive }: { isActive: boolean }) =>
      `${classNames(
        { 'text-black': isActive, 'dark:text-white': isActive },
        {
          'text-white': !isActive,
          'dark:text-black': !isActive
        },
        linkClasses
      )} ${className}`,
    [className]
  )

  return (
    <NavLink className={navClassName} {...rest}>
      {children}
    </NavLink>
  )
}
