export interface EquipmentItem {
  id: string;
  name: string;
  category: 'Cameras' | 'Cinema Cameras' | 'LED Displays' | 'Lenses' | 'Gimbals' | 'Drones' | 'Lighting';
  tagline: string;
  image: string;
  specs: { label: string; value: string }[];
  isFlagship?: boolean;
  status: 'In Studio' | 'Touring Rig' | 'Field Ready';
}

export const equipmentCategories = [
  'All',
  'LED Displays',
  'Cinema Cameras',
  'Cameras',
  'Lenses',
  'Gimbals',
  'Drones',
  'Lighting'
] as const;

export const equipmentData: EquipmentItem[] = [
  {
    id: 'apex-microled',
    name: 'Apex MicroLED P1.2 Tile Matrix',
    category: 'LED Displays',
    tagline: 'Ultra-Fine Pixel Pitch Modular LED Wall System',
    image: '/assets/equipment/equip-microled.jpg',
    isFlagship: true,
    status: 'In Studio',
    specs: [
      { label: 'Pixel Pitch', value: '1.25mm Ultra-Fine' },
      { label: 'Refresh Rate', value: '7,680Hz Low Latency' },
      { label: 'Peak Brightness', value: '1,500 Nits HDR' },
      { label: 'Contrast Ratio', value: '10,000:1 True Black' }
    ]
  },
  {
    id: 'venx-cinema',
    name: 'Venx 8K Large-Format Cinema Rig',
    category: 'Cinema Cameras',
    tagline: 'Carbon Fiber Body with Anamorphic 65mm Cine Prime',
    image: '/assets/equipment/equip-cinema.jpg',
    isFlagship: true,
    status: 'In Studio',
    specs: [
      { label: 'Sensor', value: 'Full Frame 8K VV CMOS' },
      { label: 'Dynamic Range', value: '17+ Stops RAW' },
      { label: 'Max Frame Rate', value: '120fps @ 8K, 240fps @ 4K' },
      { label: 'Lens Mount', value: 'Arri PL / LPL Mount' }
    ]
  },
  {
    id: 'sony-alpha-one',
    name: 'Sony Alpha 1 Flagship Mirrorless',
    category: 'Cameras',
    tagline: '50.1MP High-Speed Hybrid Imaging Engine',
    image: '/assets/equipment/equip-dslr.jpg',
    status: 'Field Ready',
    specs: [
      { label: 'Sensor', value: '50.1MP Stacked Exmor RS' },
      { label: 'Burst Shooting', value: '30 fps with AF/AE' },
      { label: 'Video Capture', value: '8K 30p & 4K 120p 10-Bit' },
      { label: 'Stabilization', value: '5.5-stop In-body Optical' }
    ]
  },
  {
    id: 'cine-primes',
    name: 'Atlas Orion & Sony G-Master Cine Set',
    category: 'Lenses',
    tagline: '2x Anamorphic & Ultra-Fast Prime Glass',
    image: '/assets/equipment/equip-lenses.jpg',
    status: 'In Studio',
    specs: [
      { label: 'Focal Lengths', value: '24mm, 35mm, 50mm, 85mm, 135mm' },
      { label: 'Aperture', value: 'T1.5 to T2.0 Fast Glass' },
      { label: 'Coverage', value: 'Full Frame & VistaVision' },
      { label: 'Character', value: 'Creamy Bokeh & Blue Flares' }
    ]
  },
  {
    id: 'ronin-stabilizer',
    name: 'Ronin 2 3-Axis Heavy-Duty Gimbal',
    category: 'Gimbals',
    tagline: 'High-Torque Professional Cinema Camera Gimbal',
    image: '/assets/equipment/equip-gimbal.jpg',
    status: 'Touring Rig',
    specs: [
      { label: 'Max Payload', value: '30 lbs (13.6 kg)' },
      { label: 'Axis Control', value: '360° Continuous Pan/Tilt' },
      { label: 'Operation', value: 'Handheld, Car Mount, Steadicam' },
      { label: 'Run Time', value: 'Dual Hot-Swap Batteries (8h)' }
    ]
  },
  {
    id: 'inspire-drone',
    name: 'DJI Inspire 3 Aerial Cinema Platform',
    category: 'Drones',
    tagline: 'Full-Frame 8K Airborne Cinema Camera Drone',
    image: '/assets/equipment/equip-drone.jpg',
    status: 'Field Ready',
    specs: [
      { label: 'Camera', value: 'Zenmuse X9-8K Air Gimbal' },
      { label: 'Flight Speed', value: '94 km/h Max Wind Resist' },
      { label: 'Navigation', value: 'RTK Centimeter-Level Precision' },
      { label: 'Video Link', value: 'O3 Pro 15km 1080p 60fps' }
    ]
  },
  {
    id: 'halo-fresnel-lighting',
    name: 'Halo Ring & DMX Optical Studio Grid',
    category: 'Lighting',
    tagline: 'Overhead Volumetric Halo Rig with Bi-Color Spotlights',
    image: '/assets/equipment/equip-lighting.jpg',
    status: 'In Studio',
    specs: [
      { label: 'Color Temp', value: '2,800K - 10,000K Full RGB' },
      { label: 'CRI / TLCI', value: '98+ Broadcast Calibrated' },
      { label: 'Control', value: 'Wireless DMX & ArtNet Sync' },
      { label: 'Output', value: '3,200W Total Volumetric Flood' }
    ]
  }
];
