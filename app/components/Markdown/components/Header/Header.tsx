import { Link } from '@phosphor-icons/react'
import classNames from 'classnames'
import { memo, useCallback, useMemo, useState } from 'react'
import CopyToClipboard from 'react-copy-to-clipboard'
import slug from 'slug'

import type { ReactNode } from 'react'

import { useUrl } from '~/hooks/useUrl'

type Props = {
  headerComponent: string
  children: ReactNode | ReactNode[]
}

function HeaderComponent({
  slug,
  children,
  headerTag,
  ...rest
}: {
  slug: string
  children: ReactNode | ReactNode[]
  headerTag: string
}) {
  switch (headerTag) {
    case 'h1':
      return (
        <h1 id={slug} {...rest}>
          {children}
        </h1>
      )
    case 'h2':
      return (
        <h2 id={slug} {...rest}>
          {children}
        </h2>
      )
    case 'h3':
      return (
        <h3 id={slug} {...rest}>
          {children}
        </h3>
      )
    case 'h4':
      return (
        <h4 id={slug} {...rest}>
          {children}
        </h4>
      )
    case 'h5':
      return (
        <h5 id={slug} {...rest}>
          {children}
        </h5>
      )
    case 'h6':
      return (
        <h6 id={slug} {...rest}>
          {children}
        </h6>
      )
    default:
      return null
  }
}

function Header({ headerComponent, children, ...rest }: Props) {
  const { href } = useUrl()
  const [showIcon, setShowIcon] = useState(false)

  const slugs = useMemo(() => {
    const headerSlug = slug(Array.isArray(children) ? (children?.[0] as string) : (children as string) || '')

    if (!href || !headerSlug) {
      return {
        headerSlug: '',
        copySlug: ''
      }
    }

    return {
      headerSlug,
      copySlug: `${href}#${headerSlug}`
    }
  }, [href, children])

  const handleMouseEnter = useCallback(() => {
    setShowIcon(true)
  }, [])

  const handleMouseLeave = useCallback(() => {
    setShowIcon(false)
  }, [])

  return (
    <>
      <CopyToClipboard text={slugs.copySlug}>
        <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className="relative cursor-pointer">
          {/* eslint-disable-next-line jsx-a11y/anchor-has-content */}
          <Link className={classNames('absolute left-[-2rem] top-1.5 hidden text-xl', { 'sm:block': showIcon })} />
          <HeaderComponent slug={slugs.headerSlug} headerTag={headerComponent} {...rest}>
            {children}
          </HeaderComponent>
        </div>
      </CopyToClipboard>
    </>
  )
}

export default memo(Header)
