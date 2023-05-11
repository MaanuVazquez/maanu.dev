import type { CommonFields } from './common'
import type { Record } from 'airtable'

import { TABLE_BOOKMARKS } from '~/constants/airtable.server'
import { KVKeys, getAllKey } from '~/constants/kv.server'
import { airtableClient } from '~/services/airtable.server'
import { getKV, saveKV } from '~/services/kv.server'

export type Bookmark = {
  title: string
  url: string
} & CommonFields

function normalizeBookmark(bookmark: Record<Bookmark>): Bookmark | null {
  if (!bookmark.fields.title || !bookmark.fields.url) {
    return null
  }

  return {
    id: bookmark.id,
    title: bookmark.fields.title,
    url: bookmark.fields.url,
    createdAt: bookmark.fields.createdAt,
    updatedAt: bookmark.fields.updatedAt
  }
}

async function fetchBookmarks() {
  const bookmarks = await airtableClient<Bookmark>(TABLE_BOOKMARKS).select().all()

  if (!bookmarks.length) {
    return []
  }

  const normalizedBookmarks = bookmarks.map(normalizeBookmark).filter(Boolean) as Bookmark[]

  saveKV(getAllKey(KVKeys.BOOKMARK), normalizedBookmarks)

  return normalizedBookmarks
}

export async function getBookmarks() {
  const cachedBookmarks = await getKV<Bookmark[]>(getAllKey(KVKeys.BOOKMARK))

  if (cachedBookmarks && cachedBookmarks.length > 0) {
    return cachedBookmarks
  }

  return fetchBookmarks()
}
