import React, { useState } from 'react';
import { Platform, Pressable, StyleSheet, View } from 'react-native';
import Constants from 'expo-constants';
import { supabase } from '../../lib/supabase';
import * as WebBrowser from 'expo-web-browser';
import { makeRedirectUri } from 'expo-auth-session';
import { ThemedText } from '../ThemedText';
import { useThemeColor } from '../../hooks/useThemeColor';
import { BlurView } from 'expo-blur';
import Svg, { Path } from 'react-native-svg';

WebBrowser.maybeCompleteAuthSession();

const googleWebClientId = Constants.expoConfig?.extra?.GOOGLE_WEB_CLIENT_ID;
const googleAndroidClientId = Constants.expoConfig?.extra?.GOOGLE_ANDROID_CLIENT_ID;

function GoogleIcon() {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24">
      <Path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <Path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <Path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <Path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </Svg>
  );
}

export function GoogleAuthButton() {
  const [isLoading, setIsLoading] = useState(false);
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');

  const signInWithGoogle = async () => {
    try {
      setIsLoading(true);

      // For Android, we use the package name as the scheme
      // For iOS, we use the bundleIdentifier
      const redirectUrl = Platform.select({
        ios: 'dev.prarthan.crybaby://auth/callback',
        android: 'dev.prarthan.crybaby://auth/callback',
        default: 'dev.prarthan.crybaby://auth/callback',
      });

      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: redirectUrl,
          skipBrowserRedirect: true,
          scopes: 'email profile',
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      });

      if (error) throw error;
      if (!data?.url) throw new Error('No OAuth URL returned');

      const result = await WebBrowser.openAuthSessionAsync(
        data.url,
        redirectUrl,
        {
          showInRecents: true,
          preferEphemeralSession: true,
        }
      );

      if (result.type === 'success') {
        const { url } = result;
        // Parse both query parameters and hash fragments
        const params = new URLSearchParams(
          url.split('#')[1] || url.split('?')[1] || ''
        );
        const access_token = params.get('access_token');
        const refresh_token = params.get('refresh_token');

        if (access_token && refresh_token) {
          const { error: sessionError } = await supabase.auth.setSession({
            access_token,
            refresh_token,
          });
          if (sessionError) throw sessionError;
        } else {
          // If we don't get tokens directly, try to exchange the code
          const code = params.get('code');
          if (code) {
            const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);
            if (exchangeError) throw exchangeError;
          }
        }
      }
    } catch (error) {
      console.error('Error signing in with Google:', error);
      // Here you might want to show an error toast or alert
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        { opacity: pressed ? 0.8 : 1 },
      ]}
      onPress={signInWithGoogle}
      disabled={isLoading}
    >
      <BlurView intensity={80} style={StyleSheet.absoluteFill} />
      <View style={styles.buttonContent}>
        <View style={styles.googleIcon}>
          <GoogleIcon />
        </View>
        <ThemedText style={[styles.text, { color: textColor }]}>
          {isLoading ? 'Signing in...' : 'Continue with Google'}
        </ThemedText>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 56,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginVertical: 8,
  },
  buttonContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  googleIcon: {
    width: 24,
    height: 24,
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
  },
}); 