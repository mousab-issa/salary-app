import type { Theme } from '@react-navigation/native';
import { PixelRatio } from 'react-native';

import { colors } from './colors';

export type CustomTheme = Theme;

export const DarkTheme: CustomTheme = {
  colors: {
    background: '#333',
    border: '#333',
    card: '#222',
    notification: '#ff2d55',
    primary: '#ff2d55',
    text: '#f0f0f0',
  },
  dark: true,
};

export const LightTheme: CustomTheme = {
  colors: {
    background: '#f8f8f8',
    border: '#e6e6e6',
    card: '#fff',
    notification: '#ff2d55',
    primary: '#ff2d55',
    text: colors.text,
  },
  dark: false,
};

export const themeColors = (dark: boolean) => {
  if (dark) {
    return DarkTheme;
  }
  return LightTheme;
};

export const rPx = (px: number) => PixelRatio.roundToNearestPixel(px);
