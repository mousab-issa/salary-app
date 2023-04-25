import React, { FC } from 'react';
import { TextStyle, View, ViewStyle } from 'react-native';

import { colors } from '@theme/colors';
import { spacing } from '@theme/spacing';

import { Text } from './Text';

export const TextDivider: FC<{ text: string }> = ({ text }) => {
  return (
    <View style={$divider}>
      <View style={$line} />
      <Text style={$dividerText} preset={'bold'} weight={'light'} size={'sm'}>
        {text}
      </Text>
      <View style={$line} />
    </View>
  );
};

const $divider: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  marginVertical: spacing.large,
};

const $line: ViewStyle = {
  height: 1,
  flex: 1,
  backgroundColor: colors.palette.neutral400,
  marginHorizontal: spacing.small,
};

const $dividerText: TextStyle = {
  color: colors.palette.neutral700,
  fontSize: 16,
  fontWeight: 'bold',
};

const $authProviders: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'center',
  marginBottom: spacing.large,
};
