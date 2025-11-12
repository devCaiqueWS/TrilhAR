import React from 'react';
import { View, Text } from 'react-native';
import { AppHeader } from '../../components/AppHeader';
import { RadarChart } from '../../components/RadarChart';
import { PrimaryButton } from '../../components/PrimaryButton';

export const QuizResultScreen: React.FC = () => {
  const labels = ['JS', 'RN', 'UX', 'Dados', 'Produto'];
  const values = [3, 4, 2, 1, 3];
  return (
    <View style={{ flex: 1, backgroundColor: '#F2F2F2' }}>
      <AppHeader title="Resultado do Quiz" />
      <View style={{ padding: 16, gap: 12 }}>
        <RadarChart labels={labels} values={values} />
        <PrimaryButton title="Ver trilhas sugeridas" onPress={() => {}} />
      </View>
    </View>
  );
};

