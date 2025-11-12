import React, { useState } from 'react';
import { View, Text, TextInput, Alert } from 'react-native';
import { AppHeader } from '../../components/AppHeader';
import { PrimaryButton } from '../../components/PrimaryButton';
import { Stepper } from '../../components/Stepper';
import { useCreateTrack } from '../../services/hooks';
import { useAppStore } from '../../store';

export const TrackBuilderScreen: React.FC = () => {
  const [step, setStep] = useState(1);
  const [hoursPerWeek, setHoursPerWeek] = useState('3');
  const level = useAppStore((s) => s.level);
  const area = useAppStore((s) => s.area);
  const createTrack = useCreateTrack();
  const total = 2;
  const next = () => setStep((s) => Math.min(total, s + 1));
  const prev = () => setStep((s) => Math.max(1, s - 1));
  return (
    <View style={{ flex: 1, backgroundColor: '#F2F2F2' }}>
      <AppHeader title="Criador de Trilha" />
      <View style={{ padding: 16, gap: 16 }}>
        <Stepper total={total} current={step} />
        {step === 1 ? (
          <View style={{ gap: 8 }}>
            <Text>Disponibilidade por semana (h)</Text>
            <TextInput value={hoursPerWeek} onChangeText={setHoursPerWeek} keyboardType="numeric" style={{ backgroundColor: '#fff', padding: 12, borderRadius: 8 }} />
            <PrimaryButton title="Próximo" onPress={next} />
          </View>
        ) : (
          <View style={{ gap: 8 }}>
            <Text style={{ fontWeight: '700' }}>Resumo</Text>
            <Text>Horas/semana: {hoursPerWeek}</Text>
            <Text>Duração estimada: {Math.max(1, Math.ceil(24 / Math.max(1, parseInt(hoursPerWeek) || 1)))} semanas</Text>
            <View style={{ flexDirection: 'row', gap: 8 }}>
              <PrimaryButton title="Voltar" variant="outline" onPress={prev} />
              <PrimaryButton
                title={createTrack.isPending ? 'Gerando...' : 'Gerar Trilha'}
                onPress={async () => {
                  try {
                    const durationWeeks = Math.max(1, Math.ceil(24 / Math.max(1, parseInt(hoursPerWeek) || 1)));
                    const res = await createTrack.mutateAsync({
                      title: `Trilha ${area} ${level}`,
                      level,
                      skillsTarget: [area],
                      durationWeeks,
                      modules: [
                        { title: 'Módulo 1', lessons: [] },
                        { title: 'Módulo 2', lessons: [] },
                      ],
                    });
                    Alert.alert('Trilha criada', res.title);
                  } catch (e: any) {
                    Alert.alert('Erro', e?.response?.data?.message || 'Falha ao criar trilha');
                  }
                }}
              />
            </View>
          </View>
        )}
      </View>
    </View>
  );
};
