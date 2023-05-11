import { createCookie } from '@remix-run/node'

import { Theme } from '~/types'

import { vars } from '../vars.server'

export const themeCookie = createCookie('theme', {
  httpOnly: true,
  secure: vars.NODE_ENV === 'production'
})

export async function getThemeFromCookies(request: Request) {
  const theme: Theme | undefined = await themeCookie.parse(request.headers.get('Cookie'))
  return theme || Theme.System
}
