import { json } from '@remix-run/node'

import { APP_CONSTANTS } from '~/constants/app'

export function loader() {
  return json({
    name: APP_CONSTANTS.title,
    short_name: APP_CONSTANTS.title,
    icons: [
      { src: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { src: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' }
    ],
    theme_color: APP_CONSTANTS.themeColor,
    background_color: APP_CONSTANTS.backgroundColor,
    display: 'standalone'
  })
}
