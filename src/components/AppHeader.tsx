import React from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import { colors } from '../theme/tokens';
import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';

type AppHeaderProps = {
  title?: string;
  onAvatarPress?: () => void;
  onBack?: () => void;
};

export const AppHeader: React.FC<AppHeaderProps> = ({ title, onAvatarPress, onBack }) => {
  return (
    <View
      style={{ paddingHorizontal: 16, paddingVertical: 12, flexDirection: 'row', alignItems: 'center', gap: 12 }}
      accessibilityRole="header"
    >
      {onBack ? (
        <Pressable onPress={onBack} accessibilityRole="button" accessibilityLabel="Voltar" hitSlop={8}>
          <Ionicons name="chevron-back" size={22} color={colors.textLight} />
        </Pressable>
      ) : (
        <Image source={require('../../assets/icon.png')} style={{ width: 30, height: 30, borderRadius: 4 }} />
      )}
      <Text style={{ fontWeight: '700', fontSize: 18, color: colors.textLight, flex: 1 }}>{title ?? 'TrilhAR'}</Text>
      <Pressable onPress={onAvatarPress} accessibilityRole="imagebutton" accessibilityLabel="Perfil">
        <Feather name="user" size={24} color={colors.textLight} />
      </Pressable>
    </View>
  );
};
