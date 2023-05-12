import { useMatches } from '@remix-run/react'

export function useShouldDisableScripts() {
  const matches = useMatches()

  return matches.some(match => match.handle?.hydrate === false)
}
