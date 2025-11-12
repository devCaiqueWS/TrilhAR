import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { OnboardingStackParamList } from '../../navigation/types';
import { SkillTag } from '../../components/SkillTag';
import { PrimaryButton } from '../../components/PrimaryButton';
import { useAppStore } from '../../store';

type Props = NativeStackScreenProps<OnboardingStackParamList, 'Preferences'>;

const AREAS: Array<'Dados' | 'Dev' | 'Produto' | 'UX' | 'Outros'> = ['Dados', 'Dev', 'Produto', 'UX', 'Outros'];

export const PreferencesScreen: React.FC<Props> = ({ navigation }) => {
  const setProfile = useAppStore((s) => s.setProfile);
  const [area, setArea] = useState<(typeof AREAS)[number]>('Dev');
  const [level, setLevel] = useState<'Iniciante' | 'Intermediario' | 'Avancado'>('Iniciante');
  const complete = () => {
    setProfile({ area, level });
    // Avança para o app principal após preferências
    navigation.getParent()?.navigate('MainTabs' as never);
  };
  return (
    <View style={{ flex: 1, padding: 16, gap: 16 }}>
      <Text style={{ fontWeight: '700' }}>Área</Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
        {AREAS.map((a) => (
          <Text key={a} onPress={() => setArea(a)}>
            <SkillTag label={a} selected={a === area} />
          </Text>
        ))}
      </View>
      <Text style={{ fontWeight: '700' }}>Nível</Text>
      <View style={{ flexDirection: 'row', gap: 8 }}>
        {(['Iniciante', 'Intermediario', 'Avancado'] as const).map((l) => (
          <Text key={l} onPress={() => setLevel(l)}>
            <SkillTag label={l} selected={l === level} />
          </Text>
        ))}
      </View>
      <PrimaryButton title="Salvar e continuar" onPress={complete} />
    </View>
  );
};
