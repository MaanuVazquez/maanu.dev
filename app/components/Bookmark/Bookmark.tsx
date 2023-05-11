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
      <a href={url} target="_blank" rel="noreferrer">
        <div className="flex flex-row place-items-center gap-x-2 sm:gap-x-5">
          <BookmarkIcon className="rounded-xl bg-accent p-1 text-3xl sm:text-5xl" aria-hidden />
          <span className="sr-only">I read about </span>
          <p>
            <span className="link">{title}</span>{' '}
            <span className="hidden sm:inline">on {formatRichDate(createdAt)}</span>
          </p>
        </div>
      </a>
    </li>
  )
}

export default memo(Bookmark)
