import {
  brand,
  durations,
  fontFamily,
  fontSizes,
  fontWeights,
  gray,
  radii,
  red,
  space,
} from './tokens';

export interface Theme {
  colors: {
    bg: string;
    surface: string;
    text: string;
    textMuted: string;
    border: string;
    borderStrong: string;
    primary: string;
    primaryHover: string;
    primaryText: string;
    secondaryBg: string;
    secondaryHover: string;
    secondaryText: string;
    secondaryBorder: string;
    danger: string;
    focusRing: string;
  };
  space: typeof space;
  radii: typeof radii;
  fontSizes: typeof fontSizes;
  fontWeights: typeof fontWeights;
  fontFamily: string;
  durations: typeof durations;
}

const shared = { space, radii, fontSizes, fontWeights, fontFamily, durations };

export const lightTheme: Theme = {
  ...shared,
  colors: {
    bg: gray[0],
    surface: gray[50],
    text: gray[900],
    textMuted: gray[500],
    border: gray[200],
    borderStrong: gray[400],
    primary: brand[600],
    primaryHover: brand[700],
    primaryText: gray[0],
    secondaryBg: 'transparent',
    secondaryHover: brand[50],
    secondaryText: brand[700],
    secondaryBorder: brand[600],
    danger: red[500],
    focusRing: brand[400],
  },
};

/**
 * Dark mode inverts the brand ramp rather than reusing it: a dark green primary
 * would disappear against a dark surface.
 */
export const darkTheme: Theme = {
  ...shared,
  colors: {
    bg: gray[1000],
    surface: gray[900],
    text: gray[50],
    textMuted: gray[400],
    border: gray[700],
    borderStrong: gray[500],
    primary: brand[400],
    primaryHover: brand[300],
    primaryText: brand[900],
    secondaryBg: 'transparent',
    secondaryHover: gray[800],
    secondaryText: brand[300],
    secondaryBorder: brand[400],
    danger: red[400],
    focusRing: brand[300],
  },
};

export const themes = { light: lightTheme, dark: darkTheme };
