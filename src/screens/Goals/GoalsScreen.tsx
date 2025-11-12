import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { AppHeader } from '../../components/AppHeader';
import { PrimaryButton } from '../../components/PrimaryButton';
import { GoalItem } from '../../components/GoalItem';
import { useGoals, useCreateGoal, useToggleGoal, useDeleteGoal } from '../../services/goals';

export const GoalsScreen: React.FC = () => {
  const { data: goals, isLoading, isError } = useGoals();
  const createGoal = useCreateGoal();
  const toggleGoal = useToggleGoal();
  const deleteGoal = useDeleteGoal();
  const [newGoal, setNewGoal] = useState('');
  return (
    <View style={{ flex: 1, backgroundColor: '#F2F2F2' }}>
      <AppHeader title="Metas" />
      <View style={{ padding: 16, gap: 12 }}>
        <TextInput placeholder="Nova micro-meta" value={newGoal} onChangeText={setNewGoal} style={{ backgroundColor: '#fff', padding: 12, borderRadius: 8 }} />
        <PrimaryButton
          title="Adicionar"
          onPress={() => {
            const title = newGoal.trim();
            if (!title) return;
            createGoal.mutate(
              { title, due: new Date().toISOString() },
              {
                onSuccess: () => setNewGoal(''),
                onError: (e: any) => Alert.alert('Erro', e?.response?.data?.message || 'Falha ao criar meta'),
              },
            );
          }}
          disabled={createGoal.isPending}
        />
      </View>
      <ScrollView contentContainerStyle={{ padding: 16, gap: 8 }}>
        {isLoading ? <ActivityIndicator accessibilityLabel="Carregando metas" /> : null}
        {isError ? <Text>Erro ao carregar metas</Text> : null}
        {!isLoading && !isError && (goals?.length ?? 0) === 0 ? <Text>Nenhuma meta ainda</Text> : null}
        {(goals || []).map((g) => (
          <GoalItem
            key={g.id}
            goal={g}
            onToggle={(done) =>
              toggleGoal.mutate({ id: g.id, done }, { onError: () => Alert.alert('Erro', 'Falha ao atualizar meta') })
            }
            onDelete={() => deleteGoal.mutate(g.id, { onError: () => Alert.alert('Erro', 'Falha ao excluir meta') })}
          />
        ))}
      </ScrollView>
    </View>
  );
};
