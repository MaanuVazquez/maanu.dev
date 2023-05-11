import differenceInDays from 'date-fns/differenceInDays'

import type { Bookmark } from '~/models/bookmarks'
import type { Post } from '~/models/posts'

const FIFTEEN_DAYS = 15

export function sortPosts(posts: Post[], bookmarks: Bookmark[]) {
  const allPosts = [...posts, ...bookmarks]

  return allPosts.sort((postA, postB) => {
    return new Date(postB.createdAt).getTime() - new Date(postA.createdAt).getTime()
  })
}

export function isPost(post: Post | Bookmark): post is Post {
  return Boolean((post as Post).body)
}

export function calculateReadTime(postLength: number, wpm: number = 300) {
  return Math.ceil(postLength / wpm)
}

export function isPostEdited(createdAt: string, updatedAt: string) {
  return differenceInDays(new Date(createdAt), new Date(updatedAt)) > FIFTEEN_DAYS
}
