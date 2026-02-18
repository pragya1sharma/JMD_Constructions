// src/theme/theme.jsx
import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    brand: {
      50: '#E8EDF6',
      100: '#D1DBED',
      200: '#A3B7DB',
      300: '#7593C9',
      400: '#476FB7',
      500: '#1B365D',
      600: '#162B4A',
      700: '#102038',
      800: '#0B1625',
      900: '#050B13',
    },

    subtle: {
      50: '#F5FAFF',
      100: '#E3F2FD',
      200: '#BBDEFB',
      300: '#90CAF9',
      400: '#64B5F6',
      500: '#2196F3',
      600: '#1E88E5',
      700: '#1976D2',
      800: '#1565C0',
      900: '#0D47A1',
    },

    orange: {
      50: '#FFEDE3',
      100: '#FFD1B8',
      200: '#FFB48D',
      300: '#FF9661',
      400: '#FF7A36',
      500: '#E65F1A',
      600: '#CC5316',
      700: '#B34712',
      800: '#993B0E',
      900: '#7F2F0A',
    },

    gray: {
      50: '#F8F9FA',
      100: '#E9ECEF',
      200: '#DEE2E6',
      300: '#CED4DA',
      400: '#ADB5BD',
      500: '#6C757D',
      600: '#495057',
      700: '#343A40',
      800: '#212529',
      900: '#121416',
    },

    success: '#27AE60',
    warning: '#F2994A',
    error: '#EB5757',
    info: '#2D9CDB',
  },

  // ✅ Fonts: Montserrat primary (headings), Roboto secondary (body)
  fonts: {
    heading: "'Montserrat', sans-serif",
    body: "'Roboto', sans-serif",
    mono: "'Roboto Mono', monospace",
  },

  fontWeights: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
    black: 900,
  },

  radii: {
    none: '0',
    sm: '4px',
    md: '6px',
    lg: '8px',
    xl: '12px',
    '2xl': '16px',
    '3xl': '24px',
    full: '9999px',
  },

  shadows: {
    xs: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    sm: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    blueprint: '0 4px 12px rgba(27, 54, 93, 0.1)',
    'subtle-glow': '0 0 0 3px rgba(227, 242, 253, 0.5)',
    'orange-focus': '0 0 0 3px rgba(242, 153, 74, 0.3)',
    elevated:
      '0 10px 30px rgba(0, 0, 0, 0.08), 0 6px 20px rgba(0, 0, 0, 0.05)',
    inset: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
  },

  styles: {
    global: {
      'html, body': {
        bg: 'gray.50',
        color: 'gray.700',
        fontFamily: "'Roboto', sans-serif",
        lineHeight: '1.6',
        scrollBehavior: 'smooth',
        fontSize: '16px',
        fontWeight: 'light',
      },

      '::selection': {
        bg: 'subtle.200',
        color: 'brand.700',
      },

      'h1, h2, h3, h4, h5, h6': {
        fontFamily: "'Montserrat', sans-serif",
        fontWeight: 'bold',
      },

      'a': {
        transition: 'color 0.2s ease',
      },

      'code, pre': {
        fontFamily: "'Roboto Mono', monospace",
        fontSize: '0.9em',
      },
    },
  },

  // ✅ Component defaults
  components: {
    Button: {
      baseStyle: {
        fontWeight: 'light',
      },
    },
    Text: {
      baseStyle: {
        fontWeight: 'light',
      },
    },
    Heading: {
      baseStyle: {
        fontWeight: 'bold',
      },
    },
  },

  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
    cssVarPrefix: 'buniyaad',
  },
});

export default theme;