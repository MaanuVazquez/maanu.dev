import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { useMemo } from 'react'

import type { V2_MetaFunction } from '@remix-run/node'

import BlogGreeting from '~/components/BlogGreeting/BlogGreeting'
import Bookmark from '~/components/Bookmark/Bookmark'
import Post from '~/components/Post/Post'
import { getBookmarks } from '~/models/bookmarks'
import { getPosts } from '~/models/posts'
import { generateMeta } from '~/utils/meta'
import { isPost, sortPosts } from '~/utils/posts'

export const meta: V2_MetaFunction = () => generateMeta()

export async function loader() {
  try {
    const [posts, bookmarks] = await Promise.all([getPosts(), getBookmarks()])
    return json({ posts, bookmarks: bookmarks || [] })
  } catch (error) {
    console.error(error)
    return json({ posts: [], bookmarks: [] })
  }
}

export default function Index() {
  const { posts, bookmarks } = useLoaderData<typeof loader>()

  const allPosts = useMemo(() => {
    return sortPosts(posts, bookmarks)
  }, [posts, bookmarks])

  return (
    <article className="flex flex-col">
      <BlogGreeting />
      <ol className="mx-4 flex flex-col gap-y-3 text-xs sm:mx-auto sm:gap-y-5 sm:text-lg md:text-2xl">
        {allPosts.map(post => {
          if (isPost(post)) {
            return <Post slug={post.slug} key={post.id} title={post.title} createdAt={post.createdAt} />
          }

          return <Bookmark key={post.id} title={post.title} url={post.url} createdAt={post.createdAt} />
        })}
      </ol>
    </article>
  )
}
