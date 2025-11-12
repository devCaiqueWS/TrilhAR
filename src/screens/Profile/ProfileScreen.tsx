import React, { useMemo } from 'react';
import { View, Text, Switch, Pressable } from 'react-native';
import { AppHeader } from '../../components/AppHeader';
import { useAppStore } from '../../store';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../navigation/types';
import Ionicons from '@expo/vector-icons/Ionicons';
import { colors, radii, spacing } from '../../theme/tokens';
import { useGoals } from '../../services/goals';

export const ProfileScreen: React.FC = () => {
  const nav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const theme = useAppStore((s) => s.theme);
  const setTheme = useAppStore((s) => s.setTheme);
  const logout = useAppStore((s) => s.logout);
  const user = useAppStore((s) => s.user);
  const level = useAppStore((s) => s.level);
  const area = useAppStore((s) => s.area);
  const goalsPerWeek = useAppStore((s) => s.goalsPerWeek);
  const setProfile = useAppStore((s) => s.setProfile);
  const { data: goals = [] } = useGoals();

  const initials = useMemo(() => {
    const name = user?.name || 'Visitante';
    const parts = name.trim().split(' ').filter(Boolean);
    const a = parts[0]?.[0] || 'V';
    const b = parts[1]?.[0] || '';
    return (a + b).toUpperCase();
  }, [user?.name]);

  const completed = goals.filter((g) => g.done).length;

  return (
    <View style={{ flex: 1, backgroundColor: '#F2F2F2' }}>
      <AppHeader title="Perfil" />
      <View style={{ padding: 16, gap: 16 }}>
        {/* Profile card */}
        <View style={{ backgroundColor: '#fff', borderRadius: radii.lg, padding: spacing.lg, flexDirection: 'row', alignItems: 'center', gap: spacing.lg }}>
          <View style={{ width: 64, height: 64, borderRadius: 32, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ color: 'white', fontWeight: '800', fontSize: 22 }}>{initials}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ fontWeight: '800', fontSize: 18 }}>{user?.name || 'Visitante'}</Text>
            <Text style={{ color: '#6B7280' }}>{user?.email || 'sem e-mail'}</Text>
          </View>
        </View>

        {/* Stats */}
        <View style={{ flexDirection: 'row', gap: 12 }}>
          <View style={{ flex: 1, backgroundColor: '#fff', borderRadius: radii.lg, padding: spacing.lg }}>
            <Text style={{ color: '#6B7280' }}>Metas</Text>
            <Text style={{ fontWeight: '800', fontSize: 18 }}>{completed}/{goals.length}</Text>
          </View>
          <View style={{ flex: 1, backgroundColor: '#fff', borderRadius: radii.lg, padding: spacing.lg }}>
            <Text style={{ color: '#6B7280' }}>Metas/semana</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, marginTop: 6 }}>
              <Pressable accessibilityLabel="Diminuir metas por semana" onPress={() => setProfile({ goalsPerWeek: Math.max(1, goalsPerWeek - 1) })} style={{ padding: 8, borderRadius: radii.md, backgroundColor: '#F3F4F6' }}>
                <Ionicons name="remove-outline" size={18} color="#111827" />
              </Pressable>
              <Text style={{ fontWeight: '800', fontSize: 18, minWidth: 24, textAlign: 'center' }}>{goalsPerWeek}</Text>
              <Pressable accessibilityLabel="Aumentar metas por semana" onPress={() => setProfile({ goalsPerWeek: Math.min(14, goalsPerWeek + 1) })} style={{ padding: 8, borderRadius: radii.md, backgroundColor: '#F3F4F6' }}>
                <Ionicons name="add-outline" size={18} color="#111827" />
              </Pressable>
            </View>
          </View>
        </View>

        {/* Study profile */}
        <View style={{ backgroundColor: '#fff', borderRadius: radii.lg, padding: spacing.lg, gap: spacing.md }}>
          <Text style={{ fontWeight: '800' }}>Perfil de estudo</Text>
          <Text style={{ color: '#6B7280' }}>Nível</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
            {(['Iniciante', 'Intermediario', 'Avancado'] as const).map((lvl) => (
              <Pressable key={lvl} accessibilityRole="button" onPress={() => setProfile({ level: lvl })} style={{ paddingVertical: 8, paddingHorizontal: 12, borderRadius: radii.md, borderWidth: 1, borderColor: level === lvl ? colors.primary : '#E5E7EB', backgroundColor: level === lvl ? '#E6FFFA' : 'transparent' }}>
                <Text style={{ color: level === lvl ? colors.secondary : '#111827' }}>{lvl}</Text>
              </Pressable>
            ))}
          </View>
          <Text style={{ color: '#6B7280', marginTop: 8 }}>Área</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
            {(['Dev', 'Dados', 'Produto', 'UX', 'Outros'] as const).map((ar) => (
              <Pressable key={ar} accessibilityRole="button" onPress={() => setProfile({ area: ar })} style={{ paddingVertical: 8, paddingHorizontal: 12, borderRadius: radii.md, borderWidth: 1, borderColor: area === ar ? colors.primary : '#E5E7EB', backgroundColor: area === ar ? '#E6FFFA' : 'transparent' }}>
                <Text style={{ color: area === ar ? colors.secondary : '#111827' }}>{ar}</Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Preferences */}
        <View style={{ backgroundColor: '#fff', borderRadius: radii.lg, padding: spacing.lg, gap: spacing.md }}>
          <Text style={{ fontWeight: '800' }}>Preferências</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <Text>Claro</Text>
            <Switch value={theme === 'dark'} onValueChange={(v) => setTheme(v ? 'dark' : 'light')} />
            <Text>Escuro</Text>
          </View>
          <Pressable onPress={() => nav.navigate('Settings')} style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
            <Ionicons name="settings-outline" size={18} color={colors.secondary} />
            <Text style={{ color: colors.secondary, fontWeight: '700' }}>Configurações</Text>
          </Pressable>
          <Pressable onPress={() => nav.navigate('Certifications')} style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
            <Ionicons name="ribbon-outline" size={18} color={colors.secondary} />
            <Text style={{ color: colors.secondary, fontWeight: '700' }}>Certificações</Text>
          </Pressable>
        </View>

        <Pressable onPress={() => logout()} style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
          <Ionicons name="log-out-outline" size={18} color="#EF4444" />
          <Text style={{ color: '#EF4444', fontWeight: '700' }}>Sair</Text>
        </Pressable>
      </View>
    </View>
  );
};

