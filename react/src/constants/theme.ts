export const Fonts = {
  SupremeBold: 'Supreme-Bold',
  SupremeBoldItalic: 'Supreme-BoldItalic',
  SupremeExtrabold: 'Supreme-Extrabold',
  SupremeExtraboldItalic: 'Supreme-ExtraboldItalic',
  TechnorBlack: 'Technor-Black',
  TechnorBold: 'Technor-Bold',
} as const;

type Keys = keyof typeof Fonts;
export type FontValues = (typeof Fonts)[Keys];

export const desktopGeneric = {
  padding: {
    aside: '1rem',
  },
  size: {
    todayButtonWidth: '8rem',
    todayButtonHeight: '2.5rem',
    headerHeight: '20vh',
    timeCellWidth: '4vw',
    asideWidth: '16vw',
    circleRadius: '2.5rem',
    modalHeight: '20vh',
    modalWidth: '35vw',

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
        tertiary: '#30302b',
      },
      background: {
        primary: 'black',
        secondary: '#333333',
      },
      brand: '#496DDB',
      brandVariant: '#E899DC',
    },
    ...desktopGeneric,
  },
  light: {
    palette: {
      foreground: {
        primary: '#000000',
        secondary: '#71717a',
        tertiary: '#e8e8cf',
      },
      background: {
        primary: '#ffffe3',
        secondary: '#f5f5f5',
      },
      brand: '#496DDB',
      brandVariant: '#E899DC',
    },
    ...desktopGeneric,
  },
};

export default theme;
// brandVariant: '#E899DC',
