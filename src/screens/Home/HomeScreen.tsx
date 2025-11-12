import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, ActivityIndicator, Alert } from 'react-native';
import { AppHeader } from '../../components/AppHeader';
import { ProgressRing } from '../../components/ProgressRing';
import { GoalItem } from '../../components/GoalItem';
import { Toast } from '../../components/Toast';
import { useAppStore } from '../../store';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../navigation/types';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useGoals, useToggleGoal } from '../../services/goals';

export const HomeScreen: React.FC = () => {
  const nav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const user = useAppStore((s) => s.user);
  const { data: goals, isLoading, isError } = useGoals();
  const toggle = useToggleGoal();
  const [toast, setToast] = useState<string | null>(null);
  const completed = (goals || []).filter((g) => g.done).length;
  const pct = (goals && goals.length) ? completed / goals.length : 0;
  return (
    <View style={{ flex: 1, backgroundColor: '#F2F2F2' }}>
      <AppHeader title={`Olá, ${user?.name ?? 'Visitante'}`} />
      <ScrollView contentContainerStyle={{ padding: 16, gap: 16 }}>
        <View style={{ backgroundColor: '#fff', borderRadius: 12, padding: 16, flexDirection: 'row', alignItems: 'center', gap: 16 }}>
          <ProgressRing progress={pct} />
          <View style={{ flex: 1 }}>
            <Text style={{ fontWeight: '700' }}>Progresso Semanal</Text>
            <Text>{Math.round(pct * 100)}% das micro-metas</Text>
          </View>
        </View>

        <View style={{ gap: 8 }}>
          <Text style={{ fontWeight: '700' }}>Próximas metas</Text>
          <Pressable onPress={() => nav.navigate('Goals')} style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
            <Ionicons name="calendar-outline" size={18} color="#167369" />
            <Text style={{ color: '#167369', fontWeight: '700' }}>Abrir planner de metas</Text>
          </Pressable>
          {isLoading ? <ActivityIndicator /> : null}
          {isError ? <Text>Erro ao carregar metas</Text> : null}
          {(goals || []).map((g) => (
            <GoalItem
              key={g.id}
              goal={g}
              onToggle={(done) =>
                toggle.mutate(
                  { id: g.id, done },
                  {
                    onSuccess: () => setToast(done ? 'Meta concluída' : 'Meta reaberta'),
                    onError: () => Alert.alert('Erro', 'Falha ao atualizar meta'),
                  },
                )
              }
            />
          ))}
        </View>
      </ScrollView>
      <Toast message={toast || ''} visible={!!toast} onHide={() => setToast(null)} />
    </View>
  );
};

