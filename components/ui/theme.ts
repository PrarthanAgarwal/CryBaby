import { Platform } from 'react-native'

export const theme = {
  colors: {
    primary: {
      50: '#eff6ff',
      100: '#dbeafe',
      200: '#bfdbfe',
      300: '#93c5fd',
      400: '#60a5fa',
      500: '#3b82f6',
      600: '#2563eb',
      700: '#1d4ed8',
      800: '#1e40af',
      900: '#1e3a8a',
    },
    secondary: {
      50: '#f8fafc',
      100: '#f1f5f9',
      200: '#e2e8f0',
      300: '#cbd5e1',
      400: '#94a3b8',
      500: '#64748b',
      600: '#475569',
      700: '#334155',
      800: '#1e293b',
      900: '#0f172a',
    },
    accent: {
      purple: '#8b5cf6',
      pink: '#ec4899',
      orange: '#f97316',
      teal: '#14b8a6',
    },
    semantic: {
      success: '#22c55e',
      warning: '#f59e0b',
      error: '#ef4444',
      info: '#3b82f6',
    },
    background: {
      primary: '#ffffff',
      secondary: '#f8fafc',
      tertiary: '#f1f5f9',
      dark: '#0f172a',
    },
    text: {
      primary: '#1e293b',
      secondary: '#475569',
      tertiary: '#64748b',
      inverse: '#f8fafc',
    },
  },
  gradients: {
    primary: ['#3b82f6', '#1d4ed8'],
    secondary: ['#8b5cf6', '#6366f1'],
    accent: ['#ec4899', '#8b5cf6'],
    success: ['#22c55e', '#15803d'],
    warning: ['#f59e0b', '#d97706'],
    error: ['#ef4444', '#dc2626'],
  },
  spacing: {
    '2xs': 2,
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    '2xl': 48,
    '3xl': 64,
  },
  borderRadius: {
    none: 0,
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    '2xl': 24,
    full: 9999,
  },
  typography: {
    fonts: {
      regular: Platform.select({
        ios: 'Inter_400Regular',
        android: 'Inter_400Regular',
        default: 'Inter_400Regular',
      }),
      medium: Platform.select({
        ios: 'Inter_500Medium',
        android: 'Inter_500Medium',
        default: 'Inter_500Medium',
      }),
      semibold: Platform.select({
        ios: 'Inter_600SemiBold',
        android: 'Inter_600SemiBold',
        default: 'Inter_600SemiBold',
      }),
      bold: Platform.select({
        ios: 'Inter_700Bold',
        android: 'Inter_700Bold',
        default: 'Inter_700Bold',
      }),
    },
    fontSize: {
      xs: 10,
      sm: 12,
      base: 14,
      lg: 16,
      xl: 18,
      '2xl': 24,
      '3xl': 30,
    },
    fontWeight: {
      regular: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    },
    lineHeight: {
      none: 1,
      tight: 1.25,
      snug: 1.375,
      normal: 1.5,
      relaxed: 1.625,
      loose: 2,
    },
  },
  shadows: {
    sm: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 1,
    },
    md: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    lg: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 6,
      elevation: 5,
    },
    xl: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.2,
      shadowRadius: 12,
      elevation: 8,
    },
  },
  animation: {
    duration: {
      fast: 150,
      normal: 250,
      slow: 350,
    },
    easing: {
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    },
  },
  glassmorphism: {
    light: {
      backgroundColor: 'rgba(255, 255, 255, 0.7)',
      backdropFilter: 'blur(8px)',
    },
    dark: {
      backgroundColor: 'rgba(15, 23, 42, 0.7)',
      backdropFilter: 'blur(8px)',
    },
  },
} as const

export type Theme = typeof theme 