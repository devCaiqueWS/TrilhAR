import React, { useState } from 'react';
import { View, Text, TextInput, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { OnboardingStackParamList } from '../../navigation/types';
import { PrimaryButton } from '../../components/PrimaryButton';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAppStore } from '../../store';

const schema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Mínimo 6 caracteres'),
});

type FormValues = z.infer<typeof schema>;

type Props = NativeStackScreenProps<OnboardingStackParamList, 'Login'>;

export const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const { control, handleSubmit, formState, register, setValue } = useForm<FormValues>({ resolver: zodResolver(schema) });
  const login = useAppStore((s) => s.login);
  const [loading, setLoading] = useState(false);

  const submit = handleSubmit(async (data) => {
    try {
      setLoading(true);
      await login(data.email, data.password);
      navigation.replace('Preferences');
    } catch (e: any) {
      Alert.alert('Erro', e?.message || 'Falha ao entrar');
    } finally {
      setLoading(false);
    }
  });

  return (
    <View style={{ flex: 1, padding: 16, gap: 12 }}>
      <Text style={{ fontWeight: '700', fontSize: 18 }}>Entrar</Text>
      <TextInput
        accessibilityLabel="Email"
        placeholder="email@exemplo.com"
        autoCapitalize="none"
        keyboardType="email-address"
        style={{ backgroundColor: '#fff', padding: 12, borderRadius: 8 }}
        onChangeText={(t) => setValue('email', t, { shouldValidate: true })}
      />
      {formState.errors.email?.message ? <Text style={{ color: '#EF4444' }}>{formState.errors.email.message}</Text> : null}
      <TextInput
        accessibilityLabel="Senha"
        placeholder="Senha"
        secureTextEntry
        style={{ backgroundColor: '#fff', padding: 12, borderRadius: 8 }}
        onChangeText={(t) => setValue('password', t, { shouldValidate: true })}
      />
      {formState.errors.password?.message ? <Text style={{ color: '#EF4444' }}>{formState.errors.password.message}</Text> : null}
      <PrimaryButton title="Continuar" onPress={submit} loading={loading} />
      <PrimaryButton title="Criar conta" variant="ghost" onPress={() => navigation.navigate('Signup')} />
    </View>
  );
};

