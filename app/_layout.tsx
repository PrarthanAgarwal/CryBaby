import { useEffect } from 'react'
import { Stack, useRouter, useSegments } from 'expo-router'
import { useFonts, 
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from '@expo-google-fonts/inter'
import * as SplashScreen from 'expo-splash-screen'
import { NavigationContainer, DefaultTheme } from '@react-navigation/native'
import { useTheme } from '@/hooks/useTheme'
import { AuthProvider, useAuth } from '../contexts/AuthContext'

SplashScreen.preventAutoHideAsync()

// Handle authentication state and protected routes
function RootLayoutNav() {
  const { user, isLoading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    const isAuthScreen = segments[0] === 'login';
    const isProtectedRoute = segments[0] === '(tabs)' || segments[0] === 'achievements';

    if (!user && isProtectedRoute) {
      // Redirect to login if not logged in and trying to access protected routes
      router.replace('/login');
    } else if (user && isAuthScreen) {
      // Redirect to home if logged in and trying to access auth screens
      router.replace('/(tabs)');
    }
  }, [user, segments, isLoading]);

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="login" options={{ 
        headerShown: false,
        presentation: 'modal'
      }} />
      <Stack.Screen name="achievements" options={{ 
        title: 'Achievements',
        presentation: 'modal'
      }} />
    </Stack>
  );
}

export default function RootLayout() {
  const appTheme = useTheme()
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  })

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync()
    }
  }, [fontsLoaded])

  if (!fontsLoaded) {
    return null
  }

  const navigationTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: appTheme.colors.primary[500],
      background: appTheme.colors.background.primary,
      card: appTheme.colors.background.secondary,
      text: appTheme.colors.text.primary,
      border: appTheme.colors.background.secondary,
      notification: appTheme.colors.primary[500],
    },
  }

  return (
    <AuthProvider>
      <NavigationContainer theme={navigationTheme}>
        <RootLayoutNav />
      </NavigationContainer>
    </AuthProvider>
  )
} 