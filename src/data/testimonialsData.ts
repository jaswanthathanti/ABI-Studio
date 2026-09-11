export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  quote: string;
  rating: number;
  event: string;
}

export const testimonialsData: TestimonialItem[] = [
  {
    id: 't1',
    name: 'Priya & Arjun',
    role: 'Wedding Couple',
    quote: 'ABI Studio captured every precious moment of our wedding beautifully. The candid shots were absolutely magical, and the LED backdrop made our reception look like a fairy tale!',
    rating: 5,
    event: 'Wedding Photography + LED'
  },
  {
    id: 't2',
    name: 'Sneha & Rahul',
    role: 'Wedding Couple',
    quote: 'Our wedding film still gives us goosebumps! The team was so professional and the same-day teaser had all our guests in tears of joy. Truly the best investment we made.',
    rating: 5,
    event: 'Wedding Film'
  },
  {
    id: 't3',
    name: 'Rajesh Kumar',
    role: 'Father of the Bride',
    quote: 'From the pre-wedding shoot to the reception LED setup, everything was handled perfectly. The photo album they designed is a masterpiece our family will treasure forever.',
    rating: 5,
    event: 'Complete Wedding Package'
  },
  {
    id: 't4',
    name: 'Meera & Vikram',
    role: 'Wedding Couple',
    quote: 'The pre-wedding shoot at sunset was a dream come true! ABI Studio knew exactly how to make us comfortable and the photos turned out beyond our expectations.',
    rating: 5,
    event: 'Pre-Wedding Shoot'
  },
  {
    id: 't5',
    name: 'Anil Patel',
    role: 'Event Organizer',
    quote: 'We hired ABI Studio for our corporate event and they delivered exceptional LED screen setups and professional photography. Highly recommended for any event!',
    rating: 5,
    event: 'Corporate Event'
  },
  {
    id: 't6',
    name: 'Kavitha & Suresh',
    role: 'Wedding Couple',
    quote: 'The LED wall at our reception was the highlight of the evening! Combined with their amazing photography, our wedding was truly unforgettable. Thank you ABI Studio!',
    rating: 5,
    event: 'Reception LED + Photography'
  }
];
