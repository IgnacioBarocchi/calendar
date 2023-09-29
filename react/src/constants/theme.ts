const desktopGeneric = {
  padding: {
    aside: '1rem',
  },
  size: {
    headerHeight: '20vh',
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
        primary: '#ffffff',
        secondary: '#71717a',
        tertiary: '#52525b',
      },
      background: {
        primary: 'black',
        secondary: '#333333',
      },
      brand: '#2563eb',
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
// theme.fontSize}px
// theme.lineHeight}px
// theme.palettepalette.background}
// theme.palettepalette.foreground}
