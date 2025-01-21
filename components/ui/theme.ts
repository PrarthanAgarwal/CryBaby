export const theme = {
  colors: {
    primary: {
      light: '#bfdbfe',
      DEFAULT: '#3b82f6',
      dark: '#1d4ed8',
    },
    background: {
      light: '#fdfbf1',
      DEFAULT: '#ffffff',
      dark: '#1f2937',
    },
    text: {
      primary: '#1f2937',
      secondary: '#6b7280',
      disabled: '#9ca3af',
    },
    border: {
      light: '#e2e8f0',
      DEFAULT: '#d1d5db',
      dark: '#6b7280',
    },
    success: {
      light: '#86efac',
      DEFAULT: '#22c55e',
      dark: '#15803d',
    },
    warning: {
      light: '#fde047',
      DEFAULT: '#eab308',
      dark: '#a16207',
    },
    error: {
      light: '#fca5a5',
      DEFAULT: '#ef4444',
      dark: '#b91c1c',
    },
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    '2xl': 48,
  },
  borderRadius: {
    sm: 4,
    DEFAULT: 8,
    md: 12,
    lg: 16,
    full: 9999,
  },
  typography: {
    fontSize: {
      xs: 12,
      sm: 14,
      base: 16,
      lg: 18,
      xl: 20,
      '2xl': 24,
      '3xl': 30,
    },
    fontWeight: {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    },
  },
  // Add shadow utilities
  shadows: {
    sm: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 1,
    },
    DEFAULT: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    lg: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.15,
      shadowRadius: 6,
      elevation: 5,
    },
  },
} as const

export type Theme = typeof theme 