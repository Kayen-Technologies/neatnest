import type { CollectionConfig } from 'payload'

export const Bookings: CollectionConfig = {
  slug: 'bookings',
  labels: {
    singular: 'Booking / Lead',
    plural: 'Bookings / Leads',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'property', 'service', 'date', 'status'],
  },
  access: {
    create: () => true, // Allow public form submissions
    read: ({ req: { user } }) => Boolean(user), // Only admins can read
    update: ({ req: { user } }) => Boolean(user), // Only admins can update
    delete: ({ req: { user } }) => Boolean(user), // Only admins can delete
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Full Name',
    },
    {
      name: 'email',
      type: 'email',
      required: true,
      label: 'Email Address',
    },
    {
      name: 'phone',
      type: 'text',
      label: 'Phone Number',
      admin: {
        description: 'Includes country code',
      },
    },
    {
      name: 'property',
      type: 'text',
      required: true,
      label: 'Property Information',
    },
    {
      name: 'service',
      type: 'text',
      required: true,
      label: 'Service Needed',
    },
    {
      name: 'size',
      type: 'text',
      required: true,
      label: 'Property Size',
    },
    {
      name: 'date',
      type: 'date',
      required: true,
      label: 'Preferred Date',
      admin: {
        date: {
          pickerAppearance: 'dayOnly',
          displayFormat: 'yyyy-MM-dd',
        },
      },
    },
    {
      name: 'notes',
      type: 'textarea',
      label: 'Special Requests / Notes',
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'New',
      options: [
        { label: 'New', value: 'New' },
        { label: 'Contacted', value: 'Contacted' },
        { label: 'Resolved', value: 'Resolved' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
