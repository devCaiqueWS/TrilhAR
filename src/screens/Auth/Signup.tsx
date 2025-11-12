import React, { useState } from 'react';
import { View, Text, TextInput, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { OnboardingStackParamList } from '../../navigation/types';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { PrimaryButton } from '../../components/PrimaryButton';
import { useAppStore } from '../../store';

type Props = NativeStackScreenProps<OnboardingStackParamList, 'Signup'>;

const schema = z.object({
  name: z.string().min(2, 'Nome muito curto'),
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Mínimo 6 caracteres'),
});

type FormValues = z.infer<typeof schema>;

export const SignupScreen: React.FC<Props> = ({ navigation }) => {
  const { setValue, formState, handleSubmit } = useForm<FormValues>({ resolver: zodResolver(schema) });
  const register = useAppStore((s) => s.register!);
  const [loading, setLoading] = useState(false);

  const submit = handleSubmit(async (data) => {
    try {
      setLoading(true);
      await register(data.name, data.email, data.password);
      navigation.replace('Preferences');
    } catch (e: any) {
      Alert.alert('Erro', e?.message || 'Falha ao cadastrar');
    } finally {
      setLoading(false);
    }
  });

  return (
    <View style={{ flex: 1, padding: 16, gap: 12 }}>
      <Text style={{ fontWeight: '700', fontSize: 18 }}>Criar conta</Text>
      <TextInput
        accessibilityLabel="Nome"
        placeholder="Seu nome"
        style={{ backgroundColor: '#fff', padding: 12, borderRadius: 8 }}
        onChangeText={(t) => setValue('name', t, { shouldValidate: true })}
      />
      {formState.errors.name?.message ? <Text style={{ color: '#EF4444' }}>{formState.errors.name.message}</Text> : null}

      <TextInput
        accessibilityLabel="Email"
        autoCapitalize="none"
        keyboardType="email-address"
        placeholder="email@exemplo.com"
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

      <PrimaryButton title="Cadastrar" onPress={submit} loading={loading} />
      <PrimaryButton title="Já tenho conta" variant="ghost" onPress={() => navigation.goBack()} />
    </View>
  );
};
