import { getAssetUrl } from '../utils/assetHelper';

export interface ServiceCoverageItem {
  title: string;
  description: string;
}

export interface ServiceItem {
  number: string;
  title: string;
  category: string;
  tagline: string;
  description: string;
  image: string;
  iconName: 'Tv' | 'Camera' | 'Video' | 'BookOpen' | 'Heart' | 'PartyPopper';
  features: string[];
  whatIsCovered: ServiceCoverageItem[];
  deliverables: string[];
  durationOrScope: string;
  teamSize: string;
}

export const servicesData: ServiceItem[] = [
  {
    number: '01',
    title: 'LED Screen Rentals',
    category: 'LED Displays',
    tagline: 'Transform your venue with crystal-clear, flicker-free modular LED video walls.',
    description: 'Premium LED walls and screens for weddings, receptions, and events. Crystal-clear visuals that transform your venue into a stunning visual experience.',
    image: getAssetUrl('assets/services/service-led.jpg'),
    iconName: 'Tv',
    features: ['Wedding LED Walls', 'Reception Backdrops', 'Stage LED Screens', 'Outdoor LED Displays'],
    whatIsCovered: [
      {
        title: 'Custom Modular LED Video Walls',
        description: 'Ultra-fine pixel pitch (P2.6 / P3.9) high-contrast panels customized to fit any stage width, curved backdrop, or hall layout.',
      },
      {
        title: 'Live Video Feed & Multi-Switching',
        description: 'Real-time broadcast switching for live camera feeds of the couple on stage, guest slideshows, and cinematic entrance videos.',
      },
      {
        title: 'Dedicated On-Site Technical Engineer',
        description: 'Experienced AV technicians remain on-site throughout your event for live brightness adjustments, calibration, and uninterrupted operation.',
      },
      {
        title: 'Camera-Friendly & Anti-Flicker (3840Hz+)',
        description: 'High refresh rate engineering prevents scan lines, moiré patterns, and flickering in photos and wedding films.',
      },
      {
        title: 'Custom Motion Graphics & Monograms',
        description: 'Personalized 3D couple monograms, animated wedding floral themes, and customized background loops created for your celebration.',
      },
      {
        title: 'Full Rigging, Truss & Power Distribution',
        description: 'Safe, certified ground-support trussing, discreet cabling, and industrial surge-protected power distribution included.',
      },
    ],
    deliverables: [
      'High-Definition Modular LED Display Wall',
      'Professional Video Processor & Switcher',
      'On-Site AV Engineers for Entire Event',
      'Custom Motion Graphics & Monogram Theme',
      'Ground Support Truss & Safe Rigging',
    ],
    durationOrScope: 'Full Event Day (Setup, Live Operation & Teardown)',
    teamSize: '2 - 3 Dedicated AV Technicians',
  },
  {
    number: '02',
    title: 'Wedding Photography',
    category: 'Photography',
    tagline: 'Preserving unscripted candid emotions and timeless sacred rituals in heirloom fidelity.',
    description: 'Capturing your most precious moments with artistry and emotion. From candid shots to traditional portraits, we preserve every beautiful detail of your special day.',
    image: getAssetUrl('assets/services/service-photo.jpg'),
    iconName: 'Camera',
    features: ['Candid Photography', 'Traditional Portraits', 'Couple Shoots', 'Family Portraits'],
    whatIsCovered: [
      {
        title: 'Full Day Comprehensive Coverage',
        description: 'From early morning bridal preparations, jewelry details, and baraat arrival to the solemn muhurtham and evening reception.',
      },
      {
        title: 'Artistic Candid Storytelling',
        description: 'Unobtrusive capture of natural laughter, joyful tears, quiet glances, and spontaneous family celebrations without awkward posing.',
      },
      {
        title: 'Traditional Ceremonies & Stage Portraits',
        description: 'Dedicated focus ensuring every sacred ritual, family elder blessing, and guest group portrait is documented with immaculate lighting.',
      },
      {
        title: 'Multiple Senior Photographers',
        description: 'A coordinated two or three-photographer team capturing simultaneous perspectives — the couple at the altar and the emotional parents in the crowd.',
      },
      {
        title: 'Drone Aerial Stills',
        description: 'Breathtaking high-altitude perspectives capturing the venue grandeur, baraat procession, and open-air celebrations.',
      },
      {
        title: 'Master Signature Color Retouching',
        description: 'Every single delivered photograph undergoes individual color correction, exposure tuning, and skin-tone enhancement in our signature warm aesthetic.',
      },
    ],
    deliverables: [
      '500+ Master Retouched High-Resolution Images',
      'Private Password-Protected Online Cloud Gallery',
      'Fast 48-Hour Preview Teaser (30+ Photos)',
      'Full Printing & Personal Usage Rights',
      'High-Speed Cloud Download for Family & Friends',
    ],
    durationOrScope: 'Full Wedding Day (Up to 12-14 Hours of Coverage)',
    teamSize: '2 - 3 Senior Photographers + Assistant',
  },
  {
    number: '03',
    title: 'Wedding Films & Videography',
    category: 'Videography',
    tagline: 'Heartfelt, cinematic love stories filmed with 4K cinema lenses and master sound design.',
    description: 'Cinematic wedding films that tell your love story beautifully. From teasers and highlights to full ceremony coverage, every emotion is captured in stunning detail.',
    image: getAssetUrl('assets/services/service-video.jpg'),
    iconName: 'Video',
    features: ['Wedding Teasers', 'Highlight Reels', 'Full Ceremony Films', 'Same-Day Edits'],
    whatIsCovered: [
      {
        title: '4K Cinema-Grade Cameras & Master Glass',
        description: 'Shot on high-dynamic-range cinema cameras with shallow depth of field prime lenses for a rich, filmic texture.',
      },
      {
        title: 'Cinematic Wedding Teaser (60-90s)',
        description: 'A dynamic, high-energy teaser cut delivered fast for sharing on Instagram, WhatsApp, and social channels with friends.',
      },
      {
        title: 'Signature Highlight Film (5-8 Minutes)',
        description: 'The definitive narrative film of your wedding day, artfully interweaving vows, speeches, laughter, and ceremony milestones set to licensed music.',
      },
      {
        title: 'Full Ceremony Documentary Video',
        description: 'Comprehensive, chronological video coverage of all ceremonies, stage rituals, family speeches, and cultural performances.',
      },
      {
        title: 'Drone Aerial 4K Cinematography',
        description: 'Sweeping cinematic aerial shots showcasing your venue, bridal entrance, guest arrivals, and dramatic couple portraits from above.',
      },
      {
        title: 'Studio-Grade Multi-Channel Audio',
        description: 'Discreet wireless lavalier microphones for the couple and officiant, ensuring every vow, blessing, and speech is recorded with studio clarity.',
      },
    ],
    deliverables: [
      '1x Cinematic Wedding Teaser (60-90s)',
      '1x Signature Highlight Narrative Film (5-8 mins)',
      '1x Extended Full Ceremony Documentary Film',
      '4K Digital Masters on Custom Wooden Keepsake USB',
      'Private Cloud Streaming Link in 4K UHD',
    ],
    durationOrScope: 'Full Wedding Celebration Coverage',
    teamSize: '2 - 3 Cinematographers + Certified Drone Pilot',
  },
  {
    number: '04',
    title: 'Photo Albums & Prints',
    category: 'Albums',
    tagline: 'Bespoke heirloom photo albums handcrafted with fine archival paper and Italian leather.',
    description: 'Beautifully crafted premium photo albums and prints that you will treasure forever. Custom-designed layouts with the finest materials and finishes.',
    image: getAssetUrl('assets/services/service-studio.jpg'),
    iconName: 'BookOpen',
    features: ['Premium Albums', 'Canvas Prints', 'Photo Frames', 'Custom Designs'],
    whatIsCovered: [
      {
        title: 'Flush-Mount Seamless Layflat Pages',
        description: 'Thick panoramic spreads open completely flat at 180 degrees without any image loss or cut in the center gutter.',
      },
      {
        title: 'Custom Chronological Storybook Design',
        description: 'Our in-house design artists handcraft every layout, balancing negative space, candid collages, and hero couple spreads.',
      },
      {
        title: 'Luxury Cover Material Choices',
        description: 'Choose from authentic Italian full-grain leather, embossed acrylic crystal, velvet, or textured organic linen.',
      },
      {
        title: 'Museum-Quality Archival Inks & Papers',
        description: 'Printed with 12-color archival pigment inks rated for 100+ years of color permanence with non-glare, fingerprint-proof matte lamination.',
      },
      {
        title: 'Personalized Gold/Silver Foil Embossing',
        description: 'Couple names, wedding monogram, and celebration date elegantly hot-stamped on the cover and spine in metallic foil.',
      },
      {
        title: 'Handcrafted Presentation Keepsake Box',
        description: 'Each luxury album comes nestled in a custom-built, matching protective presentation box with magnetic closure.',
      },
    ],
    deliverables: [
      '1x Premium 12x36 or 12x30 Flush-Mount Album (40-60 Pages)',
      '1x Handcrafted Matching Keepsake Presentation Box',
      'Digital Soft-Copy Proofing with Revisions',
      'Optional 2x Duplicate Pocket Parent Mini-Albums',
      'Optional Ready-to-Hang Framed Canvas Print',
    ],
    durationOrScope: 'Design Approval & Handcrafted Production: 3 - 4 Weeks',
    teamSize: 'Dedicated Album Design Artist & Master Bookbinder',
  },
  {
    number: '05',
    title: 'Pre-Wedding Shoots',
    category: 'Pre-Wedding',
    tagline: 'Romantic, relaxed couple sessions at breathtaking locations before your big celebration.',
    description: 'Romantic and creative pre-wedding photoshoots at stunning locations. Capture the excitement and love before your big day with our artistic team.',
    image: getAssetUrl('assets/gallery/gallery-nature.jpg'),
    iconName: 'Heart',
    features: ['Outdoor Locations', 'Indoor Studio', 'Destination Shoots', 'Creative Concepts'],
    whatIsCovered: [
      {
        title: 'Creative Moodboard & Location Scouting',
        description: 'We help you curate thematic concepts, wardrobe color palettes, and scout private scenic beaches, architectural sites, or nature reserves.',
      },
      {
        title: 'Half-Day or Full-Day Photo & Video Session',
        description: 'Relaxed, unhurried pacing with 3 to 4 wardrobe changes giving you a diverse collection of casual, traditional, and editorial aesthetics.',
      },
      {
        title: 'Golden Hour & Night Ambient Magic',
        description: 'Strategic timing around sunset warm glow paired with dusk twilight fairy lights, smoke effects, or sparklers for enchanting imagery.',
      },
      {
        title: 'Pre-Wedding Cinematic Reel / Teaser',
        description: 'A 60-second music-video style short film capturing your chemistry, perfect for sending with your digital wedding invitations.',
      },
      {
        title: 'Guided Natural Posing Assistance',
        description: 'We keep the session fun, light-hearted, and candid so you never feel stiff or nervous in front of the lens.',
      },
      {
        title: 'Ultra High-Resolution Master Retouched Files',
        description: 'Fully skin-toned and stylized high-res images formatted ready for large-format wedding reception entrance easel displays.',
      },
    ],
    deliverables: [
      '35 - 50 Master Retouched High-Resolution Photographs',
      '1-Minute Cinematic Pre-Wedding Video Teaser',
      'High-Resolution Files for Welcome Easels & Invites',
      'Private Cloud Gallery with Instant Sharing',
    ],
    durationOrScope: '4 - 8 Hours (depending on location selected)',
    teamSize: '1 Lead Photographer + 1 Cinematographer + Assistant',
  },
  {
    number: '06',
    title: 'Event Coverage',
    category: 'Events',
    tagline: 'Vibrant, complete photography and videography for birthdays, receptions, and galas.',
    description: 'Complete photography and videography coverage for birthdays, receptions, corporate events, and celebrations of all kinds. Every moment, every smile, captured perfectly.',
    image: getAssetUrl('assets/gallery/gallery-gala.jpg'),
    iconName: 'PartyPopper',
    features: ['Birthday Parties', 'Corporate Events', 'Reception Coverage', 'Live Streaming'],
    whatIsCovered: [
      {
        title: 'Comprehensive Milestone Event Coverage',
        description: 'From grand birthday bashes and baby showers to corporate galas and wedding receptions, we capture every milestone.',
      },
      {
        title: 'Candid Guest Reactions & Celebrations',
        description: 'Focusing on natural smiles, heartfelt toasts, spontaneous dance floor energy, and genuine interactions throughout the night.',
      },
      {
        title: 'Stage & Welcome Step-and-Repeat Backdrops',
        description: 'Crisp, beautifully lit portraits of every guest as they arrive and during cake cutting or on-stage felicitations.',
      },
      {
        title: 'Live Event LED Screen Integration',
        description: 'Real-time transmission of select event photos directly to venue LED screens as a live same-evening slideshow.',
      },
      {
        title: 'Event Highlights Video Reel',
        description: 'A 2 to 3-minute upbeat highlight reel capturing the spirit, key speeches, decor, and excitement of the evening.',
      },
      {
        title: 'Fast Express Digital Delivery',
        description: 'Speedy 3-day turnaround so you can share memories on social media and with guests while the celebration is fresh.',
      },
    ],
    deliverables: [
      '200 - 400 Color-Corrected High-Resolution Photos',
      '1x 2-3 Minute Event Video Highlight Reel',
      'Fast 3-Day Turnaround Digital Cloud Delivery',
      'Private Cloud Link to Share with All Attendees',
    ],
    durationOrScope: '4 - 8 Hours per Event Session',
    teamSize: '1 - 2 Senior Photographers + 1 Videographer',
  },
];

