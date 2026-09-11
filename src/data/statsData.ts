export interface StatItem {
  id: string;
  value: string;
  label: string;
  iconName: 'Heart' | 'Users' | 'Clock' | 'Star';
  description?: string;
}

export const statsData: StatItem[] = [
  {
    id: 'weddings',
    value: '500+',
    label: 'Weddings Captured',
    iconName: 'Heart',
    description: 'Beautiful weddings photographed & filmed'
  },
  {
    id: 'clients',
    value: '1000+',
    label: 'Happy Clients',
    iconName: 'Users',
    description: 'Families who trust us with their memories'
  },
  {
    id: 'experience',
    value: '10+',
    label: 'Years Experience',
    iconName: 'Clock',
    description: 'A decade of capturing precious moments'
  },
  {
    id: 'satisfaction',
    value: '98%',
    label: 'Client Satisfaction',
    iconName: 'Star',
    description: 'Consistently rated 5 stars by our clients'
  }
];
