import { useEffect } from 'react'
import { Slot } from 'expo-router'
import { useFonts, 
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from '@expo-google-fonts/inter'
import * as SplashScreen from 'expo-splash-screen'
import { NavigationContainer, DefaultTheme } from '@react-navigation/native'
import { useTheme } from '@/hooks/useTheme'

SplashScreen.preventAutoHideAsync()

export default function Layout() {
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
    <NavigationContainer theme={navigationTheme}>
      <Slot />
    </NavigationContainer>
  )
} 