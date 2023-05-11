import { memo } from 'react'
import slug from 'slug'

import type { ReactNode } from 'react'

type Props = {
  headerComponent: string
  children: ReactNode | ReactNode[]
}

function Header({ headerComponent, children, ...rest }: Props) {
  const headerSlug = slug(Array.isArray(children) ? (children?.[0] as string) : (children as string) || '')
  switch (headerComponent) {
    case 'h1':
      return (
        <h1 id={headerSlug} {...rest}>
          {children}
        </h1>
      )
    case 'h2':
      return (
        <h2 id={headerSlug} {...rest}>
          {children}
        </h2>
      )
    case 'h3':
      return (
        <h3 id={headerSlug} {...rest}>
          {children}
        </h3>
      )
    case 'h4':
      return (
        <h4 id={headerSlug} {...rest}>
          {children}
        </h4>
      )
    case 'h5':
      return (
        <h5 id={headerSlug} {...rest}>
          {children}
        </h5>
      )
    case 'h6':
      return (
        <h6 id={headerSlug} {...rest}>
          {children}
        </h6>
      )
    default:
      return null
  }
}

export default memo(Header)
