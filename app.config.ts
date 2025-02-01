import { ExpoConfig, ConfigContext } from 'expo/config'
import * as dotenv from 'dotenv'

// Load environment variables
dotenv.config()

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: 'CryBaby',
  slug: 'crybaby',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/images/icon.png',
  scheme: 'crybaby',
  userInterfaceStyle: 'automatic',
  splash: {
    image: './assets/images/adaptive-icon.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff'
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    supportsTablet: true,
    bundleIdentifier: 'dev.prarthan.crybaby',
    config: {
      usesNonExemptEncryption: false
    }
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/images/adaptive-icon.png',
      backgroundColor: '#ffffff'
    },
    package: 'dev.prarthan.crybaby'
  },
  web: {
    favicon: './assets/images/favicon.png'
  },
  plugins: [
    'expo-router',
    'expo-build-properties'
  ],
  extra: {
    SUPABASE_URL: process.env.SUPABASE_URL,
    SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY,
  },
  owner: 'prarthan'
}) 