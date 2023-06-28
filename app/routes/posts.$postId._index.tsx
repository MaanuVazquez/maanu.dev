import { Calendar, Coffee } from '@phosphor-icons/react'
import { useAsyncValue } from '@remix-run/react'

import type { Post } from '~/models/posts'

import Markdown from '~/components/Markdown/Markdown'
import { formatMonthDayYear } from '~/utils/date'
import { calculateReadTime, isPostEdited } from '~/utils/posts'

export default function PostLayout() {
  const { title, createdAt, updatedAt, body } = useAsyncValue() as Post
  return (
    <div>
      <h1 className='dark:text-primary'>{title}</h1>
      <div className='flex flex-col gap-x-4 md:flex-row'>
        <p className='mb-0 mt-0 flex place-items-center gap-x-4'>
          <Calendar aria-hidden weight='bold' className='text-xl dark:text-primary' />
          Posted on {formatMonthDayYear(createdAt)}
          {isPostEdited(createdAt, updatedAt) && (
            <span className='hidden md:block'>
              and updated on <b>{formatMonthDayYear(updatedAt)}</b>
            </span>
          )}
        </p>
      </div>
      <p className='mb-0 mt-0 flex place-items-center gap-x-4'>
        <Coffee aria-hidden weight='bold' className='text-xl dark:text-primary' />
        {calculateReadTime(body.length)} min read
      </p>
      <hr className='mt-0' />
      <Markdown>{body}</Markdown>
    </div>
  )
}
