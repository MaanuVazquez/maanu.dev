import type { CommonFields } from './common'
import type { Record } from 'airtable'

import { TABLE_POSTS } from '~/constants/airtable.server'
import { KVKeys, getAllKey, getIdKey } from '~/constants/kv.server'
import { airtableClient } from '~/services/airtable.server'
import { getKV, saveKV } from '~/services/kv.server'

import { PublishStatus } from './common'

export type AirtablePost = {
  title?: string
  body: string
  status: PublishStatus
  slug?: string
  createdAt: string
  updatedAt: string
  description: string
}

export type Post = {
  title: string
  body: string
  status: PublishStatus.PUBLISHED
  slug: string
  description: string
} & CommonFields

function normalizeAirtablePost(post: Record<AirtablePost>): Post | null {
  if (post.fields.status === PublishStatus.WIP || !post.fields.slug || !post.fields.title) {
    return null
  }

  return {
    id: post.id,
    title: post.fields.title,
    description: post.fields.description,
    slug: post.fields.slug,
    body: post.fields.body,
    status: post.fields.status,
    createdAt: post.fields.createdAt,
    updatedAt: post.fields.updatedAt
  }
}

async function fetchPosts() {
  const posts = await airtableClient<AirtablePost>(TABLE_POSTS).select().all()
  const returnPosts: Post[] = []

  posts.forEach(post => {
    const normalizedPost = normalizeAirtablePost(post)

    if (normalizedPost) {
      returnPosts.push(normalizedPost)
      saveKV(getIdKey(KVKeys.POST, normalizedPost.slug), normalizedPost)
    }
  })

  saveKV(getAllKey(KVKeys.POST), returnPosts)

  return returnPosts
}

export async function getPosts() {
  const cachedPosts = await getKV<Post[]>(getAllKey(KVKeys.POST))

  if (cachedPosts && cachedPosts.length > 0) {
    // Even if we have a cache hit, we update the data
    fetchPosts()
    return cachedPosts
  }

  return fetchPosts()
}

export async function getPost(slug: string) {
  const cachedPost = await getKV<Post>(getIdKey(KVKeys.POST, slug))

  if (cachedPost) {
    return cachedPost
  }

  const posts = await getPosts()
  const post = posts?.find(post => post.slug === slug)

  if (!post) {
    return null
  }

  saveKV(getIdKey(KVKeys.POST, slug), post)

  return post
}
