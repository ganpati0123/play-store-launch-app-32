// PayX Ultra Pro - Premium Theme Constants
// Glassmorphism + Neumorphism + Gradient Design System

import { Dimensions } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Color Palette - Light Mode
export const colorsLight = {
  // Primary Brand Colors
  primary: '#6C5CE7',
  primaryLight: '#A29BFE',
  primaryDark: '#5541D7',
  secondary: '#00CEC9',
  secondaryLight: '#81ECEC',
  accent: '#FD79A8',
  accentLight: '#FDA7DF',
  
  // Background Colors
  background: '#F8F9FA',
  surface: '#FFFFFF',
  surfaceElevated: '#FFFFFF',
  card: '#FFFFFF',
  cardDark: '#F1F3F5',
  
  // Text Colors
  text: '#2D3436',
  textSecondary: '#636E72',
  textTertiary: '#B2BEC3',
  textInverse: '#FFFFFF',
  
  // Status Colors
  success: '#00B894',
  successLight: '#55EFC4',
  warning: '#FDCB6E',
  warningLight: '#FFEAA7',
  error: '#E84393',
  errorLight: '#FD79A8',
  info: '#74B9FF',
  infoLight: '#A29BFE',
  
  // Gradient Presets
  gradientPrimary: ['#6C5CE7', '#A29BFE'],
  gradientSecondary: ['#00CEC9', '#81ECEC'],
  gradientAccent: ['#FD79A8', '#FDA7DF'],
  gradientPremium: ['#6C5CE7', '#00CEC9', '#FD79A8'],
  gradientDark: ['#2D3436', '#636E72'],
  gradientSuccess: ['#00B894', '#55EFC4'],
  
  // Glassmorphism Colors
  glassBackground: 'rgba(255, 255, 255, 0.7)',
  glassBorder: 'rgba(255, 255, 255, 0.5)',
  glassShadow: 'rgba(0, 0, 0, 0.1)',
  
  // Neumorphism Colors
  neumorphLight: '#E8ECEF',
  neumorphShadow: '#C8CCD0',
  neumorphHighlight: '#FFFFFF',
  
  // Border & Divider
  border: '#DFE6E9',
  divider: '#E8ECEF',
  
  // Overlay
  overlay: 'rgba(0, 0, 0, 0.5)',
  overlayLight: 'rgba(0, 0, 0, 0.3)',
};

// Color Palette - Dark Mode
export const colorsDark = {
  // Primary Brand Colors (slightly brighter for dark mode)
  primary: '#A29BFE',
  primaryLight: '#6C5CE7',
  primaryDark: '#5541D7',
  secondary: '#81ECEC',
  secondaryLight: '#00CEC9',
  accent: '#FDA7DF',
  accentLight: '#FD79A8',
  
  // Background Colors
  background: '#0D1117',
  surface: '#161B22',
  surfaceElevated: '#21262D',
  card: '#161B22',
  cardDark: '#0D1117',
  
  // Text Colors
  text: '#F8F9FA',
  textSecondary: '#B2BEC3',
  textTertiary: '#636E72',
  textInverse: '#0D1117',
  
  // Status Colors
  success: '#55EFC4',
  successLight: '#00B894',
  warning: '#FFEAA7',
  warningLight: '#FDCB6E',
  error: '#FD79A8',
  errorLight: '#E84393',
  info: '#A29BFE',
  infoLight: '#74B9FF',
  
  // Gradient Presets (adjusted for dark mode)
  gradientPrimary: ['#A29BFE', '#6C5CE7'],
  gradientSecondary: ['#81ECEC', '#00CEC9'],
  gradientAccent: ['#FDA7DF', '#FD79A8'],
  gradientPremium: ['#A29BFE', '#81ECEC', '#FDA7DF'],
  gradientDark: ['#21262D', '#161B22'],
  gradientSuccess: ['#55EFC4', '#00B894'],
  
  // Glassmorphism Colors (darker variants)
  glassBackground: 'rgba(22, 27, 34, 0.8)',
  glassBorder: 'rgba(255, 255, 255, 0.1)',
  glassShadow: 'rgba(0, 0, 0, 0.3)',
  
  // Neumorphism Colors (darker variants)
  neumorphLight: '#21262D',
  neumorphShadow: '#0D1117',
  neumorphHighlight: '#30363D',
  
  // Border & Divider
  border: '#30363D',
  divider: '#21262D',
  
  // Overlay
  overlay: 'rgba(0, 0, 0, 0.7)',
  overlayLight: 'rgba(0, 0, 0, 0.5)',
};

// Spacing System
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

// Border Radius
export const borderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  full: 9999,
};

// Font Sizes
export const fontSize = {
  xs: 10,
  sm: 12,
  md: 14,
  lg: 16,
  xl: 18,
  xxl: 24,
  xxxl: 32,
  display: 40,
};

// Font Weights
export const fontWeight = {
  regular: '400' as const,
  medium: '500' as const,
  semibold: '600' as const,
  bold: '700' as const,
};

// Shadows
export const shadows = {
  small: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  large: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
  glow: (color: string) => ({
    shadowColor: color,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 10,
  }),
};

// Animation Durations
export const animation = {
  fast: 150,
  normal: 300,
  slow: 500,
  spring: {
    damping: 15,
    stiffness: 150,
    mass: 1,
  },
};

// Layout Constants
export const layout = {
  screenWidth: SCREEN_WIDTH,
  screenHeight: SCREEN_HEIGHT,
  headerHeight: 60,
  bottomTabHeight: 80,
  cardPadding: 16,
  screenPadding: 20,
};

// Get Colors based on theme mode
export const getColors = (isDark: boolean) => isDark ? colorsDark : colorsLight;

// Animation Config
export const animationConfig = {
  spring: {
    damping: 15,
    stiffness: 150,
    mass: 0.5,
    overshootClamping: false,
    restSpeedThreshold: 0.01,
    restDisplacementThreshold: 0.01,
  },
  timing: {
    duration: 300,
  },
};

// Glassmorphism Style Generator
export const getGlassStyle = (isDark: boolean) => ({
  backgroundColor: isDark ? colorsDark.glassBackground : colorsLight.glassBackground,
  borderWidth: 1,
  borderColor: isDark ? colorsDark.glassBorder : colorsLight.glassBorder,
  borderRadius: borderRadius.lg,
  backdropFilter: 'blur(10px)',
});

// Neumorphism Style Generator
export const getNeumorphStyle = (isDark: boolean, pressed: boolean = false) => {
  if (pressed) {
    return {
      backgroundColor: isDark ? colorsDark.neumorphShadow : colorsLight.neumorphShadow,
      shadowOffset: { width: -2, height: -2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    };
  }
  return {
    backgroundColor: isDark ? colorsDark.neumorphHighlight : colorsLight.neumorphHighlight,
    shadowColor: isDark ? colorsDark.neumorphShadow : colorsLight.neumorphShadow,
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  };
};

// Scale Animation Config
export const scaleAnimation = {
  pressed: 0.95,
  default: 1,
};

// Haptic Feedback Types
export const hapticFeedback = {
  selection: 'selection' as const,
  impactLight: 'impactLight' as const,
  impactMedium: 'impactMedium' as const,
  impactHeavy: 'impactHeavy' as const,
  notificationSuccess: 'notificationSuccess' as const,
  notificationWarning: 'notificationWarning' as const,
  notificationError: 'notificationError' as const,
};

export type ColorPalette = typeof colorsLight;
export type Spacing = typeof spacing;
export type BorderRadius = typeof borderRadius;
export type FontSize = typeof fontSize;
export type FontWeight = typeof fontWeight;
export type Shadows = typeof shadows;