import type { CollectionConfig } from 'payload'

export const Services: CollectionConfig = {
  slug: 'services',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'slug', 'order'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'URL-safe identifier (e.g., "residential", "deep", "post-construction")',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      admin: {
        description: 'Short description shown on service cards',
      },
    },
    {
      name: 'paragraphs',
      type: 'array',
      label: 'Detail Paragraphs',
      admin: {
        description: 'Longer paragraphs shown on the service detail page',
      },
      fields: [
        {
          name: 'text',
          type: 'textarea',
          required: true,
        },
      ],
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        description: 'Card image shown on the homepage services section',
      },
    },
    {
      name: 'feature',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        description: 'Main hero image on the service detail page',
      },
    },
    {
      name: 'gallery',
      type: 'array',
      label: 'Gallery Images',
      maxRows: 6,
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
    {
      name: 'order',
      type: 'number',
      required: true,
      defaultValue: 0,
      admin: {
        description: 'Display order (lower numbers appear first)',
      },
    },
  ],
}
