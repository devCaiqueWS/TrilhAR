import React from 'react';
import { View, Text, Switch } from 'react-native';
import { AppHeader } from '../../components/AppHeader';
import { useAppStore } from '../../store';

export const SettingsScreen: React.FC = () => {
  const theme = useAppStore((s) => s.theme);
  const setTheme = useAppStore((s) => s.setTheme);
  const language = useAppStore((s) => s.language);
  const setLanguage = useAppStore((s) => s.setLanguage);
  return (
    <View style={{ flex: 1, backgroundColor: '#F2F2F2' }}>
      <AppHeader title="Configurações" />
      <View style={{ padding: 16, gap: 16 }}>
        <Text style={{ fontWeight: '700' }}>Tema</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <Text>Claro</Text>
          <Switch value={theme === 'dark'} onValueChange={(v) => setTheme(v ? 'dark' : 'light')} />
          <Text>Escuro</Text>
        </View>
        <Text style={{ fontWeight: '700' }}>Idioma</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
          <Text onPress={() => setLanguage('pt-BR')} accessibilityRole="button" style={{ fontWeight: language === 'pt-BR' ? '800' : '400' }}>PT-BR</Text>
          <Text onPress={() => setLanguage('en')} accessibilityRole="button" style={{ fontWeight: language === 'en' ? '800' : '400' }}>EN</Text>
          <Text onPress={() => setLanguage('es')} accessibilityRole="button" style={{ fontWeight: language === 'es' ? '800' : '400' }}>ES</Text>
        </View>
      </View>
    </View>
  );
};

