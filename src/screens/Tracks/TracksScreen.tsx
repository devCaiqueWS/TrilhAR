import React from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { AppHeader } from '../../components/AppHeader';
import { TrackCard } from '../../components/TrackCard';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../navigation/types';
import Ionicons from '@expo/vector-icons/Ionicons';

export const TracksScreen: React.FC = () => {
  const nav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return (
    <View style={{ flex: 1, backgroundColor: '#F2F2F2' }}>
      <AppHeader title="Trilhas" />
      <ScrollView contentContainerStyle={{ padding: 16, gap: 12 }}>
        <Pressable onPress={() => nav.navigate('TrackDetail', { id: 't1' })}>
          <TrackCard title="Trilha RN Iniciante" level="Iniciante" progress={0.42} durationWeeks={6} />
        </Pressable>
        <Pressable onPress={() => nav.navigate('TrackDetail', { id: 't2' })}>
          <TrackCard title="Trilha Dados" level="Intermediario" progress={0.2} durationWeeks={8} />
        </Pressable>
        <Pressable onPress={() => nav.navigate('TrackBuilder')} style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
          <Ionicons name="add-circle-outline" size={18} color="#167369" />
          <Text style={{ color: '#167369', fontWeight: '700', marginTop: 8 }}>Criar nova trilha</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
};
