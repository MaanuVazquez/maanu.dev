import { Article as ArticleIcon } from '@phosphor-icons/react'
import { Link } from '@remix-run/react'
import { memo } from 'react'

import { formatRichDate } from '~/utils/date'

type Props = {
  title: string
  createdAt: string
  slug: string
}

function Post({ title, createdAt, slug }: Props) {
  return (
    <li>
      <Link to={`/posts/${slug}`}>
        <div className="flex flex-row place-items-center gap-x-2 sm:gap-x-5">
          <ArticleIcon className="rounded-xl bg-primary p-1 text-3xl sm:text-5xl" aria-hidden />
          <span className="sr-only">I wrote </span>
          <p>
            <span className="link">{title}</span>
            <span className="hidden sm:inline"> on {formatRichDate(createdAt)}</span>
          </p>
        </div>
      </Link>
    </li>
  )
}

export default memo(Post)
