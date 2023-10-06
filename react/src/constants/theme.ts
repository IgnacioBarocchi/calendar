export const desktopGeneric = {
  padding: {
    aside: '1rem',
  },
  size: {
    headerHeight: '20vh',
    timeCellWidth: '4vw',
    asideWidth: '16vw',
    circleRadius: '2.5rem',
    text: {
      l: '1.5rem',
      m: '1rem',
      s: '0.75rem',
    },
  },
};

const theme = {
  dark: {
    palette: {
      foreground: {
        primary: '#ffffe3',
        secondary: '#71717a',
        tertiary: '#E3E3FF',
      },
      background: {
        primary: 'black',
        secondary: '#333333',
      },
      brand: '#496DDB',
      // brandVariant: '#E899DC',
      brandVariant: '#679436',
    },
    ...desktopGeneric,
  },
  light: {
    palette: {
      foreground: {
        primary: 'black',
        secondary: '#71717a',
        tertiary: '#52525b',
      },
      background: {
        primary: '#ffffff',
        secondary: '#f5f5f5',
      },
      brand: '#2563eb',
    },
    ...desktopGeneric,
  },
};

export default theme;
//'#52525b',
// theme.fontSize}px
// theme.lineHeight}px
// theme.palettepalette.background}
// theme.palettepalette.foreground}
