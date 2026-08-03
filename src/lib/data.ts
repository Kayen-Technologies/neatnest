export type NavLink = { label: string; href: string };

export const navLinks: NavLink[] = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Spaces We Care For", href: "/spaces" },
];

export type Service = {
  id: string;
  name: string;
  description: string;
  image: string;
};

export const services: Service[] = [
  {
    id: "residential",
    name: "Residential",
    description: "Refined care for private homes and family residence.",
    image: "/images/svc-residential.jpg",
  },
  {
    id: "deep",
    name: "Deep Cleaning",
    description: "Thorough cleaning for hard-to-reach areas and built-up dirt.",
    image: "/images/gallery-5.jpg",
  },
  {
    id: "post-construction",
    name: "Post-Construction",
    description:
      "Complete cleaning after construction and renovation projects.",
    image: "/images/p-pool-work.jpg",
  },
  {
    id: "hotel-office",
    name: "Hotel & Office",
    description:
      "Professional cleaning for offices, hotels, and commercial spaces.",
    image: "/images/p-window.jpg",
  },
];

export type Step = {
  numeral: string;
  eyebrow: string;
  title: string;
  description: string;
  tone: "light" | "cream" | "ink" | "brown";
};

export const steps: Step[] = [
  {
    numeral: "I",
    eyebrow: "Personalised Guidance",
    title: "Consultation",
    description:
      "We meet, walk the space and listen to its details and your preferences.",
    tone: "light",
  },
  {
    numeral: "II",
    eyebrow: "Tailored Planning",
    title: "Scheduling",
    description:
      "A calendar tailored to your rhythm, with a dedicated team assigned.",
    tone: "cream",
  },
  {
    numeral: "III",
    eyebrow: "Meticulous Care",
    title: "Cleaning",
    description:
      "Quiet, methodical care across every surface, fabric and finish.",
    tone: "ink",
  },
  {
    numeral: "IV",
    eyebrow: "Assured Excellence",
    title: "Inspection",
    description:
      "A final walk-through ensures the standard is met before we leave.",
    tone: "brown",
  },
];

export const galleryImages: { src: string; alt: string }[] = [
  { src: "/images/gallery-1.jpg", alt: "Freshly cleaned modern bathroom" },
  { src: "/images/gallery-2.jpg", alt: "Restored residence exterior" },
  { src: "/images/gallery-3.jpg", alt: "Cleaning outdoor stairs" },
  { src: "/images/gallery-4.jpg", alt: "Detailing a ceiling light fixture" },
  { src: "/images/gallery-5.jpg", alt: "Polishing a marble floor" },
  { src: "/images/gallery-6.jpg", alt: "Deep-cleaning a marble living area" },
  { src: "/images/gallery-7.jpg", alt: "Spotless double-vanity bathroom" },
  { src: "/images/gallery-8.jpg", alt: "Post-construction exterior clean" },
];

export type Testimonial = {
  quote: string;
  name: string;
  detail: string;
  avatar?: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "Neat Nest brings a level of calm and consistency we used to associate only with five-star hotels. Our home has never felt more itself.",
    name: "Selasi Mensah",
    detail: "Private Residence, Cantonments",
  },
  {
    quote:
      "Managing a busy office is easier knowing Neat Nest consistently delivers spaces that feel polished, welcoming and impeccably maintained.",
    name: "Ama Boateng",
    detail: "Office Manager, Airport Residential",
  },
  {
    quote:
      "What stands out most is the consistency. Week after week, they create an environment that feels fresher, calmer and beautifully cared for.",
    name: "Kwame Addo",
    detail: "Homeowner, East Legon",
  },
  {
    quote:
      "Every visit feels seamless. The attention to detail has made Neat Nest an indispensable part of our routine.",
    name: "Efua Danso",
    detail: "Private Residence, Labone",
  },
  {
    quote:
      "From the first consultation to the final inspection, each interaction reflects thoughtfulness, precision and a genuine commitment to excellence.",
    name: "Nii Armah",
    detail: "Managing Director, Ridge",
  },
];

export const contact = {
  location: "Accra, Ghana",
  phone: "+233 24 569 4318",
  email: "neatnestcleaningagency@gmail.com",
  socials: ["Facebook", "Instagram", "Whatsapp", "X"],
  footerNav: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Spaces We Care For", href: "/spaces" },
  ],
};

/* ---- About page ---- */

export type AboutValue = {
  numeral: string;
  title: string;
  description: string;
  image: string;
};

export const aboutValues: AboutValue[] = [
  {
    numeral: "01",
    title: "Discretion",
    description:
      "We move through every space with quiet respect present, attentive, yet never intrusive.",
    image: "/images/p-room-clean.jpg",
  },
  {
    numeral: "02",
    title: "Craft",
    description:
      "Every surface, fabric, and finish is cared for with precision and thoughtful attention.",
    image: "/images/p-vacuum.jpg",
  },
  {
    numeral: "03",
    title: "Consistency",
    description:
      "The same refined standard is delivered every visit by the same dependable team.",
    image: "/images/p-pool-clean.jpg",
  },
  {
    numeral: "04",
    title: "Care",
    description:
      "We treat every home and workplace as if it were our own\u2014with pride and respect.",
    image: "/images/gallery-5.jpg",
  },
];

export type Principle = { title: string; description: string; image: string };

export const aboutPrinciples: Principle[] = [
  {
    title: "Trained Professionals",
    description:
      "Each team member is trained in hospitality protocol, fabric care and quiet discretion.",
    image: "/images/p-wardrobe.jpg",
  },
  {
    title: "Eco-Friendly Products",
    description:
      "Plant-based, low-fragrance solutions that respect your home and the environment.",
    image: "/images/p-products.jpg",
  },
  {
    title: "Attention to Detail",
    description:
      "Edges, corners, surfaces beneath surfaces the parts most overlooked, most considered.",
    image: "/images/p-window.jpg",
  },
  {
    title: "Reliability",
    description:
      "Consistent teams, on-time arrivals and a single point of contact for every engagement.",
    image: "/images/p-pool-clean.jpg",
  },
  {
    title: "Flexible Packages",
    description:
      "Weekly, fortnightly, monthly or one-off calibrated to the rhythm of your space.",
    image: "/images/svc-hospitality.jpg",
  },
  {
    title: "Quiet Discretion",
    description:
      "Background-checked staff who move through your home like guests, not vendors.",
    image: "/images/p-vacuum.jpg",
  },
];

/* ---- Services page ---- */

export type ServiceDetail = {
  id: string;
  name: string;
  paragraphs: [string, string];
  feature: string;
  gallery: [string, string, string];
};

export const serviceDetails: ServiceDetail[] = [
  {
    id: "residential",
    name: "Residential Cleaning",
    paragraphs: [
      "Our residential cleaning service is designed to keep your home clean, fresh, and comfortable. We clean bedrooms, living areas, kitchens, bathrooms, and other shared spaces, paying close attention to surfaces, floors, furniture, and everyday touchpoints.",
      "Whether you need a one-time clean or regular visits, we tailor our service to your lifestyle and schedule. Our team arrives fully equipped, follows a detailed cleaning process, and leaves every room tidy, refreshed, and ready for you to enjoy with complete peace of mind.",
    ],
    feature: "/images/p-house-clean.jpg",
    gallery: ["/images/gallery-1.jpg", "/images/p-room-clean.jpg", "/images/gallery-3.jpg"],
  },
  {
    id: "deep",
    name: "Deep Cleaning",
    paragraphs: [
      "Our deep cleaning service targets areas that often go unnoticed during routine cleaning. We thoroughly clean behind furniture, inside hard-to-reach corners, skirting boards, high-touch surfaces, kitchens, bathrooms, and other areas where dirt and dust build up over time.",
      "This service is ideal for seasonal cleaning, preparing a home for special occasions, or restoring spaces that need extra attention. We take the time to clean every detail, leaving your home or workplace noticeably fresher, healthier, and more inviting.",
    ],
    feature: "/images/p-powerwash.jpg",
    gallery: ["/images/gallery-5.jpg", "/images/p-debris.jpg", "/images/p-fan.jpg"],
  },
  {
    id: "post-construction",
    name: "Post-Construction Cleaning",
    paragraphs: [
      "After construction or renovation, we remove dust, debris, paint splashes, cement residue, stickers, and leftover materials from every room. We clean floors, windows, walls, fixtures, and surfaces to prepare the property for immediate use.",
      "Our team carefully works through every space to remove the fine dust and construction residue that standard cleaning often misses. The result is a clean, polished property that is ready for occupancy, handover, or final presentation.",
    ],
    feature: "/images/p-pool-work.jpg",
    gallery: ["/images/p-ac.jpg", "/images/p-window.jpg", "/images/cta-thumb.jpg"],
  },
  {
    id: "hotel-office",
    name: "Hotel & Office Cleaning",
    paragraphs: [
      "We maintain clean, organised, and welcoming environments for offices, hotels, and commercial spaces. Our service includes cleaning workstations, reception areas, meeting rooms, guest rooms, washrooms, kitchens, floors, windows, and other shared spaces.",
      "Whether you require daily, weekly, or scheduled cleaning, we work around your business hours to minimise disruption. Our focus is on creating a consistently clean environment that leaves a positive impression on guests, clients, and employees alike.",
    ],
    feature: "/images/p-vacuum.jpg",
    gallery: ["/images/p-marble.jpg", "/images/p-cabinet.jpg", "/images/gallery-6.jpg"],
  },
];

/* ---- Spaces page (before / after) ---- */

export type BeforeAfter = { label: string; before: string; after: string };

export const beforeAfterPairs: BeforeAfter[] = [
  { label: "Bathroom", before: "/images/gallery-7.jpg", after: "/images/gallery-1.jpg" },
  { label: "Garden", before: "/images/p-plant-work.jpg", after: "/images/p-plant.jpg" },
  { label: "Interior", before: "/images/svc-postconstruction.jpg", after: "/images/p-room-clean.jpg" },
  { label: "Pool", before: "/images/p-pool-dirty.jpg", after: "/images/p-pool-clean.jpg" },
  { label: "Exterior", before: "/images/p-house-dusty.jpg", after: "/images/p-house-clean.jpg" },
  { label: "Rooftop", before: "/images/p-powerwash.jpg", after: "/images/p-highrise.jpg" },
];

/* ---- Schedule form options ---- */

export const scheduleOptions = {
  propertyTypes: ["Apartment", "Detached House", "Office", "Hotel", "Commercial Space", "Other"],
  services: [
    "Residential Cleaning",
    "Deep Cleaning",
    "Post-Construction Cleaning",
    "Hotel & Office Cleaning",
  ],
  sizes: ["Studio / 1 Bedroom", "2\u20133 Bedrooms", "4\u20135 Bedrooms", "6+ Bedrooms", "Commercial"],
};
