import { MoonStars, SunDim } from '@phosphor-icons/react'
import { memo } from 'react'

import { getCurrentDayPeriod } from '~/utils/date'
import { capitalizeWord } from '~/utils/string'

function BlogGreeting() {
  const currentPeriod = getCurrentDayPeriod()
  const greeting = 'welcome to my dev blog'

  switch (currentPeriod) {
    case 'Morning':
    case 'Noon':
    case 'Afternoon':
      return (
        <h1 className="mx-auto mb-10 text-xl sm:text-3xl">
          Good {currentPeriod}
          <SunDim className="inline align-text-top text-sm text-accent sm:text-xl" aria-hidden />, {greeting}
        </h1>
      )

    case 'Evening':
    case 'Night':
      return (
        <h1 className="mx-auto mb-10 text-xl sm:text-3xl">
          Good {currentPeriod}
          <MoonStars
            weight="duotone"
            className="inline align-text-top text-sm text-primary sm:text-lg"
            aria-hidden
          />, {greeting}
        </h1>
      )

    default: {
      return <h1 className="mx-auto mb-10 text-xl sm:text-3xl">{capitalizeWord(greeting)}</h1>
    }
  }
}

export default memo(BlogGreeting)
