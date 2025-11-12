import React from 'react';
import { View, Text, Switch, Pressable } from 'react-native';
import { AppHeader } from '../../components/AppHeader';
import { useAppStore } from '../../store';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../navigation/types';
import Ionicons from '@expo/vector-icons/Ionicons';

export const ProfileScreen: React.FC = () => {
  const nav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const theme = useAppStore((s) => s.theme);
  const setTheme = useAppStore((s) => s.setTheme);
  const logout = useAppStore((s) => s.logout);
  return (
    <View style={{ flex: 1, backgroundColor: '#F2F2F2' }}>
      <AppHeader title="Perfil" />
      <View style={{ padding: 16, gap: 12 }}>
        <Text style={{ fontWeight: '700' }}>Tema</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <Text>Claro</Text>
          <Switch value={theme === 'dark'} onValueChange={(v) => setTheme(v ? 'dark' : 'light')} />
          <Text>Escuro</Text>
        </View>
        <Pressable onPress={() => nav.navigate('Settings')} style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
          <Ionicons name="settings-outline" size={18} color="#167369" />
          <Text style={{ color: '#167369', fontWeight: '700' }}>Configurações</Text>
        </Pressable>
        <Pressable onPress={() => nav.navigate('Certifications')} style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
          <Ionicons name="ribbon-outline" size={18} color="#167369" />
          <Text style={{ color: '#167369', fontWeight: '700' }}>Certificações</Text>
        </Pressable>
        <Pressable onPress={() => logout()} style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
          <Ionicons name="log-out-outline" size={18} color="#EF4444" />
          <Text style={{ color: '#EF4444', fontWeight: '700' }}>Sair</Text>
        </Pressable>
      </View>
    </View>
  );
};
