import type { CommonFields } from './common'
import type { Record } from 'airtable'

import { TABLE_SECTIONS } from '~/constants/airtable.server'
import { KVKeys, getAllKey, getIdKey } from '~/constants/kv.server'
import { airtableClient } from '~/services/airtable.server'
import { getKV, saveKV } from '~/services/kv.server'

import { PublishStatus } from './common'

export type Section = {
  name: string
  body: string
  status: PublishStatus
  slug: string
} & CommonFields

function normalizeSection({ id, fields }: Record<Section>): Section | null {
  if (fields.status === PublishStatus.WIP || !fields.name || !fields.body) {
    return null
  }

  return {
    id,
    name: fields.name,
    body: fields.body,
    slug: fields.slug,
    status: fields.status,
    createdAt: fields.createdAt,
    updatedAt: fields.updatedAt
  }
}

export async function getSections() {
  const cachedSections = await getKV<Section[]>(getAllKey(KVKeys.SECTION))

  if (cachedSections && cachedSections.length > 0) {
    return cachedSections
  }

  const sections = await airtableClient<Section>(TABLE_SECTIONS).select().all()
  const returnSections: Section[] = []

  sections.forEach(post => {
    const normalizedSection = normalizeSection(post)

    if (normalizedSection) {
      returnSections.push(normalizedSection)
      saveKV(getIdKey(KVKeys.SECTION, normalizedSection.slug), normalizedSection)
    }
  })

  saveKV(getAllKey(KVKeys.SECTION), returnSections)

  return returnSections
}

export async function getSection(slug: string) {
  const cachedSection = await getKV<Section>(getIdKey(KVKeys.SECTION, slug))

  if (cachedSection) {
    return cachedSection
  }

  const sections = await getSections()
  const section = sections.find(post => post.slug === slug)

  if (!section) {
    return null
  }

  saveKV(getIdKey(KVKeys.SECTION, slug), section)

  return section
}