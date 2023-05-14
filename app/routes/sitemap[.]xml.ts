import type { LoaderArgs } from '@remix-run/node'
import type { Post } from '~/models/posts'

import { getPosts } from '~/models/posts'
import { getSections } from '~/models/sections'

export async function loader({ request }: LoaderArgs) {
  const { origin } = new URL(request.url)
  const [posts, sections] = await Promise.all([getPosts(), getSections()])

  const generatedUrls = [...posts, ...sections].map(publishedUrl => {
    const url = (publishedUrl as Post).title ? `posts/${publishedUrl.slug}` : publishedUrl.slug

    return `<url>
    <loc>${origin}/${url}</loc>
    <lastmod>${publishedUrl.updatedAt}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
    </url>`
  })

  const sitemapContent = `<?xml version="1.0" encoding="utf-8"?>
<urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
 <url>
   <loc>${origin}</loc>
   <changefreq>monthly</changefreq>
   <priority>0.8</priority>
 </url>
 ${generatedUrls.join('\n')}
</urlset>
  `

  return new Response(sitemapContent, {
    headers: {
      'Content-Type': 'application/xml',
      'xml-version': '1.0',
      encoding: 'UTF-8'
    },
    status: 200
  })
}
