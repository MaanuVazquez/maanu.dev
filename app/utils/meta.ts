import type { V2_MetaDescriptor } from '@remix-run/node'

import { APP_CONSTANTS } from '~/constants/app'

export function generateMeta(
  title: string = APP_CONSTANTS.title,
  description: string = APP_CONSTANTS.description,
  type: 'website' | 'article' = 'website'
) {
  const meta: V2_MetaDescriptor[] = [
    {
      title: title
    },
    {
      name: 'title',
      content: title
    },
    {
      property: 'og:title',
      content: title
    },
    {
      name: 'description',
      content: description
    },
    {
      property: 'og:description',
      content: description
    },
    {
      property: 'og:type',
      content: type
    }
  ]

  return meta
}

type ArticleMetaArgs = {
  title: string
  description?: string
  createdAt: string
  updatedAt: string
  author?: string
}

export function generateArticleMeta({
  title,
  description,
  createdAt,
  updatedAt,
  author = APP_CONSTANTS.author
}: ArticleMetaArgs) {
  const meta: V2_MetaDescriptor[] = [
    ...generateMeta(title, description, 'article'),
    {
      propety: 'article:published_time',
      content: createdAt
    },
    {
      property: 'article:modified_time',
      content: updatedAt
    },
    {
      property: 'article:author',
      content: author
    }
  ]

  return meta
}
