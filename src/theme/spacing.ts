import { rPx } from './theme';

/**
  Use these spacings for margins/paddings and other whitespace throughout your app.
 */
export const spacing = {
  micro: rPx(2),
  tiny: rPx(4),
  extraSmall: rPx(8),
  small: rPx(12),
  medium: rPx(16),
  large: rPx(24),
  extraLarge: rPx(32),
  huge: rPx(48),
  massive: rPx(64),
} as const;

export type Spacing = keyof typeof spacing;
