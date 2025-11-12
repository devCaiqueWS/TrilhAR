import React from 'react';
import { View, Text, ScrollView, Pressable, ActivityIndicator } from 'react-native';
import { AppHeader } from '../../components/AppHeader';
import { TrackCard } from '../../components/TrackCard';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../navigation/types';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useTracks } from '../../services/hooks';

export const TracksScreen: React.FC = () => {
  const nav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { data: tracks, isLoading, isError } = useTracks();
  return (
    <View style={{ flex: 1, backgroundColor: '#F2F2F2' }}>
      <AppHeader title="Trilhas" />
      <ScrollView contentContainerStyle={{ padding: 16, gap: 12 }}>
        {isLoading ? <ActivityIndicator /> : null}
        {isError ? <Text>Erro ao carregar trilhas</Text> : null}
        {(tracks || []).map((t) => (
          <Pressable key={t.id} onPress={() => nav.navigate('TrackDetail', { id: t.id })}>
            <TrackCard title={t.title} level={t.level} progress={t.progress} durationWeeks={t.durationWeeks} />
          </Pressable>
        ))}
        <Pressable onPress={() => nav.navigate('TrackBuilder')} style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
          <Ionicons name="add-circle-outline" size={18} color="#167369" />
          <Text style={{ color: '#167369', fontWeight: '700', marginTop: 8 }}>Criar nova trilha</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
};
