import { useEffect } from 'react'
import { Text, View } from 'react-native'
import { useRouter, useSegments } from 'expo-router'
import { useAuth } from '@/contexts/AuthContext'

export default function Callback() {
  const router = useRouter()
  const segments = useSegments()
  const { session } = useAuth()

  useEffect(() => {
    if (session) {
      // If we have a session, redirect to the main app
      router.replace('/(tabs)')
    }
  }, [session, router])

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Completing sign in...</Text>
    </View>
  )
} 