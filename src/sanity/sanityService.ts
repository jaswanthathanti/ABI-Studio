import { sanityClient, isSanityConfigured, urlForImage } from './client';
import type {
  DynamicSiteContent,
  SanitySiteSettings,
  SanityHeroContent,
  SanityAboutContent,
  SanityFinalCtaContent,
} from './types';
import { statsData } from '../data/statsData';
import { servicesData } from '../data/servicesData';
import type { ServiceItem } from '../data/servicesData';
import { getAssetUrl } from '../utils/assetHelper';
import { galleryData } from '../data/galleryData';
import { galleryPageData } from '../data/galleryPageData';
import { testimonialsData } from '../data/testimonialsData';
import { faqData } from '../data/faqData';

// Permanent static failsafe baseline from repository
export const staticFailsafeContent: DynamicSiteContent = {
  siteSettings: {
    studioName: "LED's & ABI Studio",
    tagline: 'Wedding Photography | Cinematic Films | LED Screens | Photo Albums',
    phone: '+91 94404 27791',
    whatsapp: '+91 94404 27791',
    email: 'contact@abistudio.com',
    address: 'ABI Studio, Creative District',
    instagramUrl: 'https://instagram.com',
    youtubeUrl: 'https://youtube.com',
    facebookUrl: 'https://facebook.com',
    linkedinUrl: 'https://linkedin.com',
  },
  hero: {
    eyebrow: '- CAPTURING YOUR PRECIOUS MOMENTS -',
    titlePrefix: "LED's & ",
    titleHighlight: 'ABI Studio',
    subtitle: 'Wedding Photography | Cinematic Films | LED Screens | Photo Albums',
    viewWorkLabel: 'View Our Work',
    contactLabel: 'Contact Us',
    showreelLabel: 'Watch Showreel',
  },
  stats: statsData,
  services: servicesData,
  featuredWorks: galleryData,
  galleryPageItems: galleryPageData,
  about: {
    founderName: 'A. Satish Chand',
    founderTitle: 'Master Photographer & Founder',
    yearsExperience: '30+ Years',
    weddingsCount: '500+ Weddings',
    founderBio:
      'For more than three decades, ABI Studio has blended artful eye, technical precision, and heartfelt dedication. From candid laughs to regal stage rituals, we preserve every celebration as a timeless heirloom.',
    experienceCards: [
      {
        icon: 'Award',
        highlight: '30+ Years',
        title: 'Craft & Dedication',
        desc: 'Mastering natural light, authentic candid emotions, and cinematic wedding aesthetics across three decades.',
      },
      {
        icon: 'Heart',
        highlight: '500+ Weddings',
        title: 'Love Stories Told',
        desc: 'Trusted by families across destinations and sacred traditions to preserve their memories.',
      },
      {
        icon: 'Tv',
        highlight: 'LED & Tech Setup',
        title: 'Visual Innovation',
        desc: 'Pioneering integration of flicker-free high-definition LED stage walls with live coverage.',
      },
      {
        icon: 'Camera',
        highlight: 'Full-Spectrum',
        title: 'End-to-End Excellence',
        desc: 'From 4K cinematic film teasers and drone shots to heirloom handcrafted luxury albums.',
      },
    ],
    skillPills: [
      'Candid Photography',
      'Cinematic Wedding Films',
      'Pre-Wedding Shoots',
      'LED Stage Coordination',
      'Drone Aerial 4K',
      'Heirloom Albums',
    ],
  },
  testimonials: testimonialsData,
  faqs: faqData,
  finalCta: {
    eyebrow: "LET'S CREATE TOGETHER",
    headline: 'Ready to Capture Your ',
    headlineHighlight: 'Special Day?',
    description:
      "Let's create beautiful memories together. From wedding photography to LED setups, we'll make your celebration truly unforgettable.",
    primaryButtonLabel: 'Get a Quote',
    phone: '+91 94404 27791',
    bulletPoints: ['Flexible Packages', 'Same-Day Teasers', 'LED Screen Rentals'],
  },
  isFromSanity: false,
};

// Unified GROQ query to fetch all published content in one roundtrip
const ALL_CONTENT_QUERY = `{
  "siteSettings": *[_type == "siteSettings"][0],
  "hero": *[_type == "heroSection"][0],
  "stats": *[_type == "statItem"] | order(order asc, _createdAt asc),
  "services": *[_type == "service"] | order(order asc, _createdAt asc),
  "galleryItems": *[_type == "galleryItem"] | order(order asc, _createdAt asc),
  "about": *[_type == "aboutStudio"][0],
  "testimonials": *[_type == "testimonial"] | order(order asc, _createdAt asc),
  "faqs": *[_type == "faqItem"] | order(order asc, _createdAt asc),
  "finalCta": *[_type == "finalCta"][0]
}`;

/**
 * Fetches dynamic content from Sanity with seamless failsafe fallback to static data.
 * If Sanity credentials are missing, network fails, or schemas are empty,
 * it returns the static repository data without throwing errors.
 */
export async function fetchSiteContent(): Promise<DynamicSiteContent> {
  if (!isSanityConfigured || !sanityClient) {
    return staticFailsafeContent;
  }

  try {
    const data = await sanityClient.fetch(ALL_CONTENT_QUERY);

    if (!data) {
      return staticFailsafeContent;
    }

    // Merge Site Settings
    const siteSettings: SanitySiteSettings = {
      studioName: data.siteSettings?.studioName || staticFailsafeContent.siteSettings.studioName,
      tagline: data.siteSettings?.tagline || staticFailsafeContent.siteSettings.tagline,
      phone: data.siteSettings?.phone || staticFailsafeContent.siteSettings.phone,
      whatsapp: data.siteSettings?.whatsapp || staticFailsafeContent.siteSettings.whatsapp,
      email: data.siteSettings?.email || staticFailsafeContent.siteSettings.email,
      address: data.siteSettings?.address || staticFailsafeContent.siteSettings.address,
      instagramUrl: data.siteSettings?.instagramUrl || staticFailsafeContent.siteSettings.instagramUrl,
      youtubeUrl: data.siteSettings?.youtubeUrl || staticFailsafeContent.siteSettings.youtubeUrl,
      facebookUrl: data.siteSettings?.facebookUrl || staticFailsafeContent.siteSettings.facebookUrl,
      linkedinUrl: data.siteSettings?.linkedinUrl || staticFailsafeContent.siteSettings.linkedinUrl,
    };

    // Merge Hero
    const hero: SanityHeroContent = {
      eyebrow: data.hero?.eyebrow || staticFailsafeContent.hero.eyebrow,
      titlePrefix: data.hero?.titlePrefix || staticFailsafeContent.hero.titlePrefix,
      titleHighlight: data.hero?.titleHighlight || staticFailsafeContent.hero.titleHighlight,
      subtitle: data.hero?.subtitle || staticFailsafeContent.hero.subtitle,
      viewWorkLabel: data.hero?.viewWorkLabel || staticFailsafeContent.hero.viewWorkLabel,
      contactLabel: data.hero?.contactLabel || staticFailsafeContent.hero.contactLabel || 'Contact Us',
      showreelLabel: data.hero?.showreelLabel || staticFailsafeContent.hero.showreelLabel,
      showreelVideoUrl: data.hero?.showreelVideoUrl || staticFailsafeContent.hero.showreelVideoUrl,
      backgroundImage: data.hero?.backgroundImage || undefined,
    };

    // Merge Stats (fallback to static if empty)
    const stats = Array.isArray(data.stats) && data.stats.length > 0
      ? data.stats.map((s: any, idx: number) => ({
          id: s._id || `stat-${idx}`,
          value: s.value || '0',
          label: s.label || '',
          iconName: s.iconName || 'Heart',
          description: s.description || undefined,
        }))
      : staticFailsafeContent.stats;

    // Merge Services (each Sanity document is a 1-to-1 independent card on the website)
    const services = Array.isArray(data.services) && data.services.length > 0
      ? data.services.map((s: any, idx: number) => {
          const defaultImage = getAssetUrl('assets/services/service-studio.jpg');
          return {
            id: s._id || `service-${idx}`,
            number: s.number ? String(s.number).padStart(2, '0') : String(idx + 1).padStart(2, '0'),
            title: s.title || `Service ${idx + 1}`,
            category: s.category || 'Specialized Service',
            tagline: s.tagline || '',
            description: s.description || '',
            image: s.coverImage ? urlForImage(s.coverImage, defaultImage) : defaultImage,
            iconName: (s.iconName || 'Camera') as ServiceItem['iconName'],
            features: Array.isArray(s.features) ? s.features.filter(Boolean) : [],
            whatIsCovered: Array.isArray(s.whatIsCovered)
              ? s.whatIsCovered
                  .map((item: any) => ({
                    title: item?.title || '',
                    description: item?.description || '',
                  }))
                  .filter((item: any) => item.title || item.description)
              : [],
            deliverables: Array.isArray(s.deliverables) ? s.deliverables.filter(Boolean) : [],
            durationOrScope: s.durationOrScope || 'Custom Schedule',
            teamSize: s.teamSize || 'Dedicated Crew',
          };
        })
      : staticFailsafeContent.services;

    // Merge Gallery Items (Featured and Full Gallery)
    const rawGallery = Array.isArray(data.galleryItems) && data.galleryItems.length > 0
      ? data.galleryItems
      : [];

    const featuredWorks = rawGallery.length > 0
      ? rawGallery
          .filter((item: any) => item.showOnHomepage !== false)
          .map((item: any, idx: number) => {
            const fallback = staticFailsafeContent.featuredWorks[idx] || staticFailsafeContent.featuredWorks[0];
            return {
              id: item._id || item.slug?.current || `gallery-${idx}`,
              title: item.title || fallback.title,
              subtitle: item.subtitle || fallback.subtitle,
              category: item.category || fallback.category,
              type: (item.type || (item.category === 'Films' ? 'film' : 'photo')) as 'photo' | 'film',
              videoUrl: item.videoUrl || undefined,
              image: item.image ? urlForImage(item.image, fallback.image) : fallback.image,
              client: item.client || fallback.client,
              year: item.year || fallback.year,
              resolution: item.resolution || fallback.resolution,
              description: item.description || fallback.description,
              specs: Array.isArray(item.specs) && item.specs.length > 0 ? item.specs : fallback.specs,
            };
          })
      : staticFailsafeContent.featuredWorks;

    const galleryPageItems = rawGallery.length > 0
      ? rawGallery.map((item: any, idx: number) => {
          const fallback = staticFailsafeContent.galleryPageItems[idx] || staticFailsafeContent.galleryPageItems[0];
          return {
            id: item._id || item.slug?.current || `gallery-page-${idx}`,
            title: item.title || fallback.title,
            category: item.category || fallback.category,
            image: item.image ? urlForImage(item.image, fallback.image) : fallback.image,
            type: (item.type || (item.category === 'Films' ? 'film' : 'photo')) as 'photo' | 'film',
            videoUrl: item.videoUrl || undefined,
            description: item.description || fallback.description,
          };
        })
      : staticFailsafeContent.galleryPageItems;

    // Merge About Studio
    const about: SanityAboutContent = {
      founderName: data.about?.founderName || staticFailsafeContent.about.founderName,
      founderTitle: data.about?.founderTitle || staticFailsafeContent.about.founderTitle,
      yearsExperience: data.about?.yearsExperience || staticFailsafeContent.about.yearsExperience,
      weddingsCount: data.about?.weddingsCount || staticFailsafeContent.about.weddingsCount,
      founderBio: data.about?.founderBio || staticFailsafeContent.about.founderBio,
      founderPhoto: data.about?.founderPhoto || undefined,
      experienceCards: Array.isArray(data.about?.experienceCards) && data.about.experienceCards.length > 0
        ? data.about.experienceCards
        : staticFailsafeContent.about.experienceCards,
      skillPills: Array.isArray(data.about?.skillPills) && data.about.skillPills.length > 0
        ? data.about.skillPills
        : staticFailsafeContent.about.skillPills,
    };

    // Merge Testimonials
    const testimonials = Array.isArray(data.testimonials) && data.testimonials.length > 0
      ? data.testimonials.map((t: any, idx: number) => ({
          id: t._id || `testimonial-${idx}`,
          name: t.name || 'Valued Client',
          role: t.role || 'Wedding Client',
          quote: t.quote || '',
          rating: typeof t.rating === 'number' ? t.rating : 5,
          event: t.event || 'Celebration',
        }))
      : staticFailsafeContent.testimonials;

    // Merge FAQs
    const faqs = Array.isArray(data.faqs) && data.faqs.length > 0
      ? data.faqs.map((f: any, idx: number) => ({
          id: f._id || `faq-${idx}`,
          question: f.question || '',
          answer: f.answer || '',
          category: f.category || 'all',
        }))
      : staticFailsafeContent.faqs;

    // Merge Final CTA
    const finalCta: SanityFinalCtaContent = {
      eyebrow: data.finalCta?.eyebrow || staticFailsafeContent.finalCta.eyebrow,
      headline: data.finalCta?.headline || staticFailsafeContent.finalCta.headline,
      headlineHighlight: data.finalCta?.headlineHighlight || staticFailsafeContent.finalCta.headlineHighlight,
      description: data.finalCta?.description || staticFailsafeContent.finalCta.description,
      primaryButtonLabel: data.finalCta?.primaryButtonLabel || staticFailsafeContent.finalCta.primaryButtonLabel,
      phone: data.finalCta?.phone || staticFailsafeContent.finalCta.phone,
      bulletPoints: Array.isArray(data.finalCta?.bulletPoints) && data.finalCta.bulletPoints.length > 0
        ? data.finalCta.bulletPoints
        : staticFailsafeContent.finalCta.bulletPoints,
    };

    return {
      siteSettings,
      hero,
      stats,
      services,
      featuredWorks: featuredWorks.length > 0 ? featuredWorks : staticFailsafeContent.featuredWorks,
      galleryPageItems: galleryPageItems.length > 0 ? galleryPageItems : staticFailsafeContent.galleryPageItems,
      about,
      testimonials,
      faqs,
      finalCta,
      isFromSanity: true,
    };
  } catch (err) {
    // In case of any network error or permission issue, silently fall back
    console.warn('[Sanity CMS] Using static failsafe data:', err);
    return staticFailsafeContent;
  }
}
