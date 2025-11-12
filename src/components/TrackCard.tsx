import React from 'react';
import { View, Text } from 'react-native';
import { BadgeLevel } from './BadgeLevel';
import { radii } from '../theme/tokens';

type Props = { title: string; level: 'Iniciante' | 'Intermediario' | 'Avancado'; progress?: number; durationWeeks?: number };

export const TrackCard: React.FC<Props> = ({ title, level, progress = 0, durationWeeks }) => (
  <View style={{ backgroundColor: '#fff', padding: 12, borderRadius: radii.lg }}>
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
      <Text style={{ fontWeight: '700', fontSize: 16 }}>{title}</Text>
      <BadgeLevel level={level} />
    </View>
    <View style={{ marginTop: 8 }}>
      <Text>Progresso: {(progress * 100).toFixed(0)}%</Text>
      {durationWeeks ? <Text style={{ color: '#6B7280' }}>{durationWeeks} semanas</Text> : null}
    </View>
  </View>
);

