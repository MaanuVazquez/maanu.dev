import { EnvelopeOpen, GithubLogo, Moon, Sun, TextT, Wheelchair } from '@phosphor-icons/react'
import { Form, Link } from '@remix-run/react'
import { useMemo } from 'react'

import { AccessibleFont } from '~/types'
import { Theme } from '~/types'

type Props = {
  theme: Theme
  font: AccessibleFont
  sections: { id: string; slug: string; name: string }[]
}

export default function Navbar({ theme, font, sections }: Props) {
  const themeToggle = useMemo(() => {
    const currentTheme = theme === Theme.System ? Theme.Light : theme
    return (
      <Form className="flex" action="/preferences/theme" method="POST">
        <input type="hidden" name="theme" value={currentTheme === Theme.Light ? Theme.Dark : Theme.Light} />
        <button formMethod="post">
          {currentTheme === Theme.Light ? (
            <Moon className="text-xl sm:text-2xl" aria-hidden />
          ) : (
            <Sun className="text-xl sm:text-2xl" aria-hidden />
          )}
          <span className="sr-only">toggle theme</span>
        </button>
      </Form>
    )
  }, [theme])

  const fontToggle = useMemo(() => {
    const fontType = font === AccessibleFont.Accessible ? AccessibleFont.Default : AccessibleFont.Accessible

    return (
      <Form className="flex" action="/preferences/font" method="POST">
        <input type="hidden" name="fontType" value={fontType} />
        <button formMethod="post">
          {font === AccessibleFont.Default ? (
            <Wheelchair className="text-xl sm:text-2xl" aria-hidden />
          ) : (
            <TextT className="text-xl sm:text-2xl" aria-hidden />
          )}
          <span className="sr-only">toggle accesibility font</span>
        </button>
      </Form>
    )
  }, [font])

  const sectionLinks = useMemo(() => {
    return sections.map(({ id, slug, name }) => (
      <li key={id} className="flex self-center">
        <Link to={`/${slug}`}>{name}</Link>
      </li>
    ))
  }, [sections])

  return (
    <header className="px-0 md:px-20">
      <nav className="flex h-14 place-items-center rounded bg-primary px-10 font-mono text-xs sm:text-lg">
        <Link className="hidden sm:inline" to="/">
          Maanu
        </Link>
        <ul className="mx-auto flex gap-x-6 sm:ml-auto sm:mr-0">
          <li className="inline self-center sm:hidden">
            <Link to="/">posts</Link>
          </li>
          {sectionLinks}
          <li className="flex self-center">{themeToggle}</li>
          <li className="flex self-center">{fontToggle}</li>
          <li className="flex self-center">
            {/* eslint-disable-next-line react/jsx-no-target-blank */}
            <a href="https://github.com/MaanuVazquez" target="_blank" rel="me">
              <GithubLogo className="text-xl sm:text-2xl" aria-hidden />
              <span className="sr-only">github</span>
            </a>
          </li>
          <li className="flex self-center">
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
