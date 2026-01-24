// Cloudflare Image Resizing loader
// Uses Cloudflare's cdn-cgi/image endpoint for on-the-fly optimization
// Docs: https://developers.cloudflare.com/images/transform-images/

interface CloudflareLoaderParams {
  src: string;
  width: number;
  quality?: number;
}

// Set this env var to your Cloudflare-proxied domain for full image transformation
// e.g., NEXT_PUBLIC_CF_IMAGES_DOMAIN=https://images.yourdomain.com
const CF_IMAGES_DOMAIN = process.env.NEXT_PUBLIC_CF_IMAGES_DOMAIN;

export default function cloudflareLoader({ src, width, quality }: CloudflareLoaderParams): string {
  // Check if image is from R2 or external source
  const isR2 = src.includes('r2.dev') || src.includes('pub-');

  if (!isR2) {
    // Return original URL for non-R2 images
    return src;
  }

  // Cloudflare Image Resizing parameters
  const params = [
    `width=${width}`,
    `quality=${quality || 75}`,
    'format=auto', // Auto-selects best format (WebP/AVIF)
    'fit=scale-down', // Only scale down, never up
  ].join(',');

  // If a custom Cloudflare-proxied domain is configured, use full image transformation
  if (CF_IMAGES_DOMAIN) {
    // Cloudflare Image Resizing URL format
    return `${CF_IMAGES_DOMAIN}/cdn-cgi/image/${params}/${encodeURIComponent(src)}`;
  }

  // Fallback: return original URL (R2 will serve directly)
  // Consider setting up a custom domain with Cloudflare proxy for full optimization
  return src;
}

// Helper to generate optimized srcSet
export function generateSrcSet(src: string, widths: number[] = [640, 750, 1080, 1200, 1920]): string {
  return widths
    .map(w => `${cloudflareLoader({ src, width: w })} ${w}w`)
    .join(', ');
}
