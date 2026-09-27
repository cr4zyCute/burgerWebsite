export interface LogoPreset {
  id: string;
  name: string;
  description: string;
  dataUrl: string;
}

const svgToDataUrl = (svg: string) => `data:image/svg+xml;utf8,${encodeURIComponent(svg.trim())}`;

export const LOGO_PRESETS: LogoPreset[] = [
  {
    id: 'classic-grill',
    name: 'Artisan Grill Master',
    description: 'Crisp hand-crafted burger with sesame bun, melting cheddar, and grill marks.',
    dataUrl: svgToDataUrl(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="120" height="120">
        <rect width="120" height="120" rx="16" fill="#171717"/>
        <path d="M26 50 C26 30, 94 30, 94 50 Z" fill="#E9B949"/>
        <circle cx="48" cy="39" r="2" fill="#FAF8F3" opacity="0.9"/>
        <circle cx="60" cy="35" r="2" fill="#FAF8F3" opacity="0.9"/>
        <circle cx="72" cy="40" r="2" fill="#FAF8F3" opacity="0.9"/>
        <path d="M22 53 Q34 50 46 54 T70 52 T98 54 L98 59 Q70 63 46 59 T22 61 Z" fill="#48BB78"/>
        <rect x="22" y="60" width="76" height="14" rx="7" fill="#6B2D1B"/>
        <path d="M30 63 L45 71 M50 63 L65 71 M70 63 L85 71" stroke="#3D1A10" stroke-width="2.5" stroke-linecap="round"/>
        <polygon points="35,66 48,78 62,66" fill="#ECC94B"/>
        <path d="M26 77 C26 89, 94 89, 94 77 Z" fill="#D69E2E"/>
        <circle cx="60" cy="18" r="4" fill="#A82D24"/>
      </svg>
    `),
  },
  {
    id: 'flame-stamp',
    name: 'Red Firehouse Emblem',
    description: 'Bold circular heritage stamp with roaring flame and rustic typography style.',
    dataUrl: svgToDataUrl(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="120" height="120">
        <circle cx="60" cy="60" r="56" fill="#A82D24" stroke="#FAF8F3" stroke-width="4"/>
        <circle cx="60" cy="60" r="48" fill="none" stroke="#FAF8F3" stroke-width="2" stroke-dasharray="4 3"/>
        <path d="M60 22 C64 36, 76 42, 70 54 C80 44, 82 58, 76 72 C70 86, 50 86, 44 72 C38 58, 52 46, 50 36 C56 46, 54 26, 60 22 Z" fill="#E9B949"/>
        <path d="M60 48 C62 56, 70 60, 66 68 C62 76, 54 76, 52 68 C50 62, 58 54, 60 48 Z" fill="#FAF8F3"/>
        <text x="60" y="100" text-anchor="middle" fill="#FAF8F3" font-family="system-ui, sans-serif" font-weight="900" font-size="11" letter-spacing="2">SMASH &amp; CO</text>
      </svg>
    `),
  },
  {
    id: 'golden-crown',
    name: 'Royal Burger Bistro',
    description: 'Gourmet gold crown icon with sleek crossed utensils and luxury black badge.',
    dataUrl: svgToDataUrl(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="120" height="120">
        <rect width="120" height="120" rx="24" fill="#0F0F0F" stroke="#E9B949" stroke-width="3"/>
        <polygon points="30,44 42,28 60,40 78,28 90,44 82,54 38,54" fill="#E9B949"/>
        <circle cx="42" cy="26" r="3" fill="#FAF8F3"/>
        <circle cx="60" cy="38" r="3" fill="#FAF8F3"/>
        <circle cx="78" cy="26" r="3" fill="#FAF8F3"/>
        <!-- Burger outline -->
        <path d="M34 64 Q60 52 86 64 Z" fill="#FAF8F3"/>
        <rect x="30" y="68" width="60" height="8" rx="4" fill="#E9B949"/>
        <rect x="28" y="80" width="64" height="7" rx="3.5" fill="#A82D24"/>
        <path d="M34 91 Q60 99 86 91 Z" fill="#FAF8F3"/>
      </svg>
    `),
  },
  {
    id: 'neon-diner',
    name: 'Retro 1950s Neon',
    description: 'Electric diner vibe with vibrant turquoise and hot yellow neon glow.',
    dataUrl: svgToDataUrl(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="120" height="120">
        <rect width="120" height="120" fill="#111827"/>
        <path d="M24 50 C24 28, 96 28, 96 50 Z" fill="none" stroke="#F59E0B" stroke-width="6" stroke-linecap="round"/>
        <path d="M20 62 L100 62" stroke="#10B981" stroke-width="5" stroke-linecap="round"/>
        <path d="M26 74 L94 74" stroke="#EF4444" stroke-width="7" stroke-linecap="round"/>
        <path d="M28 86 C36 102, 84 102, 92 86 Z" fill="none" stroke="#F59E0B" stroke-width="6" stroke-linecap="round"/>
        <circle cx="34" cy="40" r="2.5" fill="#FCD34D"/>
        <circle cx="60" cy="33" r="2.5" fill="#FCD34D"/>
        <circle cx="86" cy="40" r="2.5" fill="#FCD34D"/>
      </svg>
    `),
  },
  {
    id: 'heritage-stamp',
    name: 'Vintage Butcher & Grill',
    description: 'Monochromatic rustic badge with crossed cleaver & spatula and year seal.',
    dataUrl: svgToDataUrl(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="120" height="120">
        <rect width="120" height="120" fill="#262626"/>
        <rect x="8" y="8" width="104" height="104" fill="none" stroke="#E9B949" stroke-width="2"/>
        <rect x="13" y="13" width="94" height="94" fill="none" stroke="#FAF8F3" stroke-width="1" stroke-dasharray="2 2"/>
        <!-- Crossed Spatulas -->
        <g stroke="#FAF8F3" stroke-width="3" stroke-linecap="round">
          <line x1="32" y1="32" x2="88" y2="88"/>
          <line x1="88" y1="32" x2="32" y2="88"/>
        </g>
        <circle cx="60" cy="60" r="18" fill="#A82D24" stroke="#E9B949" stroke-width="2"/>
        <path d="M50 56 Q60 48 70 56 L70 64 Q60 68 50 64 Z" fill="#FAF8F3"/>
        <text x="60" y="100" text-anchor="middle" fill="#E9B949" font-family="Georgia, serif" font-weight="bold" font-size="10" letter-spacing="1">PRIME CRAFT</text>
      </svg>
    `),
  },
];
