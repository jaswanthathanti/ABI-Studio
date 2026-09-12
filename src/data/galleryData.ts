import { getAssetUrl } from '../utils/assetHelper';

export interface GalleryItem {
  id: string;
  title: string;
  subtitle: string;
  category: 'Weddings' | 'Pre-Wedding' | 'Events' | 'LED Setups' | 'Albums' | 'Films';
  image: string;
  type?: 'photo' | 'film';
  videoUrl?: string;
  client: string;
  year: string;
  resolution: string;
  description: string;
  specs: string[];
}

export const galleryCategories = [
  'All',
  'Weddings',
  'Pre-Wedding',
  'Events',
  'LED Setups',
  'Albums',
  'Films'
] as const;

export const galleryData: GalleryItem[] = [
  {
    id: 'royal-wedding',
    title: 'Royal Wedding Celebration',
    subtitle: 'A Grand Traditional Wedding',
    category: 'Weddings',
    image: getAssetUrl('assets/gallery/gallery-fashion.jpg'),
    client: 'Sharma Family',
    year: '2026',
    resolution: 'Full HD Photography',
    description: 'A magnificent traditional wedding celebration captured with artistic precision. Every ritual, every smile, and every tear of joy preserved in stunning detail.',
    specs: ['Full Day Coverage', 'Candid + Traditional', '2 Photographers', 'Drone Aerial Shots']
  },
  {
    id: 'sunset-prewedding',
    title: 'Golden Hour Romance',
    subtitle: 'Pre-Wedding Couple Shoot',
    category: 'Pre-Wedding',
    image: getAssetUrl('assets/gallery/gallery-nature.jpg'),
    client: 'Priya & Rahul',
    year: '2026',
    resolution: 'High Resolution',
    description: 'A dreamy pre-wedding shoot during golden hour, capturing the beauty of love against breathtaking natural landscapes.',
    specs: ['Outdoor Location', 'Golden Hour Timing', 'Multiple Outfit Changes', 'Creative Posing']
  },
  {
    id: 'grand-reception',
    title: 'Grand Reception Night',
    subtitle: 'LED Stage & Reception Coverage',
    category: 'LED Setups',
    image: getAssetUrl('assets/gallery/gallery-arena.jpg'),
    client: 'Reddy Family',
    year: '2026',
    resolution: 'Full HD LED Display',
    description: 'A spectacular reception with a massive LED wall backdrop displaying personalized content, creating an immersive visual experience for all guests.',
    specs: ['20ft LED Wall', 'Custom Content Design', 'Stage Lighting', 'Full Coverage']
  },
  {
    id: 'wedding-film',
    title: 'Cinematic Wedding Film',
    subtitle: 'A Love Story in Motion',
    category: 'Films',
    type: 'film',
    image: getAssetUrl('assets/gallery/gallery-auto.jpg'),
    client: 'Anita & Vikram',
    year: '2025',
    resolution: '4K Cinematic',
    description: 'A beautifully crafted cinematic wedding film capturing the emotions, celebrations, and intimate moments of a beautiful wedding day.',
    specs: ['4K Video', 'Cinematic Color Grading', 'Licensed Music', 'Same-Day Teaser']
  },
  {
    id: 'birthday-bash',
    title: 'Grand Birthday Celebration',
    subtitle: 'Event Photography & LED',
    category: 'Events',
    image: getAssetUrl('assets/gallery/gallery-gala.jpg'),
    client: 'Patel Family',
    year: '2025',
    resolution: 'High Resolution',
    description: 'A grand birthday celebration with LED decorations, professional photography covering every moment of joy and festivity.',
    specs: ['LED Backdrop', 'Event Photography', 'Candid Coverage', 'Photo Booth Setup']
  },
  {
    id: 'premium-album',
    title: 'Premium Wedding Album',
    subtitle: 'Custom Designed Photo Album',
    category: 'Albums',
    image: getAssetUrl('assets/gallery/gallery-summit.jpg'),
    client: 'Kapoor Family',
    year: '2025',
    resolution: 'Print Quality',
    description: 'A luxuriously crafted premium wedding album with custom-designed layouts, premium paper, and an elegant cover that tells your complete love story.',
    specs: ['40 Pages Hardcover', 'Custom Layout Design', 'Premium Matte Paper', 'Elegant Box Packaging']
  }
];
