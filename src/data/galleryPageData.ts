import { getAssetUrl } from '../utils/assetHelper';

export interface GalleryPageItem {
  id: string;
  title: string;
  category: 'Weddings' | 'Pre-Wedding' | 'Events' | 'LED Setups' | 'Albums' | 'Films';
  image: string;
  type: 'photo' | 'film';
  description?: string;
}

export const galleryPageCategories = [
  'All',
  'Weddings',
  'Pre-Wedding',
  'Events',
  'LED Setups',
  'Albums',
  'Films'
] as const;

export const galleryPageData: GalleryPageItem[] = [
  // Weddings
  { id: 'w1', title: 'Royal Wedding Ceremony', category: 'Weddings', image: getAssetUrl('assets/gallery/gallery-fashion.jpg'), type: 'photo', description: 'Traditional wedding ceremony with beautiful decorations' },
  { id: 'w2', title: 'Garden Wedding', category: 'Weddings', image: getAssetUrl('assets/gallery/gallery-nature.jpg'), type: 'photo', description: 'Beautiful outdoor garden wedding celebration' },
  { id: 'w3', title: 'Temple Wedding', category: 'Weddings', image: getAssetUrl('assets/gallery/gallery-summit.jpg'), type: 'photo', description: 'Sacred temple wedding with traditional rituals' },
  { id: 'w4', title: 'Destination Wedding', category: 'Weddings', image: getAssetUrl('assets/gallery/gallery-gala.jpg'), type: 'photo', description: 'Luxurious destination wedding at a resort' },
  // Pre-Wedding
  { id: 'pw1', title: 'Sunset Couple Shoot', category: 'Pre-Wedding', image: getAssetUrl('assets/gallery/gallery-nature.jpg'), type: 'photo', description: 'Romantic couple shoot during golden hour' },
  { id: 'pw2', title: 'Studio Portrait Session', category: 'Pre-Wedding', image: getAssetUrl('assets/gallery/gallery-fashion.jpg'), type: 'photo', description: 'Professional indoor studio couple portraits' },
  { id: 'pw3', title: 'Beach Pre-Wedding', category: 'Pre-Wedding', image: getAssetUrl('assets/gallery/gallery-auto.jpg'), type: 'photo', description: 'Fun and romantic beach pre-wedding shoot' },
  // Events
  { id: 'e1', title: 'Grand Birthday Celebration', category: 'Events', image: getAssetUrl('assets/gallery/gallery-gala.jpg'), type: 'photo', description: 'A lavish birthday party with all the festivities' },
  { id: 'e2', title: 'Corporate Annual Meet', category: 'Events', image: getAssetUrl('assets/gallery/gallery-summit.jpg'), type: 'photo', description: 'Professional corporate event coverage' },
  { id: 'e3', title: 'Baby Shower Ceremony', category: 'Events', image: getAssetUrl('assets/gallery/gallery-fashion.jpg'), type: 'photo', description: 'Beautiful baby shower celebration' },
  // LED Setups
  { id: 'l1', title: 'Wedding Reception LED Wall', category: 'LED Setups', image: getAssetUrl('assets/gallery/gallery-arena.jpg'), type: 'photo', description: 'Massive LED backdrop for wedding reception' },
  { id: 'l2', title: 'Stage LED Display', category: 'LED Setups', image: getAssetUrl('assets/services/service-led.jpg'), type: 'photo', description: 'Custom LED stage setup for events' },
  { id: 'l3', title: 'Outdoor LED Screen', category: 'LED Setups', image: getAssetUrl('assets/gallery/gallery-summit.jpg'), type: 'photo', description: 'Outdoor LED screen for open-air events' },
  // Albums
  { id: 'a1', title: 'Premium Hardcover Album', category: 'Albums', image: getAssetUrl('assets/gallery/gallery-summit.jpg'), type: 'photo', description: 'Luxurious hardcover wedding photo album' },
  { id: 'a2', title: 'Elegant Coffee Table Book', category: 'Albums', image: getAssetUrl('assets/gallery/gallery-fashion.jpg'), type: 'photo', description: 'Coffee table style wedding album' },
  // Films
  { id: 'f1', title: 'Cinematic Wedding Teaser', category: 'Films', image: getAssetUrl('assets/gallery/gallery-auto.jpg'), type: 'film', description: 'Short cinematic wedding teaser video' },
  { id: 'f2', title: 'Wedding Highlights Reel', category: 'Films', image: getAssetUrl('assets/gallery/gallery-arena.jpg'), type: 'film', description: 'Complete wedding highlights video' },
  { id: 'f3', title: 'Pre-Wedding Film', category: 'Films', image: getAssetUrl('assets/gallery/gallery-nature.jpg'), type: 'film', description: 'Romantic pre-wedding short film' },
];
