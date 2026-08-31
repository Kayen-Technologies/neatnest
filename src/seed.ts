/**
 * Seed script for NeatNest Payload CMS
 *
 * Uploads images from public/images/ to the Media collection (stored in MinIO)
 * and creates Services, Testimonials, and BeforeAfterPairs documents.
 *
 * Usage: npx payload run src/seed.ts
 *   or:  node --loader ts-node/esm src/seed.ts
 */

import { getPayload } from 'payload'
import config from './payload.config'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const PUBLIC_DIR = path.resolve(__dirname, '../public')

async function seed() {
  const payload = await getPayload({ config })

  console.log('🌱 Starting NeatNest seed...\n')

  // ── 1. Create admin user ──────────────────────────────────────
  console.log('👤 Creating admin user...')
  try {
    await payload.create({
      collection: 'users',
      data: {
        email: 'admin@neatnest.com',
        password: 'password123',
        name: 'Admin',
      },
    })
    console.log('   ✅ Admin user created (admin@neatnest.com / password123)')
  } catch (e: any) {
    if (e?.message?.includes('unique') || e?.message?.includes('duplicate')) {
      console.log('   ⏩ Admin user already exists, skipping')
    } else {
      console.error('   ❌ Error creating admin:', e?.message)
    }
  }

  // ── 2. Upload images ──────────────────────────────────────────
  console.log('\n📸 Uploading images...')

  // Collect all unique image paths from data
  const imageFiles = new Set<string>([
    // Service card images
    '/images/svc-residential.jpg',
    '/images/gallery-5.jpg',
    '/images/p-pool-work.jpg',
    '/images/hotel3.jpg',
    // Service detail features
    '/images/gallery-2.jpg',
    '/images/deepmain.jpg',
    '/images/hotel1.jpg',
    // Service detail galleries
    '/images/gallery-3.jpg',
    '/images/p-room-clean.jpg',
    '/images/gallery-7.jpg',
    '/images/deep1.jpg',
    '/images/p-fan.jpg',
    '/images/p-ac.jpg',
    '/images/p-window.jpg',
    '/images/cta-thumb.jpg',
    '/images/p-marble.jpg',
    '/images/hotel4.jpg',
    // Testimonial avatars
    '/images/person.png',
    // Before/after pairs
    '/images/gallery-1.jpg',
    '/images/p-plant-work.jpg',
    '/images/p-plant.jpg',
    '/images/svc-postconstruction.jpg',
    '/images/p-pool-dirty.jpg',
    '/images/p-pool-clean.jpg',
    '/images/p-house-dusty.jpg',
    '/images/p-highrise.jpg',
  ])

  const mediaMap: Record<string, number> = {} // path -> media doc ID

  for (const imgPath of imageFiles) {
    const fullPath = path.join(PUBLIC_DIR, imgPath)

    if (!fs.existsSync(fullPath)) {
      console.log(`   ⚠️  File not found: ${imgPath}, skipping`)
      continue
    }

    const basename = path.basename(imgPath, path.extname(imgPath))
    const alt = basename
      .replace(/[-_]/g, ' ')
      .replace(/\b\w/g, (c) => c.toUpperCase())

    try {
      const fileBuffer = fs.readFileSync(fullPath)
      const ext = path.extname(imgPath).slice(1)
      const mimeMap: Record<string, string> = {
        jpg: 'image/jpeg',
        jpeg: 'image/jpeg',
        png: 'image/png',
        webp: 'image/webp',
      }

      const doc = await payload.create({
        collection: 'media',
        data: {
          alt,
        },
        file: {
          data: fileBuffer,
          name: path.basename(imgPath),
          mimetype: mimeMap[ext] || 'image/jpeg',
          size: fileBuffer.length,
        },
      })

      mediaMap[imgPath] = doc.id as number
      console.log(`   ✅ ${imgPath} → Media #${doc.id}`)
    } catch (e: any) {
      console.error(`   ❌ Failed to upload ${imgPath}:`, e?.message)
    }
  }

  // ── 3. Create services ────────────────────────────────────────
  console.log('\n🧹 Creating services...')

  const servicesData = [
    {
      name: 'Residential Cleaning',
      slug: 'residential',
      description: 'Refined care for private homes and family residence.',
      paragraphs: [
        'Our residential cleaning service is designed to keep your home clean, fresh, and comfortable. We clean bedrooms, living areas, kitchens, bathrooms, and other shared spaces, paying close attention to surfaces, floors, furniture, and everyday touchpoints.',
        'Whether you need a one-time clean or regular visits, we tailor our service to your lifestyle and schedule. Our team arrives fully equipped, follows a detailed cleaning process, and leaves every room tidy, refreshed, and ready for you to enjoy with complete peace of mind.',
      ],
      image: '/images/svc-residential.jpg',
      feature: '/images/gallery-2.jpg',
      gallery: ['/images/gallery-3.jpg', '/images/p-room-clean.jpg', '/images/gallery-7.jpg'],
      order: 1,
    },
    {
      name: 'Deep Cleaning',
      slug: 'deep',
      description: 'Thorough cleaning for hard-to-reach areas and built-up dirt.',
      paragraphs: [
        'Our deep cleaning service targets areas that often go unnoticed during routine cleaning. We thoroughly clean behind furniture, inside hard-to-reach corners, skirting boards, high-touch surfaces, kitchens, bathrooms, and other areas where dirt and dust build up over time.',
        'This service is ideal for seasonal cleaning, preparing a home for special occasions, or restoring spaces that need extra attention. We take the time to clean every detail, leaving your home or workplace noticeably fresher, healthier, and more inviting.',
      ],
      image: '/images/gallery-5.jpg',
      feature: '/images/deepmain.jpg',
      gallery: ['/images/gallery-5.jpg', '/images/deep1.jpg', '/images/p-fan.jpg'],
      order: 2,
    },
    {
      name: 'Post-Construction Cleaning',
      slug: 'post-construction',
      description: 'Complete cleaning after construction and renovation projects.',
      paragraphs: [
        'After construction or renovation, we remove dust, debris, paint splashes, cement residue, stickers, and leftover materials from every room. We clean floors, windows, walls, fixtures, and surfaces to prepare the property for immediate use.',
        'Our team carefully works through every space to remove the fine dust and construction residue that standard cleaning often misses. The result is a clean, polished property that is ready for occupancy, handover, or final presentation.',
      ],
      image: '/images/p-pool-work.jpg',
      feature: '/images/p-pool-work.jpg',
      gallery: ['/images/p-ac.jpg', '/images/p-window.jpg', '/images/cta-thumb.jpg'],
      order: 3,
    },
    {
      name: 'Hotel & Office Cleaning',
      slug: 'hotel-office',
      description: 'Professional cleaning for offices, hotels, and commercial spaces.',
      paragraphs: [
        'We maintain clean, organised, and welcoming environments for offices, hotels, and commercial spaces. Our service includes cleaning workstations, reception areas, meeting rooms, guest rooms, washrooms, kitchens, floors, windows, and other shared spaces.',
        'Whether you require daily, weekly, or scheduled cleaning, we work around your business hours to minimise disruption. Our focus is on creating a consistently clean environment that leaves a positive impression on guests, clients, and employees alike.',
      ],
      image: '/images/hotel3.jpg',
      feature: '/images/hotel1.jpg',
      gallery: ['/images/p-marble.jpg', '/images/hotel3.jpg', '/images/hotel4.jpg'],
      order: 4,
    },
  ]

  for (const svc of servicesData) {
    try {
      await payload.create({
        collection: 'services',
        data: {
          name: svc.name,
          slug: svc.slug,
          description: svc.description,
          paragraphs: svc.paragraphs.map((text) => ({ text })),
          image: mediaMap[svc.image],
          feature: mediaMap[svc.feature],
          gallery: svc.gallery.map((img) => ({ image: mediaMap[img] })),
          order: svc.order,
        },
      })
      console.log(`   ✅ ${svc.name}`)
    } catch (e: any) {
      console.error(`   ❌ Failed to create ${svc.name}:`, e?.message)
    }
  }

  // ── 4. Create testimonials ────────────────────────────────────
  console.log('\n💬 Creating testimonials...')

  const testimonialsData = [
    {
      quote: 'Neat Nest brings a level of calm and consistency we used to associate only with five-star hotels. Our home has never felt more itself.',
      name: 'Selasi Mensah',
      detail: 'Private Residence, Cantonments',
      avatar: '/images/person.png',
      order: 1,
    },
    {
      quote: 'Managing a busy office is easier knowing Neat Nest consistently delivers spaces that feel polished, welcoming and impeccably maintained.',
      name: 'Ama Boateng',
      detail: 'Office Manager, Airport Residential',
      avatar: null,
      order: 2,
    },
    {
      quote: 'What stands out most is the consistency. Week after week, they create an environment that feels fresher, calmer and beautifully cared for.',
      name: 'Kwame Addo',
      detail: 'Homeowner, East Legon',
      avatar: '/images/person.png',
      order: 3,
    },
    {
      quote: 'Every visit feels seamless. The attention to detail has made Neat Nest an indispensable part of our routine.',
      name: 'Efua Danso',
      detail: 'Private Residence, Labone',
      avatar: null,
      order: 4,
    },
    {
      quote: 'From the first consultation to the final inspection, each interaction reflects thoughtfulness, precision and a genuine commitment to excellence.',
      name: 'Nii Armah',
      detail: 'Managing Director, Ridge',
      avatar: '/images/person.png',
      order: 5,
    },
  ]

  for (const t of testimonialsData) {
    try {
      await payload.create({
        collection: 'testimonials',
        data: {
          quote: t.quote,
          name: t.name,
          detail: t.detail,
          avatar: t.avatar ? mediaMap[t.avatar] : undefined,
          order: t.order,
        },
      })
      console.log(`   ✅ ${t.name}`)
    } catch (e: any) {
      console.error(`   ❌ Failed to create testimonial for ${t.name}:`, e?.message)
    }
  }

  // ── 5. Create before/after pairs ──────────────────────────────
  console.log('\n🔄 Creating before/after pairs...')

  const pairsData = [
    { label: 'Bathroom', before: '/images/gallery-1.jpg', after: '/images/gallery-7.jpg', order: 1 },
    { label: 'Garden', before: '/images/p-plant-work.jpg', after: '/images/p-plant.jpg', order: 2 },
    { label: 'Interior', before: '/images/svc-postconstruction.jpg', after: '/images/p-room-clean.jpg', order: 3 },
    { label: 'Pool', before: '/images/p-pool-dirty.jpg', after: '/images/p-pool-clean.jpg', order: 4 },
    { label: 'Exterior', before: '/images/p-house-dusty.jpg', after: '/images/gallery-2.jpg', order: 5 },
    { label: 'Rooftop', before: '/images/cta-thumb.jpg', after: '/images/p-highrise.jpg', order: 6 },
  ]

  for (const pair of pairsData) {
    try {
      await payload.create({
        collection: 'before-after-pairs',
        data: {
          label: pair.label,
          before: mediaMap[pair.before],
          after: mediaMap[pair.after],
          order: pair.order,
        },
      })
      console.log(`   ✅ ${pair.label}`)
    } catch (e: any) {
      console.error(`   ❌ Failed to create pair ${pair.label}:`, e?.message)
    }
  }

  console.log('\n🎉 Seed complete!\n')
  process.exit(0)
}

seed().catch((err) => {
  console.error('Seed failed:', err)
  process.exit(1)
})
