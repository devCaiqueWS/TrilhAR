import React from 'react';
import { View } from 'react-native';

type Props = { total: number; current: number };

export const Stepper: React.FC<Props> = ({ total, current }) => (
  <View style={{ flexDirection: 'row', gap: 6 }}>
    {Array.from({ length: total }).map((_, i) => (
      <View key={i} style={{ height: 6, flex: 1, borderRadius: 3, backgroundColor: i < current ? '#26A699' : '#E5E7EB' }} />
    ))}
  </View>
);

