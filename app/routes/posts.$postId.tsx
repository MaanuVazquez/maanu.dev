import { Calendar, Coffee } from '@phosphor-icons/react'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { notFound } from 'remix-utils'
import invariant from 'tiny-invariant'

import type { LoaderArgs } from '@remix-run/node'
import type { V2_MetaArgs } from '@remix-run/react'

import Markdown from '~/components/Markdown/Markdown'
import { getPost } from '~/models/posts'
import { formatMonthDayYear } from '~/utils/date'
import { generateMeta } from '~/utils/meta'
import { isPostEdited, calculateReadTime } from '~/utils/posts'

export async function loader({ params }: LoaderArgs) {
  const slug = params.postId as string
  invariant(slug, 'Expected a post slug')

  const post = await getPost(slug)

  if (!post) {
    throw notFound({})
  }

  return json({ post })
}

export function meta({ data }: V2_MetaArgs) {
  return generateMeta(data.post.title, data.post.description)
}

export default function PostSlug() {
  const { post } = useLoaderData<typeof loader>()

  return (
    <article className="max-w-screen prose mx-4 h-full sm:mx-auto">
      <h1 className="text-primary">{post.title}</h1>
      <div className="flex flex-col gap-x-4 md:flex-row">
        <p className="mb-0 mt-0 flex place-items-center gap-x-4">
          <Calendar aria-hidden weight="bold" className="text-xl text-primary" />
          Posted on {formatMonthDayYear(post.createdAt)}
          {isPostEdited(post.createdAt, post.updatedAt) && (
            <span className="hidden md:block">
              and updated on <b>{formatMonthDayYear(post.updatedAt)}</b>
            </span>
          )}
        </p>
      </div>
      <p className="mb-0 mt-0 flex place-items-center gap-x-4">
        <Coffee aria-hidden weight="bold" className="text-xl text-primary" />
        {calculateReadTime(post.body.length)} min read
      </p>
      <hr className="mt-0" />
      <Markdown>{post.body}</Markdown>
    </article>
  )
}
