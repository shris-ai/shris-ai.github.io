// Color palette for tags - soft, pastel colors
const TAG_COLORS = [
  { bg: '#fef3c7', text: '#92400e', hover: '#fde68a' }, // Pastel Yellow
  { bg: '#fed7aa', text: '#9a3412', hover: '#fdba74' }, // Pastel Orange
  { bg: '#fce7f3', text: '#9f1239', hover: '#fbcfe8' }, // Pastel Pink
  { bg: '#d1fae5', text: '#065f46', hover: '#a7f3d0' }, // Pastel Green
  { bg: '#dbeafe', text: '#1e40af', hover: '#bfdbfe' }, // Pastel Blue
  { bg: '#e9d5ff', text: '#6b21a8', hover: '#d8b4fe' }, // Pastel Purple
  { bg: '#cffafe', text: '#0e7490', hover: '#a5f3fc' }, // Pastel Cyan
  { bg: '#fecdd3', text: '#991b1b', hover: '#fda4af' }, // Pastel Red
  { bg: '#fde2e4', text: '#7f1d1d', hover: '#fbc2c7' }, // Pastel Rose
  { bg: '#ccfbf1', text: '#134e4a', hover: '#99f6e4' }, // Pastel Teal
  { bg: '#e0f2fe', text: '#0c4a6e', hover: '#bae6fd' }, // Pastel Sky Blue
  { bg: '#f3e8ff', text: '#7c2d12', hover: '#e9d5ff' }, // Pastel Lavender
  { bg: '#fef9c3', text: '#854d0e', hover: '#fef08a' }, // Pastel Lemon
  { bg: '#dcfce7', text: '#166534', hover: '#bbf7d0' }, // Pastel Mint
  { bg: '#f5d0fe', text: '#86198f', hover: '#f0abfc' }, // Pastel Fuchsia
  { bg: '#e0e7ff', text: '#3730a3', hover: '#c7d2fe' }, // Pastel Indigo
  { bg: '#d8f4e8', text: '#14532d', hover: '#bbf7d0' }, // Pastel Emerald
  { bg: '#f0f9ff', text: '#0c4a6e', hover: '#e0f2fe' }, // Pastel Light Blue
  { bg: '#fdf2f8', text: '#831843', hover: '#fce7f3' }, // Pastel Blush
  { bg: '#fff7ed', text: '#9a3412', hover: '#ffedd5' }, // Pastel Peach
];

/**
 * Get a consistent color for a tag based on its name
 * Uses a simple hash function to ensure the same tag always gets the same color
 */
export function getTagColor(tag: string): { bg: string; text: string; hover: string } {
  // Simple hash function to convert tag name to a number
  let hash = 0;
  const normalizedTag = tag.toLowerCase().trim();
  for (let i = 0; i < normalizedTag.length; i++) {
    hash = ((hash << 5) - hash) + normalizedTag.charCodeAt(i);
    hash = hash & hash; // Convert to 32-bit integer
  }
  
  // Get index from hash (ensure positive)
  const index = Math.abs(hash) % TAG_COLORS.length;
  return TAG_COLORS[index];
}

/**
 * Get CSS custom properties string for a tag
 */
export function getTagColorCSS(tag: string): string {
  const colors = getTagColor(tag);
  return `--tag-bg: ${colors.bg}; --tag-text: ${colors.text}; --tag-hover: ${colors.hover};`;
}
