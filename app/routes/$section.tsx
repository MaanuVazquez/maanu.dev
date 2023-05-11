import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { notFound } from 'remix-utils'
import invariant from 'tiny-invariant'

import type { LoaderArgs, V2_MetaDescriptor } from '@remix-run/node'
import type { V2_MetaArgs } from '@remix-run/react'

import Markdown from '~/components/Markdown/Markdown'
import { getSection } from '~/models/sections'
import { generateMeta } from '~/utils/meta'

export async function loader({ params }: LoaderArgs) {
  const slug = params.section as string
  invariant(slug, 'Expected a section slug')

  const section = await getSection(slug)

  if (!section) {
    throw notFound({})
  }

  return json({ section })
}

export function meta({ data }: V2_MetaArgs): V2_MetaDescriptor[] {
  return generateMeta(data.section.name)
}

export default function PostSlug() {
  const { section } = useLoaderData<typeof loader>()

  if (!section) {
    return null
  }

  return (
    <article className="max-w-screen prose mx-4 h-full sm:mx-auto">
      <h1 className="text-primary">{section.name}</h1>
      <hr className="mt-0" />
      <Markdown>{section.body}</Markdown>
    </article>
  )
}
