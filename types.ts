export interface CardState {
  occasion: string;
  recipient: string;
  tone: string;
  message: string;
  textColor: string;
  fontStyle: 'serif' | 'sans';
  backgroundImage: string | null;
}

export interface LoadingState {
  suggestions: boolean;
  message: boolean;
  image: boolean;
  saving: boolean;
}

export const TONES = [
  'Heartfelt',
  'Playful',
  'Cheerful',
  'Formal',
  'Uplifting',
  'Grateful',
];

export const COLORS = [
  { name: 'Charcoal', value: '#0f172a' },
  { name: 'White', value: '#ffffff' },
  { name: 'Sunrise', value: '#fcd34d' },
  { name: 'Coral', value: '#fb7185' },
  { name: 'Mint', value: '#22c55e' },
  { name: 'Sky', value: '#38bdf8' },
];

export const FONTS = [
  { name: 'Sans', value: 'sans' },
  { name: 'Serif', value: 'serif' },
];

export const PRESET_BACKGROUNDS = [
  { name: 'Sunset Bloom', url: 'https://images.unsplash.com/photo-1470229538611-16ba8c7ffbd7?auto=format&fit=crop&w=800&q=80' },
  { name: 'Cotton Skies', url: 'https://images.unsplash.com/photo-1508261306217-7e755f60c0b5?auto=format&fit=crop&w=800&q=80' },
  { name: 'Festive Lights', url: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=800&q=80' },
  { name: 'Color Bloom', url: 'https://images.unsplash.com/photo-1499084732479-de2c02d45fc4?auto=format&fit=crop&w=800&q=80' },
  { name: 'Forest Glow', url: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=80' },
  { name: 'Ocean Dream', url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80' },
];

