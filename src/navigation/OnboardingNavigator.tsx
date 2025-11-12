import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { OnboardingStackParamList } from './types';
import { WelcomeScreen } from '../screens/Onboarding/Welcome';
import { LoginScreen } from '../screens/Auth/Login';
import { SignupScreen } from '../screens/Auth/Signup';
import { PreferencesScreen } from '../screens/Onboarding/Preferences';

const Stack = createNativeStackNavigator<OnboardingStackParamList>();

export const OnboardingNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
    <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Entrar' }} />
    <Stack.Screen name="Signup" component={SignupScreen} options={{ title: 'Cadastrar' }} />
    <Stack.Screen name="Preferences" component={PreferencesScreen} options={{ title: 'Preferências' }} />
  </Stack.Navigator>
);

