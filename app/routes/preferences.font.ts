import { redirectBack } from 'remix-utils'

import type { ActionArgs } from '@remix-run/node'
import type { AccessibleFont } from '~/types'

import { accessibleFontCookie } from '~/services/cookies/font.server'

export async function action({ request }: ActionArgs) {
  const form = await request.formData()
  const font = form.get('fontType') as AccessibleFont

  return redirectBack(request, {
    fallback: '/',
    headers: {
      'Set-Cookie': await accessibleFontCookie.serialize(font)
    }
  })
}
