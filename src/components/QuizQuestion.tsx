import React from 'react';
import { View, Text, Pressable, AccessibilityProps } from 'react-native';
import { radii } from '../theme/tokens';

export type QuizQuestionType = 'mcq' | 'self';
export type QuizQuestionModel = {
  id: string;
  type: QuizQuestionType;
  prompt: string;
  options?: string[];
  correctIndex?: number;
};

type Props = {
  model: QuizQuestionModel;
  value?: number;
  onChange?: (value: number) => void;
} & AccessibilityProps;

export const QuizQuestion: React.FC<Props> = ({ model, value, onChange }) => {
  if (model.type === 'mcq') {
    return (
      <View accessibilityRole="radiogroup" style={{ gap: 8 }}>
        <Text style={{ fontWeight: '700', marginBottom: 8 }}>{model.prompt}</Text>
        {model.options?.map((opt, idx) => (
          <Pressable
            key={idx}
            onPress={() => onChange?.(idx)}
            accessibilityRole="radio"
            accessibilityState={{ selected: value === idx }}
            style={{ padding: 12, borderRadius: radii.md, backgroundColor: value === idx ? '#E0F2F1' : '#F3F4F6' }}
          >
            <Text>{opt}</Text>
          </Pressable>
        ))}
      </View>
    );
  }
  // self assessment 0-5 simplified
  return (
    <View>
      <Text style={{ fontWeight: '700', marginBottom: 8 }}>{model.prompt}</Text>
      <View style={{ flexDirection: 'row', gap: 8 }}>
        {Array.from({ length: 6 }).map((_, idx) => (
          <Pressable
            key={idx}
            onPress={() => onChange?.(idx)}
            accessibilityRole="button"
            style={{ padding: 10, borderRadius: radii.sm, backgroundColor: value === idx ? '#E0F2F1' : '#F3F4F6' }}
          >
            <Text>{idx}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
};

