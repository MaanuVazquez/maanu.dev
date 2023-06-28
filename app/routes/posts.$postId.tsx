import { Await, Outlet, useLoaderData } from '@remix-run/react'
import { Suspense } from 'react'
import invariant from 'tiny-invariant'

import type { LoaderArgs } from '@remix-run/node'
import type { V2_MetaArgs } from '@remix-run/react'

import { getPost } from '~/models/posts'
import { generateArticleMeta } from '~/utils/meta'
import { checkExists, deferIfMobile } from '~/utils/ssr.server'

export async function loader({ params, request }: LoaderArgs) {
  const slug = params.postId as string
  invariant(slug, 'Expected a post slug')

  return deferIfMobile(
    {
      post: getPost(slug).then(checkExists)
    },
    request
  )
}

export function meta({ data }: V2_MetaArgs) {
  return generateArticleMeta({
    title: data.post.title,
    updatedAt: data.post.updatedAt,
    createdAt: data.post.createdAt,
    description: data.post.description
  })
}

export default function PostSlug() {
  const { post } = useLoaderData<typeof loader>()

  return (
    <article className='max-w-screen prose mx-4 h-full sm:mx-auto'>
      <Suspense fallback={null}>
        <Await resolve={post}>
          <Outlet />
        </Await>
      </Suspense>
    </article>
  )
}
