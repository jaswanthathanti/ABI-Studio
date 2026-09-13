// Sanity document & query types
import type { StatItem } from '../data/statsData';
import type { ServiceItem } from '../data/servicesData';
import type { GalleryItem } from '../data/galleryData';
import type { GalleryPageItem } from '../data/galleryPageData';
import type { TestimonialItem } from '../data/testimonialsData';
import type { FAQItem } from '../data/faqData';

export interface SanityImageRef {
  _type: 'image';
  asset?: {
    _ref: string;
    _type: 'reference';
  };
  alt?: string;
}

export interface SanitySiteSettings {
  _id?: string;
  studioName?: string;
  tagline?: string;
  phone?: string;
  whatsapp?: string;
  email?: string;
  address?: string;
  instagramUrl?: string;
  youtubeUrl?: string;
  facebookUrl?: string;
  linkedinUrl?: string;
}

export interface SanityHeroContent {
  _id?: string;
  eyebrow?: string;
  titlePrefix?: string;
  titleHighlight?: string;
  subtitle?: string;
  viewWorkLabel?: string;
  contactLabel?: string;
  showreelLabel?: string;
  showreelVideoUrl?: string;
  backgroundImage?: SanityImageRef;
}

export interface SanityAboutContent {
  _id?: string;
  founderName?: string;
  founderTitle?: string;
  yearsExperience?: string;
  weddingsCount?: string;
  founderBio?: string;
  founderPhoto?: SanityImageRef;
  experienceCards?: Array<{
    title: string;
    highlight: string;
    desc: string;
    icon?: 'Award' | 'Heart' | 'Tv' | 'Camera';
  }>;
  skillPills?: string[];
}

export interface SanityFinalCtaContent {
  _id?: string;
  eyebrow?: string;
  headline?: string;
  headlineHighlight?: string;
  description?: string;
  primaryButtonLabel?: string;
  phone?: string;
  bulletPoints?: string[];
}

export interface DynamicSiteContent {
  siteSettings: SanitySiteSettings;
  hero: SanityHeroContent;
  stats: StatItem[];
  services: ServiceItem[];
  featuredWorks: GalleryItem[];
  galleryPageItems: GalleryPageItem[];
  about: SanityAboutContent;
  testimonials: TestimonialItem[];
  faqs: FAQItem[];
  finalCta: SanityFinalCtaContent;
  isFromSanity: boolean;
}
