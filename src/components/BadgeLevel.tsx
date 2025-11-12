import React from 'react';
import { View, Text } from 'react-native';
import { colors, radii } from '../theme/tokens';

type Props = { level: 'Iniciante' | 'Intermediario' | 'Avancado' };

export const BadgeLevel: React.FC<Props> = ({ level }) => {
  const col = level === 'Iniciante' ? colors.success : level === 'Intermediario' ? colors.warning : colors.secondary;
  return (
    <View style={{ backgroundColor: col + '22', borderRadius: radii.pill, paddingVertical: 4, paddingHorizontal: 8 }}>
      <Text style={{ color: col, fontWeight: '700' }}>{level}</Text>
    </View>
  );
};

