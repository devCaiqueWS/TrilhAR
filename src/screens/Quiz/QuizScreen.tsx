import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { AppHeader } from '../../components/AppHeader';
import { QuizQuestion, QuizQuestionModel } from '../../components/QuizQuestion';
import { Stepper } from '../../components/Stepper';
import { PrimaryButton } from '../../components/PrimaryButton';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../navigation/types';

const demo: QuizQuestionModel[] = [
  { id: 'q1', type: 'mcq', prompt: 'JS é...', options: ['Tipado', 'Dinâmico', 'Compilado'], correctIndex: 1 },
  { id: 'q2', type: 'self', prompt: 'Nível em React Native (0-5)' },
];

export const QuizScreen: React.FC = () => {
  const nav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const q = demo[index];
  const onNext = () => setIndex((i) => Math.min(demo.length - 1, i + 1));
  const onPrev = () => setIndex((i) => Math.max(0, i - 1));
  return (
    <View style={{ flex: 1, backgroundColor: '#F2F2F2' }}>
      <AppHeader title="Quiz" />
      <ScrollView contentContainerStyle={{ padding: 16, gap: 16 }}>
        <Stepper total={demo.length} current={index + 1} />
        <QuizQuestion
          model={q}
          value={answers[q.id]}
          onChange={(v) => setAnswers((s) => ({ ...s, [q.id]: v }))}
          accessibilityLabel={`Pergunta ${index + 1}`}
        />
        <View style={{ flexDirection: 'row', gap: 8 }}>
          <PrimaryButton title="Voltar" variant="outline" onPress={onPrev} />
          <PrimaryButton
            title={index === demo.length - 1 ? 'Finalizar' : 'Avançar'}
            onPress={() => {
              if (index === demo.length - 1) nav.navigate('QuizResult');
              else onNext();
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
};
