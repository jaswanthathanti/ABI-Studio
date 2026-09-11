/**
 * Returns the correct absolute URL for static assets respecting Vite's base URL.
 * Ensures assets load properly both on localhost ('/') and GitHub Pages ('/ABI-Studio/').
 */
export const getAssetUrl = (path: string): string => {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) {
    return path;
  }
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  const baseUrl = import.meta.env.BASE_URL || '/';
  return `${baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`}${cleanPath}`;
};
