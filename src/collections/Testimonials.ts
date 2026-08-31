import type { CollectionConfig } from 'payload'

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'detail', 'order'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'quote',
      type: 'textarea',
      required: true,
    },
    {
      name: 'name',
      type: 'text',
      required: true,
      admin: {
        description: 'Client name',
      },
    },
    {
      name: 'detail',
      type: 'text',
      required: true,
      admin: {
        description: 'Client title or location (e.g., "Private Residence, Cantonments")',
      },
    },
    {
      name: 'avatar',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Optional profile photo',
      },
    },
    {
      name: 'order',
      type: 'number',
      required: true,
      defaultValue: 0,
    },
  ],
}
