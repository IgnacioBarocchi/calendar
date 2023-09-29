const desktopGeneric = {
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
        primary: '#030712',
        secondary: '#333333',
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
