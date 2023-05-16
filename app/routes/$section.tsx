import { Await, Outlet, useLoaderData } from '@remix-run/react'
import { Suspense } from 'react'
import invariant from 'tiny-invariant'

import type { LoaderArgs, V2_MetaDescriptor } from '@remix-run/node'
import type { V2_MetaArgs } from '@remix-run/react'

import { getSection } from '~/models/sections'
import { generateArticleMeta } from '~/utils/meta'
import { checkExists, deferIfMobile } from '~/utils/ssr.server'

export async function loader({ params, request }: LoaderArgs) {
  const slug = params.section as string
  invariant(slug, 'Expected a section slug')

  return deferIfMobile({ section: getSection(slug).then(checkExists) }, request)
}

export const handle = {
  hydrate: false
}

export function meta({ data }: V2_MetaArgs): V2_MetaDescriptor[] {
  return generateArticleMeta({
    title: data.section.name,
    updatedAt: data.section.updatedAt,
    createdAt: data.section.createdAt
  })
}

export default function PostSlug() {
  const { section } = useLoaderData<typeof loader>()

  return (
    <article className="max-w-screen prose mx-4 h-full sm:mx-auto">
      <Suspense fallback={null}>
        <Await resolve={section}>
          <Outlet />
        </Await>
      </Suspense>
    </article>
  )
}
