import { View, StyleSheet, Dimensions } from 'react-native';
import { useRouter, Redirect } from 'expo-router';
import { GoogleAuthButton } from '../components/auth/GoogleAuth';
import { useAuth } from '../contexts/AuthContext';
import { ThemedText } from '../components/ThemedText';
import { useThemeColor } from '../hooks/useThemeColor';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { Image } from 'expo-image';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

export default function LoginScreen() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const backgroundColor = useThemeColor({}, 'background');
  const tintColor = useThemeColor({}, 'tint');

  // If user is already logged in, redirect to home
  if (!isLoading && user) {
    return <Redirect href="/(tabs)" />;
  }

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <LinearGradient
        colors={[backgroundColor, tintColor + '20']}
        style={StyleSheet.absoluteFill}
      />
      
      <Animated.View 
        entering={FadeInDown.delay(200).springify()}
        style={[styles.header, { paddingTop: insets.top + 20 }]}
      >
        <Image
          source={require('../assets/images/icon.png')}
          style={styles.logo}
          contentFit="contain"
        />
        <ThemedText style={styles.title}>Welcome to CryBaby</ThemedText>
        <ThemedText style={styles.subtitle}>
          Sign in to track your journey
        </ThemedText>
      </Animated.View>

      <Animated.View 
        entering={FadeInUp.delay(400).springify()}
        style={styles.authContainer}
      >
        <GoogleAuthButton />
      </Animated.View>

      <Animated.View 
        entering={FadeInUp.delay(600).springify()}
        style={styles.footer}
      >
        <ThemedText style={styles.footerText}>
          By continuing, you agree to our Terms of Service and Privacy Policy
        </ThemedText>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    paddingHorizontal: 32,
    marginBottom: 60,
  },
  logo: {
    width: width * 0.22,
    height: width * 0.22,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
    includeFontPadding: false,
    lineHeight: 34,
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.8,
    textAlign: 'center',
    marginBottom: 8,
    includeFontPadding: false,
    lineHeight: 22,
  },
  authContainer: {
    paddingHorizontal: 32,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 24,
    paddingBottom: 36,
  },
  footerText: {
    fontSize: 12,
    textAlign: 'center',
    opacity: 0.6,
  },
}); 