import differenceInDays from 'date-fns/differenceInDays'

import type { Bookmark } from '~/models/bookmarks'
import type { Post } from '~/models/posts'

const FIFTEEN_DAYS = 15

type PostMeta = Omit<Post, 'body' | 'updatedAt' | 'description' | 'status'>

export function sortPosts(posts: PostMeta[], bookmarks: Bookmark[]) {
  const allPosts = [...posts, ...bookmarks]

  return allPosts.sort((postA, postB) => {
    return new Date(postB.createdAt).getTime() - new Date(postA.createdAt).getTime()
  })
}

export function isPost(post: PostMeta | Bookmark): post is PostMeta {
  return Boolean((post as Post).slug)
}

export function calculateReadTime(postLength: number, wpm: number = 300) {
  return Math.ceil(postLength / wpm)
}

export function isPostEdited(createdAt: string, updatedAt: string) {
  return differenceInDays(new Date(createdAt), new Date(updatedAt)) > FIFTEEN_DAYS
}
