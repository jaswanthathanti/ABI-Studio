export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'all' | 'photography' | 'led' | 'albums' | 'booking';
}

export const faqCategories = [
  { id: 'all', label: 'All Questions' },
  { id: 'photography', label: 'Photography & Films' },
  { id: 'led', label: 'LED Screen Rentals' },
  { id: 'albums', label: 'Albums & Prints' },
  { id: 'booking', label: 'Booking & Delivery' },
] as const;

export const faqData: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'How far in advance should we book our wedding or event date?',
    answer:
      'We recommend booking 3 to 6 months in advance, especially for popular auspicious wedding dates and peak seasons (October through March). However, we always welcome last-minute inquiries and do our best to accommodate dates if our team and equipment are available.',
    category: 'booking',
  },
  {
    id: 'faq-2',
    question: 'Do you provide combined photography, cinematic films, and drone coverage?',
    answer:
      'Yes! We specialize in unified packages that seamlessly combine senior candid photographers, traditional photographers, cinematic filmmakers, and certified 4K drone pilots. Having one cohesive team guarantees consistent visual tones, synchronized audio capture, and smooth on-stage coordination without clutter.',
    category: 'photography',
  },
  {
    id: 'faq-3',
    question: 'What makes your LED Screen rentals flicker-free and camera-friendly?',
    answer:
      'Our modular LED video walls use ultra-fine pixel pitch panels with high refresh rates of 3840Hz and beyond. This completely eliminates scan lines, moiré patterns, and flickering when photographed or filmed. We also supply video processors, live camera feed switching, and on-site AV technicians for real-time brightness and color calibration.',
    category: 'led',
  },
  {
    id: 'faq-4',
    question: 'What is the delivery timeline for teaser photos, master edits, and films?',
    answer:
      'We deliver a curated sneak-peek teaser of 30+ master-retouched photos within 48 to 72 hours of your celebration so you can share memories right away. Full high-resolution color-graded photo galleries and cinematic wedding teasers are delivered within 3 to 4 weeks. Full ceremony documentary films and customized layflat albums follow within 4 to 6 weeks.',
    category: 'booking',
  },
  {
    id: 'faq-5',
    question: 'Can we customize our package to fit our specific rituals and schedule?',
    answer:
      'Absolutely. Every wedding and cultural celebration is unique. Whether you require half-day coverage for a ring ceremony, multi-day coverage spanning haldi, sangeet, and muhurtham, or custom stage LED dimensions, we tailor the hours, crew size, and deliverables to your precise requirements and budget.',
    category: 'photography',
  },
  {
    id: 'faq-6',
    question: 'Do you travel for destination weddings and out-of-station events?',
    answer:
      'Yes, we frequently travel across India and internationally for destination weddings, grand receptions, and corporate galas. Travel, transit logistics, and accommodation arrangements are transparently detailed upfront in your quotation without hidden fees.',
    category: 'booking',
  },
  {
    id: 'faq-7',
    question: 'What materials and finishes do you use for handcrafted photo albums?',
    answer:
      'Our heirloom albums feature 180° seamless layflat panoramic spreads printed with 12-color archival pigment inks on non-glare, fingerprint-resistant paper rated for 100+ years. Cover options include Italian full-grain leather, embossed crystal acrylic, velvet, and organic linen, complete with personalized foil embossing and a matching presentation box.',
    category: 'albums',
  },
  {
    id: 'faq-8',
    question: 'How does the booking process and payment schedule work?',
    answer:
      'Booking is straightforward: once we finalize your package details, a 25% advance deposit secures your date exclusively on our calendar. A 50% milestone payment is due on or before the event date, and the remaining 25% balance is settled upon delivery of your final high-resolution edits and albums.',
    category: 'booking',
  },
];
