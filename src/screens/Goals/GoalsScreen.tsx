import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView } from 'react-native';
import { AppHeader } from '../../components/AppHeader';
import { PrimaryButton } from '../../components/PrimaryButton';
import { GoalItem } from '../../components/GoalItem';
import { useAppStore } from '../../store';

export const GoalsScreen: React.FC = () => {
  const goals = useAppStore((s) => s.goals);
  const addGoal = useAppStore((s) => s.addGoal);
  const toggleGoal = useAppStore((s) => s.toggleGoal);
  const [newGoal, setNewGoal] = useState('');
  return (
    <View style={{ flex: 1, backgroundColor: '#F2F2F2' }}>
      <AppHeader title="Metas" />
      <View style={{ padding: 16, gap: 12 }}>
        <TextInput placeholder="Nova micro-meta" value={newGoal} onChangeText={setNewGoal} style={{ backgroundColor: '#fff', padding: 12, borderRadius: 8 }} />
        <PrimaryButton
          title="Adicionar"
          onPress={() => {
            if (!newGoal.trim()) return;
            addGoal({ id: String(Date.now()), title: newGoal.trim(), done: false, due: new Date().toISOString() });
            setNewGoal('');
          }}
        />
      </View>
      <ScrollView contentContainerStyle={{ padding: 16, gap: 8 }}>
        {goals.length === 0 ? <Text>Nenhuma meta ainda</Text> : null}
        {goals.map((g) => (
          <GoalItem key={g.id} goal={g} onToggle={() => toggleGoal(g.id)} />
        ))}
      </ScrollView>
    </View>
  );
};

