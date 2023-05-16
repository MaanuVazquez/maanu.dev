import isAfter from 'date-fns/isAfter'
import isBefore from 'date-fns/isBefore'
import parseISO from 'date-fns/parseISO'

import type { LoaderArgs } from '@remix-run/node'

import { APP_CONSTANTS } from '~/constants/app'
import { getPosts } from '~/models/posts'
import { formatRFC822 } from '~/utils/date'

export async function loader({ request }: LoaderArgs) {
  const url = new URL(request.url)
  const posts = await getPosts()
  let pubDate: string = ''
  let lastBuildDate: string = ''

  const formattedPosts = posts.map(({ id, updatedAt, createdAt, title, description, slug }) => {
    if (!pubDate || isBefore(parseISO(createdAt), parseISO(pubDate))) {
      pubDate = createdAt
    }

    if (!lastBuildDate || isAfter(parseISO(updatedAt), parseISO(lastBuildDate))) {
      lastBuildDate = updatedAt
    }

    return `<item>
   <title>${title}</title>
   <description>${description}</description>
   <link>${url.origin}/posts/${slug}</link>
   <guid isPermaLink="false">${id}</guid>
   <pubDate>${formatRFC822(createdAt)}</pubDate>
  </item>`
  })

  // Mon, 06 Jan 2013 00:01:00 +0000
  const rssFeed = `<?xml version="1.0" encoding="UTF-8" ?>
 <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
 <channel>
  <atom:link href="${url.origin}/rss.xml" rel="self" type="application/rss+xml" />
  <title>${APP_CONSTANTS.title}</title>
  <description>${APP_CONSTANTS.description}</description>
  <link>${url.origin}</link>
  <lastBuildDate>${formatRFC822(lastBuildDate)}</lastBuildDate>
  <pubDate>${formatRFC822(pubDate)}</pubDate>
  <ttl>1800</ttl>
  ${formattedPosts.join('\n')}
 </channel>
 </rss>
`

  return new Response(rssFeed, {
    headers: {
      'Content-Type': 'application/xml',
      'xml-version': '1.0',
      encoding: 'UTF-8'
    },
    status: 200
  })
}
