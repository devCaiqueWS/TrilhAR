import { useCallback, useEffect, useMemo, useState } from 'react';
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
import { flags } from './src/config/flags';
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
    let mounted = true;
    const fallback = setTimeout(() => {
      if (mounted) {
        setReady(true);
        SplashScreen.hideAsync().catch(() => {});
      }
    }, 4000);
    (async () => {
      try {
        // Ensure font load never blocks forever
        await Promise.race([
          Font.loadAsync({
            PoppinsBold: require('./assets/fonts/Poppins-Bold.ttf'),
            PoppinsSemiBold: require('./assets/fonts/Poppins-SemiBold.ttf'),
            Inter: require('./assets/fonts/Inter-Regular.ttf'),
            InterMedium: require('./assets/fonts/Inter-Medium.ttf'),
          }),
          new Promise((resolve) => setTimeout(resolve, 2500)),
        ]);
      } catch (e) {
        console.warn('Fonts not loaded, using system fonts.');
      }
      try {
        if (__DEV__ && flags.useApiMocks) installAxiosMocks();
      } catch (e) {
        console.warn('Mocks install failed, continuing without mocks.');
      }
      try {
        initPersistence();
      } catch (e) {
        console.warn('Persistence init failed, continuing with defaults.');
      }
      if (mounted) setReady(true);
    })();
    return () => {
      mounted = false;
      clearTimeout(fallback);
    };
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (ready) {
      try {
        await SplashScreen.hideAsync();
      } catch {}
    }
  }, [ready]);

  useEffect(() => {
    if (ready) {
      SplashScreen.hideAsync().catch(() => {});
    }
  }, [ready]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <SafeAreaProvider>
        {ready ? (
          <QueryClientProvider client={queryClient}>
            <NavigationContainer theme={scheme === 'dark' ? DarkTheme : DefaultTheme} linking={linking}>
              <StatusBar style={scheme === 'dark' ? 'light' : 'dark'} />
              <AppNavigator />
            </NavigationContainer>
          </QueryClientProvider>
        ) : null}
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
