import { TextT, Wheelchair } from '@phosphor-icons/react'
import { useFetcher } from '@remix-run/react'
import { useMemo } from 'react'

import { AccessibleFont } from '~/types'

type Props = {
  font: AccessibleFont
}

export default function AccessibleFontToggle({ font }: Props) {
  const fontType = font === AccessibleFont.Accessible ? AccessibleFont.Default : AccessibleFont.Accessible
  const fetcher = useFetcher()

  const currentFont = useMemo(() => {
    if (fetcher.state === 'idle') {
      return font
    }

    return fontType
  }, [font, fetcher, fontType])

  return (
    <fetcher.Form className="flex" action="/preferences/font" method="POST">
      <input type="hidden" name="fontType" value={fontType} />
      <button formMethod="post">
        {currentFont === AccessibleFont.Default ? (
          <Wheelchair className="text-xl sm:text-2xl" aria-hidden />
        ) : (
          <TextT className="text-xl sm:text-2xl" aria-hidden />
        )}
        <span className="sr-only">toggle accesibility font</span>
      </button>
    </fetcher.Form>
  )
}
