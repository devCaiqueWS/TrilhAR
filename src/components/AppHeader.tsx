import React from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import { colors } from '../theme/tokens';

type AppHeaderProps = {
  title?: string;
  onAvatarPress?: () => void;
};

export const AppHeader: React.FC<AppHeaderProps> = ({ title, onAvatarPress }) => {
  return (
    <View
      style={{ paddingHorizontal: 16, paddingVertical: 12, flexDirection: 'row', alignItems: 'center', gap: 12 }}
      accessibilityRole="header"
    >
      <Image source={require('../../assets/logo.png')} style={{ width: 28, height: 28, borderRadius: 6 }} />
      <Text style={{ fontWeight: '700', fontSize: 18, color: colors.textLight, flex: 1 }}>{title ?? 'TrilhAR'}</Text>
      <Pressable onPress={onAvatarPress} accessibilityRole="imagebutton" accessibilityLabel="Perfil">
        <Image source={require('../../assets/icon.png')} style={{ width: 28, height: 28, borderRadius: 14 }} />
      </Pressable>
    </View>
  );
};

