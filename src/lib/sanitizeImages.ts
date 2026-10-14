/**
 * Automatically sanitizes legacy or broken Unsplash image URLs
 * to ensure all assets across the app render without 404s.
 */
export const BROKEN_IMAGE_MAP: Record<string, string> = {
  // Idaho truffle fries: old deleted unsplash photo -> new golden truffle fries
  '1576107232684-1279f3908594': '1573080496219-bb080dd4f877',
  // Beer-battered onion rings: old deleted unsplash photo -> fresh crispy beer-battered onion rings with dip
  '1639024471287-032f66ab71c0': '1630825533949-74f62f54553a',
};

export function sanitizeImageUrl(url: string | undefined | null): string {
  if (!url) return '';
  let sanitized = url;
  for (const [brokenId, replacementId] of Object.entries(BROKEN_IMAGE_MAP)) {
    if (sanitized.includes(brokenId)) {
      sanitized = sanitized.replace(brokenId, replacementId);
    }
  }
  return sanitized;
}
