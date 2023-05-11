import { createCookie } from '@remix-run/node'

import { AccessibleFont } from '~/types'

import { vars } from '../vars.server'

export const accessibleFontCookie = createCookie('font-type', {
  httpOnly: true,
  secure: vars.NODE_ENV === 'production'
})

export async function getFontFromCookies(request: Request) {
  const font: AccessibleFont | undefined = await accessibleFontCookie.parse(request.headers.get('Cookie'))
  return font || AccessibleFont.Default
}
