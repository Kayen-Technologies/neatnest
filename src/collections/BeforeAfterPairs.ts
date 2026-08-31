import type { CollectionConfig } from 'payload'

export const BeforeAfterPairs: CollectionConfig = {
  slug: 'before-after-pairs',
  admin: {
    useAsTitle: 'label',
    defaultColumns: ['label', 'order'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'label',
      type: 'text',
      required: true,
      admin: {
        description: 'Space type (e.g., "Bathroom", "Garden", "Interior")',
      },
    },
    {
      name: 'before',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        description: 'Before image',
      },
    },
    {
      name: 'after',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        description: 'After image',
      },
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
