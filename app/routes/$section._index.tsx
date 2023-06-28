import { useAsyncValue } from '@remix-run/react'

import type { Section } from '~/models/sections'

import Markdown from '~/components/Markdown/Markdown'
import { capitalizeWord } from '~/utils/string'

export default function SectionLayout() {
  const section = useAsyncValue() as Section
  return (
    <>
      <h1 className='dark:text-primary'>{capitalizeWord(section.name)}</h1>
      <hr className='mt-0' />
      <Markdown>{section.body}</Markdown>
    </>
  )
}
