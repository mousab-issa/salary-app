type opacity = 0.1 | 0.2 | 0.3 | 0.4 | 0.5 | 0.6 | 0.7 | 0.8 | 0.9 | 1;

const palette = {
  neutral100: '#FFFFFF',
  neutral200: '#F4F2F1',
  neutral300: '#D7CEC9',
  neutral400: '#B6ACA6',
  neutral500: '#978F8A',
  neutral600: '#564E4A',
  neutral700: '#3C3836',
  neutral800: '#191015',
  neutral900: '#000000',

  primary100: '#F4E0D9',
  primary200: '#E8C1B4',
  primary300: '#DDA28E',
  primary400: '#D28468',
  primary500: '#C76542',
  primary600: '#A54F31',

  secondary100: '#DCDDE9',
  secondary200: '#BCC0D6',
  secondary300: '#9196B9',
  secondary400: '#626894',
  secondary500: '#41476E',

  accent100: '#FFEED4',
  accent200: '#FFE1B2',
  accent300: '#FDD495',
  accent400: '#FBC878',
  accent500: '#FFBB50',

  angry100: '#F2D6CD',
  angry500: '#C03403',

  blush: '#DCCACA',
  taupe: '#AF9E9E',
  lightTaupe: '#EBE7E7',
  sand: '#E6E2DF',

  overlay20: 'rgba(25, 16, 21, 0.2)',
  overlay50: 'rgba(25, 16, 21, 0.5)',

  transparent: 'rgba(0,0,0,0)',

  midnightBlue: '#555D6B',
  grey700: '#323742',
  grey600: '#464C59',
  grey550: '#575D68',
  grey400: '#8D919A',
  grey200: '#D4D6DB',
  grey50: '#EEF0F2',
  grey25: '#F9F9FA',

  red500: '#D5493B',

  W: (opacity: opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  G1: (opacity: opacity = 1) => `rgba(245, 247, 250, ${opacity})`,
  G2: (opacity: opacity = 1) => `rgba(230, 230, 230, ${opacity})`,
  G3: (opacity: opacity = 1) => `rgba(170, 170, 170, ${opacity})`,
  G4: (opacity: opacity = 1) => `rgba(157, 159, 163, ${opacity})`,
  G5: (opacity: opacity = 1) => `rgba(96, 96, 96, ${opacity})`,
  G6: (opacity: opacity = 1) => `rgba(39, 41, 46, ${opacity})`,
  G7: (opacity: opacity = 1) => `rgba(44, 45, 47, ${opacity})`,
  G8: (opacity: opacity = 1) => `rgba(24, 24, 24, ${opacity})`,
  G9: (opacity: opacity = 1) => `rgba(3, 3, 3, ${opacity})`,
  B: (opacity: opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
} as const;

export const colors = {
  main: (opacity: opacity = 1) => `rgba(61, 219, 209, ${opacity})`,
  activeMain: (opacity: opacity = 1) => `rgba(41, 142, 136, ${opacity})`,
  danger: (opacity: opacity = 1) => `rgba(255, 61, 74, ${opacity})`,
  warning: (opacity: opacity = 1) => `rgba(255, 187, 0, ${opacity})`,
  info: (opacity: opacity = 1) => `rgba(0, 99, 247, ${opacity})`,
  success: (opacity: opacity = 1) => `rgba(1, 208, 134, ${opacity})`,

  palette,
  transparent: 'rgba(0, 0, 0, 0)',
  text: palette.grey700,
  textDim: palette.neutral600,
  textLight: palette.grey550,
  background: palette.neutral200,
  border: palette.neutral400,
  tint: palette.primary500,
  separator: palette.neutral300,
  error: palette.angry500,
  errorBackground: palette.angry100,
};
