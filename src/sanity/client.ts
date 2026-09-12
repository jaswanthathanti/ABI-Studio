import { createClient } from '@sanity/client';
import createImageUrlBuilder from '@sanity/image-url';

export type SanityImageSource = any;

export const projectId = import.meta.env.VITE_SANITY_PROJECT_ID?.trim() || '';
export const dataset = import.meta.env.VITE_SANITY_DATASET?.trim() || 'production';
export const apiVersion = import.meta.env.VITE_SANITY_API_VERSION?.trim() || '2024-03-01';

export const isSanityConfigured = Boolean(
  projectId && projectId !== 'your_project_id_here' && projectId.length > 2
);

export const sanityClient = isSanityConfigured
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: true, // Use fast edge CDN for cached read operations
    })
  : null;

const imageBuilder = isSanityConfigured && sanityClient ? createImageUrlBuilder(sanityClient) : null;

/**
 * Safe image URL builder that supports:
 * 1. Native Sanity uploaded image assets
 * 2. Static local path fallbacks (strings like '/assets/...')
 * 3. Graceful fallback URL if image is missing
 */
export function urlForImage(source: SanityImageSource | string | null | undefined, fallbackUrl = ''): string {
  if (!source) {
    return fallbackUrl;
  }

  // If already a direct URL or local asset path
  if (typeof source === 'string') {
    return source || fallbackUrl;
  }

  // If it is a Sanity image asset reference
  if (imageBuilder && typeof source === 'object' && 'asset' in source && source.asset) {
    try {
      return imageBuilder.image(source).auto('format').fit('max').url();
    } catch {
      return fallbackUrl;
    }
  }

  return fallbackUrl;
}
