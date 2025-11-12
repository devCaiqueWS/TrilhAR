import React from 'react';
import { View, Text } from 'react-native';
import { radii } from '../theme/tokens';
import Ionicons from '@expo/vector-icons/Ionicons';

type Props = { title: string; provider?: string; hours?: number; badge?: 'gratuito' | 'pago' };

export const CourseCard: React.FC<Props> = ({ title, provider, hours, badge }) => (
  <View style={{ backgroundColor: '#fff', padding: 12, borderRadius: radii.lg }}>
    <Text style={{ fontWeight: '700', marginBottom: 4 }}>{title}</Text>
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
      {provider ? (
        <>
          <Ionicons name="school-outline" size={14} color="#6B7280" />
          <Text style={{ color: '#6B7280' }}>{provider}</Text>
        </>
      ) : null}
    </View>
    <View style={{ flexDirection: 'row', gap: 12, marginTop: 8, alignItems: 'center' }}>
      {hours ? (
        <View style={{ flexDirection: 'row', gap: 4, alignItems: 'center' }}>
          <Ionicons name="time-outline" size={14} color="#374151" />
          <Text>{hours}h</Text>
        </View>
      ) : null}
      {badge ? (
        <View style={{ flexDirection: 'row', gap: 4, alignItems: 'center' }}>
          <Ionicons name="pricetag-outline" size={14} color="#374151" />
          <Text>{badge}</Text>
        </View>
      ) : null}
    </View>
  </View>
);
