/** Raw primitives. Components never reference these directly — only via a theme. */

export const brand = {
  50: '#eef7f0',
  100: '#d4ead9',
  200: '#a9d5b5',
  300: '#74b88a',
  400: '#479a63',
  500: '#2f7d4a',
  600: '#1f5c36',
  700: '#17492b',
  800: '#113722',
  900: '#0b2417',
} as const;

export const gray = {
  0: '#ffffff',
  50: '#f7f8f8',
  100: '#eceeef',
  200: '#dcdfe1',
  300: '#b9bfc3',
  400: '#8b9399',
  500: '#666e74',
  600: '#4a5155',
  700: '#33383b',
  800: '#212528',
  900: '#15181a',
  1000: '#0d0f10',
} as const;

export const red = {
  300: '#f0a8a2',
  400: '#e2685f',
  500: '#c8382d',
  600: '#a12a21',
} as const;

export const space = {
  none: '0',
  xs: '0.25rem',
  sm: '0.5rem',
  md: '0.75rem',
  lg: '1rem',
  xl: '1.5rem',
  '2xl': '2rem',
} as const;

export const radii = {
  sm: '0.25rem',
  md: '0.375rem',
  lg: '0.5rem',
  pill: '999px',
} as const;

export const fontSizes = {
  sm: '0.8125rem',
  md: '0.9375rem',
  lg: '1.125rem',
  xl: '1.5rem',
} as const;

export const fontWeights = {
  regular: 400,
  medium: 500,
  semibold: 600,
} as const;

export const fontFamily =
  "system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";

export const durations = {
  fast: '120ms',
  base: '200ms',
} as const;
