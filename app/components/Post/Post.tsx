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
      <ArticleIcon className='inline rounded-xl bg-primary p-1 text-3xl sm:text-5xl' aria-hidden />
      <span className='sr-only'>I wrote </span>
      <Link to={`/posts/${slug}`} className='link ml-4 sm:ml-5'>
        {title}
      </Link>
      <span className='hidden no-underline sm:inline'> on {formatRichDate(createdAt)}</span>
    </li>
  )
}

export default memo(Post)
