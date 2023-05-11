import type { V2_MetaDescriptor } from '@remix-run/node'

import { APP_CONSTANTS } from '~/constants/app'

export function generateMeta(title: string = APP_CONSTANTS.title, description: string = APP_CONSTANTS.description) {
  const meta: V2_MetaDescriptor[] = [
    {
      title: title
    },
    {
      name: 'title',
      content: title
    },
    {
      name: 'og:title',
      content: title
    },
    {
      name: 'description',
      content: description
    },
    {
      name: 'og:description',
      content: description
    }
  ]

  return meta
}
