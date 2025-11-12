import React from 'react';
import { View, type ViewProps, useColorScheme } from 'react-native';
import { colors } from '../theme/tokens';

export const ThemedView = ({ style, ...rest }: ViewProps) => {
  const scheme = useColorScheme();
  const backgroundColor = scheme === 'dark' ? colors.darkBg : colors.lightBg;
  return <View accessibilityRole="summary" style={[{ backgroundColor }, style]} {...rest} />;
};

