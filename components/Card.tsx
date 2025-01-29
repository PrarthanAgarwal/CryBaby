import React from 'react';
import { View, ViewStyle, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from './ui/theme';

type CardVariant = 'default' | 'glass' | 'gradient' | 'outlined';
type CardSize = 'sm' | 'md' | 'lg';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  variant?: CardVariant;
  size?: CardSize;
  onPress?: () => void;
  disabled?: boolean;
}

export function Card({ 
  children, 
  style, 
  variant = 'default',
  size = 'md',
  onPress,
  disabled = false 
}: CardProps) {
  const scale = React.useRef(new Animated.Value(1)).current;
  
  const renderContent = () => {
    switch (variant) {
      case 'glass':
        return (
          <Animated.View style={[
            styles.base,
            styles[size],
            styles.glass,
            { transform: [{ scale }] },
            style
          ]}>
            {children}
          </Animated.View>
        );
      case 'gradient':
        return (
          <LinearGradient
            colors={theme.gradients.primary}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={[styles.base, styles[size], style]}
          >
            <Animated.View style={{ transform: [{ scale }] }}>
              {children}
            </Animated.View>
          </LinearGradient>
        );
      case 'outlined':
        return (
          <Animated.View style={[
            styles.base,
            styles[size],
            styles.outlined,
            { transform: [{ scale }] },
            style
          ]}>
            {children}
          </Animated.View>
        );
      default:
        return (
          <Animated.View style={[
            styles.base,
            styles[size],
            { 
              backgroundColor: theme.colors.background.primary,
              transform: [{ scale }] 
            },
            style
          ]}>
            {children}
          </Animated.View>
        );
    }
  };

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.98,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  if (onPress) {
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={onPress}
        disabled={disabled}
        style={styles.touchable}
      >
        {renderContent()}
      </TouchableOpacity>
    );
  }

  return renderContent();
}

const styles = StyleSheet.create({
  touchable: {
    width: '100%',
  },
  base: {
    borderRadius: theme.borderRadius.lg,
    overflow: 'hidden',
    ...theme.shadows.md,
  },
  sm: {
    padding: theme.spacing.sm,
    gap: theme.spacing.xs,
  },
  md: {
    padding: theme.spacing.md,
    gap: theme.spacing.sm,
  },
  lg: {
    padding: theme.spacing.lg,
    gap: theme.spacing.md,
  },
  glass: {
    ...theme.glassmorphism.light,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  outlined: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: theme.colors.secondary[200],
  },
}); 