import type { LinkDescriptor } from '@remix-run/node'

export const APP_CONSTANTS = {
  author: 'Emmanuel Vazquez',
  authorAlias: 'Maanu',
  title: "Maanu's Blog",
  description: 'The mighty devadventures of Maanu',
  locale: 'en',
  themeColor: '#B2A4FF',
  backgroundColor: '#000'
}

export const FAVICONS: LinkDescriptor[] = [
  {
    rel: 'icon',
    type: 'image/png',
    href: '/favicon-16x16.png',
    sizes: '16x16'
  },
  {
    rel: 'icon',
    type: 'image/png',
    href: '/favicon-32x32.png',
    sizes: '32x32'
  },
  {
    rel: 'icon',
    type: 'image/png',
    href: '/android-chrome-192x192.png',
    sizes: '192x192'
  },
  {
    rel: 'icon',
    type: 'image/png',
    href: '/android-chrome-512x512.png',
    sizes: '512x512'
  },
  { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' }
]
