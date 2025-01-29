import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
  Animated,
  AccessibilityProps,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from './theme';

type ButtonVariant = 'solid' | 'outline' | 'ghost' | 'gradient';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends Pick<AccessibilityProps, 'accessibilityLabel' | 'accessibilityHint' | 'accessibilityRole'> {
  onPress: () => void;
  children: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  gradientColors?: readonly [string, string];
}

export function Button({
  onPress,
  children,
  variant = 'solid',
  size = 'md',
  disabled = false,
  loading = false,
  style,
  textStyle,
  gradientColors = theme.gradients.primary as readonly [string, string],
  accessibilityLabel,
  accessibilityHint,
  accessibilityRole = 'button',
}: ButtonProps) {
  const scale = React.useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const renderContent = () => {
    if (loading) {
      return (
        <ActivityIndicator
          color={variant === 'solid' ? 'white' : theme.colors.primary[500]}
          size={size === 'sm' ? 'small' : 'small'}
        />
      );
    }

    return (
      <Text
        style={[
          styles.text,
          styles[`${size}Text`],
          variant === 'solid' && styles.solidText,
          variant === 'outline' && styles.outlineText,
          variant === 'ghost' && styles.ghostText,
          variant === 'gradient' && styles.solidText,
          disabled && styles.disabledText,
          textStyle,
        ]}
      >
        {children}
      </Text>
    );
  };

  const buttonContent = (
    <Animated.View
      style={[
        styles.button,
        styles[size],
        variant === 'solid' && styles.solid,
        variant === 'outline' && styles.outline,
        variant === 'ghost' && styles.ghost,
        disabled && styles.disabled,
        { transform: [{ scale }] },
        style,
      ]}
    >
      {renderContent()}
    </Animated.View>
  );

  if (variant === 'gradient' && !disabled) {
    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled || loading}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={1}
        accessibilityLabel={accessibilityLabel}
        accessibilityHint={accessibilityHint}
        accessibilityRole={accessibilityRole}
        accessibilityState={{ disabled: disabled || loading }}
      >
        <LinearGradient
          colors={gradientColors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.button, styles[size], style]}
        >
          {buttonContent}
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      activeOpacity={1}
      accessibilityLabel={accessibilityLabel}
      accessibilityHint={accessibilityHint}
      accessibilityRole={accessibilityRole}
      accessibilityState={{ disabled: disabled || loading }}
    >
      {buttonContent}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  text: {
    fontWeight: theme.typography.fontWeight.semibold,
  },
  sm: {
    paddingVertical: theme.spacing.xs,
    paddingHorizontal: theme.spacing.sm,
    minWidth: 80,
  },
  md: {
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    minWidth: 120,
  },
  lg: {
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    minWidth: 160,
  },
  smText: {
    fontSize: theme.typography.fontSize.sm,
  },
  mdText: {
    fontSize: theme.typography.fontSize.base,
  },
  lgText: {
    fontSize: theme.typography.fontSize.lg,
  },
  solid: {
    backgroundColor: theme.colors.primary[500],
    ...theme.shadows.sm,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: theme.colors.primary[500],
  },
  ghost: {
    backgroundColor: 'transparent',
  },
  disabled: {
    backgroundColor: theme.colors.secondary[200],
    borderColor: 'transparent',
  },
  solidText: {
    color: 'white',
  },
  outlineText: {
    color: theme.colors.primary[500],
  },
  ghostText: {
    color: theme.colors.primary[500],
  },
  disabledText: {
    color: theme.colors.secondary[400],
  },
}); 