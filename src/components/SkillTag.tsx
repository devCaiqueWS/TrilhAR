import React from 'react';
import { Text, View } from 'react-native';
import { radii, colors } from '../theme/tokens';

type Props = { label: string; selected?: boolean };

export const SkillTag: React.FC<Props> = ({ label, selected }) => (
  <View
    accessibilityRole="text"
    style={{
      paddingVertical: 6,
      paddingHorizontal: 10,
      backgroundColor: selected ? colors.primary : '#E5E7EB',
      borderRadius: radii.pill,
    }}
  >
    <Text style={{ color: selected ? 'white' : '#111827', fontWeight: '600' }}>{label}</Text>
  </View>
);

