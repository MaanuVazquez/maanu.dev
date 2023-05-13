import { json, type LinksFunction, type LoaderArgs } from '@remix-run/node'
import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration, useLoaderData } from '@remix-run/react'
import { useMemo } from 'react'

import { APP_CONSTANTS, FAVICONS } from './constants/app'
import { useIsBot } from './context/IsBot'
import { useShouldDisableScripts } from './hooks/useShouldDisableScripts'
import { Footer } from './layout/Footer/Footer'
import Navbar from './layout/Navbar/Navbar'
import { getSections } from './models/sections'
import { getFontFromCookies } from './services/cookies/font.server'
import { getThemeFromCookies } from './services/cookies/theme.server'
import global from './styles/global.css'
import tailwind from './styles/tailwind.css'
import { Theme } from './types'

export const links: LinksFunction = () => [
  { rel: 'preload', href: global },
  { rel: 'preload', href: tailwind },
  { rel: 'stylesheet', href: global },
  { rel: 'stylesheet', href: tailwind },
  {
    rel: 'manifest',
    href: '/app.webmanifest'
  },
  ...FAVICONS
]

export const loader = async ({ request }: LoaderArgs) => {
  const [sections, theme, font] = await Promise.all([
    getSections(),
    getThemeFromCookies(request),
    getFontFromCookies(request)
  ])

  const sectionsWithSlug = sections.map(({ id, slug, name }) => ({ slug, id, name }))
  const parsedUrl = new URL(request.url)

  return json({ sections: sectionsWithSlug, theme, font, origin: request.url, href: parsedUrl.href })
}

export default function App() {
  const { theme, font, sections, origin, href } = useLoaderData<typeof loader>()

  const isBot = useIsBot()
  const shouldDisableScripts = useShouldDisableScripts() || isBot

  const htmlProps = useMemo(() => {
    return {
      lang: APP_CONSTANTS.locale,
      'data-theme': theme === Theme.System ? undefined : theme,
      'data-font': font,
      'xmlns:og': 'http://opengraphprotocol.org/schema/'
    }
  }, [theme, font])

  return (
    <html {...htmlProps}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
        <meta name="apple-mobile-web-app-title" content={APP_CONSTANTS.title} />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content={APP_CONSTANTS.themeColor} />
        <meta name="theme-color" content={APP_CONSTANTS.themeColor} />
        <meta name="author" content="Maanu Vazquez" />
        <meta name="HandheldFriendly" content="True" />
        <meta name="language" content={APP_CONSTANTS.locale} />
        <meta name="MobileOptimized" content="320" />
        <meta name="pagename" content={APP_CONSTANTS.title} />
        <meta property="og:url" content={href} />
        <meta property="og:locale" content={APP_CONSTANTS.locale} />
        <meta property="og:image" content={`${origin}/android-chrome-512x512.png`} />
        <meta property="og:site_name" content={APP_CONSTANTS.title} />
        <link rel="canonical" href={href} />
        <link rel="webmention" href="https://webmention.io/maanu.dev/webmention" />
        <link rel="pingback" href="https://webmention.io/maanu.dev/xmlrpc" />
        <Meta />
        <Links />
      </head>
      <body>
        <main className="flex h-screen w-full flex-col justify-between pb-20">
          <Navbar sections={sections} font={font} theme={theme} />
          <div className="my-10 px-5 sm:my-20 sm:px-0">
            <Outlet />
          </div>
          <Footer />
        </main>
        {shouldDisableScripts ? null : <ScrollRestoration />}
        {shouldDisableScripts ? null : <Scripts />}
        <LiveReload />
      </body>
    </html>
  )
}
