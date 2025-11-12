import { useEffect, useMemo, useState } from 'react';
import { Appearance, ColorSchemeName, Platform } from 'react-native';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { AppNavigator } from './src/navigation/AppNavigator';
import { linking } from './src/navigation/Linking';
import './src/i18n';
import { installAxiosMocks } from './src/mocks';
import { initPersistence } from './src/store/persist';

SplashScreen.preventAutoHideAsync().catch(() => void 0);

export default function App() {
  const [ready, setReady] = useState(false);
  const [scheme, setScheme] = useState<ColorSchemeName>(Appearance.getColorScheme() || 'light');
  const queryClient = useMemo(() => new QueryClient(), []);

  useEffect(() => {
    const sub = Appearance.addChangeListener(({ colorScheme }) => setScheme(colorScheme));
    return () => sub.remove();
  }, []);

  useEffect(() => {
    async function prepare() {
      try {
        // Load custom fonts (optional in dev; continue on failure)
        await Font.loadAsync({
          PoppinsBold: require('./assets/fonts/Poppins-Bold.ttf'),
          PoppinsSemiBold: require('./assets/fonts/Poppins-SemiBold.ttf'),
          Inter: require('./assets/fonts/Inter-Regular.ttf'),
          InterMedium: require('./assets/fonts/Inter-Medium.ttf'),
        });
      } catch (e) {
        // proceed with system fonts if assets missing
        console.warn('Fonts not loaded, using system fonts.');
      } finally {
        // Install mocks only in development
        if (__DEV__) installAxiosMocks();
        initPersistence();
        setReady(true);
        await SplashScreen.hideAsync();
      }
    }
    prepare();
  }, []);

  if (!ready) return null;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <QueryClientProvider client={queryClient}>
          <NavigationContainer theme={scheme === 'dark' ? DarkTheme : DefaultTheme} linking={linking}>
            <StatusBar style={scheme === 'dark' ? 'light' : 'dark'} />
            <AppNavigator />
          </NavigationContainer>
        </QueryClientProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
