import type { LoaderArgs } from '@remix-run/node'

export async function loader({ request }: LoaderArgs) {
  const origin = new URL(request.url).origin

  return new Response(
    `User-agent: *
Allow: /
Disallow: /preferences/*

Sitemap: ${origin}/sitemap.xml`,
    {
      headers: {
        'Content-Type': 'text/plain'
      },
      status: 200
    }
  )
}
