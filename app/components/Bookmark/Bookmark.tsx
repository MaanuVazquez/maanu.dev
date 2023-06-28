import { Bookmark as BookmarkIcon } from '@phosphor-icons/react'
import { memo } from 'react'

import { formatRichDate } from '~/utils/date'

type Props = {
  title: string
  createdAt: string
  url: string
}

function Bookmark({ title, createdAt, url }: Props) {
  return (
    <li>
      <BookmarkIcon className='inline rounded-xl bg-accent p-1 text-3xl sm:text-5xl' aria-hidden />
      <span className='sr-only'>I read about </span>
      <a href={url} target='_blank' rel='noreferrer' className='link ml-4 sm:ml-5'>
        {title}
      </a>
      <span className='hidden sm:inline'> on {formatRichDate(createdAt)}</span>
    </li>
  )
}

export default memo(Bookmark)
