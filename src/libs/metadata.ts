import { DEFAULT_META_DESCRIPTION } from '@/utils/constants'
import type { Metadata } from 'next'

export const getMetadata = (
  title: string,
  description: string = DEFAULT_META_DESCRIPTION
): Metadata => {
  return {
    title,
    openGraph: {
      title,
      description,
    },
    twitter: {
      title,
      description,
    },
    description,
  }
}
