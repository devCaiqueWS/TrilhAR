import React from 'react';
import { View, Text, Switch } from 'react-native';
import { radii } from '../theme/tokens';
import Ionicons from '@expo/vector-icons/Ionicons';

export type Goal = { id: string; title: string; done: boolean; due?: string };

type Props = { goal: Goal; onToggle?: (done: boolean) => void };

export const GoalItem: React.FC<Props> = ({ goal, onToggle }) => (
  <View
    accessibilityRole="checkbox"
    accessibilityState={{ checked: goal.done }}
    style={{ flexDirection: 'row', alignItems: 'center', gap: 12, padding: 12, borderRadius: radii.md, backgroundColor: '#fff' }}
  >
    <Switch value={goal.done} onValueChange={onToggle} />
    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', gap: 8 }}>
      <Ionicons name={goal.done ? 'checkmark-done-outline' : 'ellipse-outline'} size={18} color={goal.done ? '#26A699' : '#9CA3AF'} />
      <View style={{ flex: 1 }}>
        <Text style={{ fontWeight: '600' }}>{goal.title}</Text>
        {goal.due ? <Text style={{ color: '#6B7280' }}>{goal.due}</Text> : null}
      </View>
    </View>
  </View>
);
