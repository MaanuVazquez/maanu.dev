import type { KVKeys } from '~/constants/kv.server'

import { getAllKey } from '~/constants/kv.server'
import { getKV } from '~/services/kv.server'

export type CommonFields = {
  id: string
  createdAt: string
  updatedAt: string
}

export enum PublishStatus {
  WIP = 'wip',
  PUBLISHED = 'published'
}

export async function fetchAndRevalidate<T>(key: KVKeys, fetcher: () => Promise<T[]>) {
  try {
    const cachedData = await getKV<T[]>(getAllKey(key))

    if (cachedData && cachedData.length > 0) {
      fetcher()
      return cachedData
    }

    const result = await fetcher()

    return result
  } catch (error) {
    console.error(`[${key}]`, error)
    return []
  }
}
