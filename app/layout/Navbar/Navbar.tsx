import { EnvelopeOpen, GithubLogo } from '@phosphor-icons/react'
import { useMemo } from 'react'

import type { AccessibleFont } from '~/types'
import type { Theme } from '~/types'

import AccessibleFontToggle from '~/components/AccessibleFontToggle/AccessibltFontToggle'
import ThemeToggle from '~/components/ThemeToggle/ThemeToggle'

import NavbarLink from './NavbarLink'
import { linkClasses } from './utils'

type Props = {
  theme: Theme
  font: AccessibleFont
  sections: { id: string; slug: string; name: string }[]
}

export default function Navbar({ theme, font, sections }: Props) {
  const sectionLinks = useMemo(() => {
    return sections.map(({ id, slug, name }) => (
      <li key={id} className="flex self-center">
        <NavbarLink to={`/${slug}`}>{name}</NavbarLink>
      </li>
    ))
  }, [sections])

  return (
    <header className="px-0 md:px-20">
      <nav className="flex h-14 place-items-center rounded bg-primary px-10 font-mono text-xs dark:text-black sm:text-lg">
        <NavbarLink className="hidden sm:inline" to="/">
          Maanu
        </NavbarLink>
        <ul className="mx-auto flex gap-x-6 sm:ml-auto sm:mr-0">
          <li className="inline self-center sm:hidden">
            <NavbarLink to="/">posts</NavbarLink>
          </li>
          {sectionLinks}
          <li className={linkClasses}>
            <ThemeToggle theme={theme} />
          </li>
          <li className={linkClasses}>
            <AccessibleFontToggle font={font} />
          </li>
          <li className={linkClasses}>
            {/* eslint-disable-next-line react/jsx-no-target-blank */}
            <a href="https://github.com/MaanuVazquez" target="_blank" rel="me">
              <GithubLogo className="text-xl sm:text-2xl" aria-hidden />
              <span className="sr-only">github</span>
            </a>
          </li>
          <li className={linkClasses}>
            <a href="mailto:maanuvazquez@gmail.com" rel="noreferrer">
              <EnvelopeOpen className="text-xl sm:text-2xl" aria-hidden />
              <span className="sr-only">contact</span>
            </a>
          </li>
        </ul>
      </nav>
    </header>
  )
}
