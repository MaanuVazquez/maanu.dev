import { redirectBack } from 'remix-utils'

import type { ActionArgs } from '@remix-run/node'
import type { Theme } from '~/types'

import { themeCookie } from '~/services/cookies/theme.server'

export const action = async ({ request }: ActionArgs) => {
  const form = await request.formData()
  const theme = form.get('theme') as Theme

  return redirectBack(request, {
    fallback: '/',
    headers: {
      'Set-Cookie': await themeCookie.serialize(theme)
    }
  })
}
