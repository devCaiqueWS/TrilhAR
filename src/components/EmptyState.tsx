import React from 'react';
import { View, Text } from 'react-native';

type Props = { title: string; description?: string };

export const EmptyState: React.FC<Props> = ({ title, description }) => (
  <View style={{ alignItems: 'center', justifyContent: 'center', padding: 24 }}>
    <Text style={{ fontWeight: '700', fontSize: 16, marginBottom: 6 }}>{title}</Text>
    {description ? <Text style={{ color: '#6B7280', textAlign: 'center' }}>{description}</Text> : null}
  </View>
);

