import React from 'react';
import { View, Text } from 'react-native';
// Placeholder: integrate victory-native radar later

type Props = { labels: string[]; values: number[] };

export const RadarChart: React.FC<Props> = ({ labels, values }) => {
  return (
    <View style={{ padding: 12 }}>
      <Text style={{ fontWeight: '600', marginBottom: 6 }}>Radar (placeholder)</Text>
      <Text numberOfLines={2}>{labels.join(', ')}</Text>
      <Text numberOfLines={2}>{values.join(', ')}</Text>
    </View>
  );
};

