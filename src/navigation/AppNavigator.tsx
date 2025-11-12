import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
import { OnboardingNavigator } from './OnboardingNavigator';
import { MainTabs } from './MainTabs';
import { useAppStore } from '../store';
import { TrackDetailScreen } from '../screens/Tracks/TrackDetailScreen';
import { TrackBuilderScreen } from '../screens/Tracks/TrackBuilderScreen';
import { QuizResultScreen } from '../screens/Quiz/QuizResultScreen';
import { GoalsScreen } from '../screens/Goals/GoalsScreen';
import { SettingsScreen } from '../screens/Settings/SettingsScreen';
import { CertificationsScreen } from '../screens/Certs/CertificationsScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator = () => {
  const user = useAppStore((s) => s.user);
  if (!user) {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Onboarding" component={OnboardingNavigator} />
      </Stack.Navigator>
    );
  }
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainTabs" component={MainTabs} />
      <Stack.Screen name="TrackDetail" component={TrackDetailScreen} />
      <Stack.Screen name="TrackBuilder" component={TrackBuilderScreen} options={{ presentation: 'modal' }} />
      <Stack.Screen name="QuizResult" component={QuizResultScreen} />
      <Stack.Screen name="Goals" component={GoalsScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} options={{ presentation: 'modal' }} />
      <Stack.Screen name="Certifications" component={CertificationsScreen} />
    </Stack.Navigator>
  );
};
