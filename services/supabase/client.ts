import 'react-native-url-polyfill/auto'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'
import Constants from 'expo-constants'
import * as Linking from 'expo-linking'
import { Platform } from 'react-native'

const supabaseUrl = Constants.expoConfig?.extra?.SUPABASE_URL as string
const supabaseAnonKey = Constants.expoConfig?.extra?.SUPABASE_ANON_KEY as string

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
})

// Handle deep links
Linking.addEventListener('url', async ({ url }) => {
  if (url.includes('auth/callback')) {
    console.log('Deep link detected:', url)
    const { data, error } = await supabase.auth.setSession({
      access_token: url.split('access_token=')[1]?.split('&')[0],
      refresh_token: url.split('refresh_token=')[1]?.split('&')[0],
    })
    if (error) console.error('Error setting session:', error)
    if (data?.session) console.log('Session set successfully')
  }
}) 