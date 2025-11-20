// src/styles/theme.js
// Centralized theme + spacing + small 'square' radii for material-like look.

const THEME = {
  colors: {
    primary: '#53629E',      // main brand color
    background: '#F6F6FF',   // app background
    card: '#FFFFFF',         // card / surface bg
    accent: '#8F96C8',       // lighter accent
    text: '#222222',
    muted: '#7A7A7A',
    danger: '#E53935',
    success: '#2E7D32'
  },
  spacing: {
    xs: 6,
    sm: 12,
    md: 16,
    lg: 24,
    xl: 32
  },
  // make corners small/square-like: use low radius (material-ish)
  radius: {
    sm: 4,
    md: 4,
    lg: 6
  },
  sizes: {
    inputHeight: 48,
    icon: 20,
    avatar: 64
  },
  // subtle shadow for elevated squares
  shadow: {
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4
  }
};

export default THEME;
