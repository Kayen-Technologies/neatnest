import { getPayload } from 'payload'
import configPromise from '@payload-config'
import type { Service, ServiceDetail, Testimonial, BeforeAfter } from './data'

// Re-export types for backward compatibility
export type { Service, ServiceDetail, Testimonial, BeforeAfter }

/**
 * Get the Payload instance (cached per request by Payload internally)
 */
export async function getPayloadClient() {
  return getPayload({ config: configPromise })
}

/**
 * Helper to get the URL of a media document.
 * Handles both populated Media objects and plain IDs.
 */
function getMediaUrl(media: any): string {
  if (!media) return ''
  if (typeof media === 'string') return '' // not populated, just an ID
  const url = media.url || ''
  return url.split('?')[0]
}

/**
 * Fetch services formatted for the homepage cards (matches `Service` type)
 */
export async function getServices(): Promise<Service[]> {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'services',
    sort: 'order',
    limit: 100,
    depth: 1, // populate media relationships
  })

  return result.docs.map((doc) => ({
    id: doc.slug as string,
    name: doc.name as string,
    description: doc.description as string,
    image: getMediaUrl(doc.image),
  }))
}

/**
 * Fetch service details for the /services page (matches `ServiceDetail` type)
 */
export async function getServiceDetails(): Promise<ServiceDetail[]> {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'services',
    sort: 'order',
    limit: 100,
    depth: 1,
  })

  return result.docs.map((doc) => ({
    id: doc.slug as string,
    name: doc.name as string,
    paragraphs: (doc.paragraphs as any[] || []).map((p: any) => p.text) as [string, string],
    feature: getMediaUrl(doc.feature),
    gallery: (doc.gallery as any[] || []).map((g: any) => getMediaUrl(g.image)) as [string, string, string],
  }))
}

/**
 * Fetch testimonials (matches `Testimonial` type)
 */
export async function getTestimonials(): Promise<Testimonial[]> {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'testimonials',
    sort: 'order',
    limit: 100,
    depth: 1,
  })

  return result.docs.map((doc) => ({
    quote: doc.quote as string,
    name: doc.name as string,
    detail: doc.detail as string,
    avatar: doc.avatar ? getMediaUrl(doc.avatar) : undefined,
  }))
}

/**
 * Fetch before/after pairs for the /spaces page (matches `BeforeAfter` type)
 */
export async function getBeforeAfterPairs(): Promise<BeforeAfter[]> {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'before-after-pairs',
    sort: 'order',
    limit: 100,
    depth: 1,
  })

  return result.docs.map((doc) => ({
    label: doc.label as string,
    before: getMediaUrl(doc.before),
    after: getMediaUrl(doc.after),
  }))
}
