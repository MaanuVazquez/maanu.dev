import { Moon, Sun } from '@phosphor-icons/react'
import { useFetcher } from '@remix-run/react'
import { useMemo } from 'react'

import { Theme } from '~/types'

type Props = {
  theme: Theme
}

export function getOppositeTheme(theme: Theme) {
  return theme === Theme.Dark ? Theme.Light : Theme.Dark
}

export default function ThemeToggle({ theme }: Props) {
  const fetcher = useFetcher()

  const currentTheme = useMemo(() => {
    if (fetcher.state === 'idle') {
      return theme === Theme.System ? Theme.Light : theme
    }

    return getOppositeTheme(theme)
  }, [fetcher, theme])

  return (
    <fetcher.Form className="flex" action="/preferences/theme" method="POST">
      <input type="hidden" name="theme" value={currentTheme === Theme.Light ? Theme.Dark : Theme.Light} />
      <button formMethod="post">
        {currentTheme === Theme.Light ? (
          <Moon className="text-xl sm:text-2xl" aria-hidden />
        ) : (
          <Sun className="text-xl sm:text-2xl" aria-hidden />
        )}
        <span className="sr-only">toggle theme</span>
      </button>
    </fetcher.Form>
  )
}
