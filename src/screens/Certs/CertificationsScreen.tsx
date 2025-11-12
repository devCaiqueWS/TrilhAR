import React from 'react';
import { View, Text } from 'react-native';
import { AppHeader } from '../../components/AppHeader';

export const CertificationsScreen: React.FC = () => {
  return (
    <View style={{ flex: 1, backgroundColor: '#F2F2F2' }}>
      <AppHeader title="Certificações" />
      <View style={{ padding: 16, gap: 8 }}>
        <Text>Badges internos (placeholder)</Text>
      </View>
    </View>
  );
};

