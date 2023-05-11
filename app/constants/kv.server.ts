export enum KVKeys {
  BOOKMARK = 'bookmark',
  POST = 'post',
  SECTION = 'section'
}
export const KV_ALL_SUFFIX = 'all'

export function getIdKey(key: KVKeys, id: string) {
  return `${key}:${id}`
}

export function getAllKey(key: KVKeys) {
  return getIdKey(key, KV_ALL_SUFFIX)
}
