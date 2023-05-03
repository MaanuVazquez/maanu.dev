import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react'

import type { LinksFunction } from '@remix-run/node'

import Navbar from './components/Navbar/Navbar'
import global from './styles/global.css'
import tailwind from './styles/tailwind.css'

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: global },
  { rel: 'stylesheet', href: tailwind },
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
  { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=DotGothic16&display=swap' }
]

export default function App() {
  return (
    <html lang="en" data-theme="light">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <main className="w-scren h-screen">
          <Navbar />
          <div className="my-20">
            <Outlet />
          </div>
        </main>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}
