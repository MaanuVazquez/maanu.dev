import { useMatches } from '@remix-run/react'
import { z } from 'zod'

const urlSchema = z.object({
  origin: z.string(),
  href: z.string()
})

export function useUrl() {
  const matches = useMatches()
  const urlMatch = matches.find(match => match.data.href && match.data.origin)

  const result = urlSchema.safeParse(urlMatch?.data)

  if (!result.success) {
    return { href: null, origin: null }
  }

  return result.data
}
