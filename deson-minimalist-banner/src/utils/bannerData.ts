export interface BannerContent {
  brandName: string;
  navItems: {
    searchLabel: string;
    signInLabel: string;
  };
  headlineLine1: string;
  headlineLine2: string;
  ctaLabel: string;
  featureCard: {
    kicker: string;
    titleLine1: string;
    titleLine2: string;
    description: string;
  };
}

export const BANNER_CONTENT: BannerContent = {
  brandName: 'DESON',
  navItems: {
    searchLabel: 'Search',
    signInLabel: 'Sign in',
  },
  headlineLine1: 'Design is intelligence',
  headlineLine2: 'made visible.',
  ctaLabel: 'Shop Now',
  featureCard: {
    kicker: 'FEATURES',
    titleLine1: 'Elegant',
    titleLine2: 'Simplicity',
    description:
      'Experience the perfect blend of form and function with our carefully curated selection of contemporary pieces.',
  },
};

export interface CatalogItem {
  id: string;
  name: string;
  category: string;
  dimensions: string;
  price: number;
  description: string;
}

export const CURATED_PIECES: CatalogItem[] = [
  {
    id: 'nordic-2-seater',
    name: 'Oslo Bouclé Two-Seater Sofa',
    category: 'Seating',
    dimensions: '178 × 86 × 74 cm',
    price: 2450,
    description: 'Sculpted low-profile silhouette with solid smoked oak legs and tactile oatmeal upholstery.',
  },
  {
    id: 'matte-dome-pendant',
    name: 'Atelier Matte Spun Pendant',
    category: 'Lighting',
    dimensions: 'Ø 42 × 28 cm',
    price: 580,
    description: 'Architectural spun-aluminum dome finished in carbon matte with warm diffused downward illumination.',
  },
  {
    id: 'brass-opal-lamp',
    name: 'Arc Opal Glass Floor Lamp',
    category: 'Lighting',
    dimensions: '34 × 24 × 142 cm',
    price: 790,
    description: 'Slender aged-brass stem curving into a hand-blown frosted glass sphere.',
  },
  {
    id: 'monolith-low-table',
    name: 'Monolith Circular Coffee Table',
    category: 'Tables',
    dimensions: 'Ø 85 × 36 cm',
    price: 1120,
    description: 'Charcoal stained ash tabletop resting on a minimalist powder-coated steel ring frame.',
  },
  {
    id: 'sculpted-oak-lounge',
    name: 'Kova Solid Oak Lounge Chair',
    category: 'Seating',
    dimensions: '72 × 76 × 71 cm',
    price: 1680,
    description: 'Cantilevered armrests and curved backrest crafted from sustainably harvested European oak.',
  },
];

export function filterCatalogPieces(items: CatalogItem[], query: string): CatalogItem[] {
  const normalized = query.trim().toLowerCase();
  if (!normalized) {
    return items;
  }
  return items.filter(
    (item) =>
      item.name.toLowerCase().includes(normalized) ||
      item.category.toLowerCase().includes(normalized) ||
      item.description.toLowerCase().includes(normalized)
  );
}

export interface SignInValidationResult {
  valid: boolean;
  error?: string;
}

export function validateSignInInput(email: string, password: string): SignInValidationResult {
  const trimmedEmail = email.trim();
  if (!trimmedEmail) {
    return { valid: false, error: 'Please enter your email address.' };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
    return { valid: false, error: 'Please enter a valid email address.' };
  }
  if (!password || password.trim().length < 6) {
    return { valid: false, error: 'Password must be at least 6 characters.' };
  }
  return { valid: true };
}
