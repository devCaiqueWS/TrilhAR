import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { AppHeader } from '../../components/AppHeader';
import { PrimaryButton } from '../../components/PrimaryButton';
import { useTrack } from '../../services/hooks';

type Props = NativeStackScreenProps<RootStackParamList, 'TrackDetail'>;

export const TrackDetailScreen: React.FC<Props> = ({ route }) => {
  const { id } = route.params;
  const { data, isLoading } = useTrack(id);
  return (
    <View style={{ flex: 1, backgroundColor: '#F2F2F2' }}>
      <AppHeader title="Detalhe da Trilha" />
      <ScrollView contentContainerStyle={{ padding: 16, gap: 12 }}>
        {isLoading ? (
          <Text>Carregando...</Text>
        ) : (
          <>
            <Text style={{ fontWeight: '800', fontSize: 18 }}>{data?.title}</Text>
            <Text>Progresso: {Math.round((data?.progress ?? 0) * 100)}%</Text>
            <Text>Duração: {data?.durationWeeks} semanas</Text>
            <PrimaryButton title="Iniciar/Continuar" onPress={() => {}} />
          </>
        )}
      </ScrollView>
    </View>
  );
};

