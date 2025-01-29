import React from 'react';
import {
  TextInput,
  View,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  Animated,
  TextInputProps as RNTextInputProps,
} from 'react-native';
import { theme } from './theme';

interface InputProps extends Omit<RNTextInputProps, 'style'> {
  label?: string;
  error?: string;
  helper?: string;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  labelStyle?: TextStyle;
  helperStyle?: TextStyle;
  errorStyle?: TextStyle;
}

export function Input({
  label,
  error,
  helper,
  containerStyle,
  inputStyle,
  labelStyle,
  helperStyle,
  errorStyle,
  onFocus,
  onBlur,
  ...rest
}: InputProps) {
  const [isFocused, setIsFocused] = React.useState(false);
  const scale = React.useRef(new Animated.Value(1)).current;
  const labelY = React.useRef(new Animated.Value(0)).current;
  const labelScale = React.useRef(new Animated.Value(1)).current;

  const handleFocus = (e: any) => {
    setIsFocused(true);
    Animated.parallel([
      Animated.spring(scale, {
        toValue: 1.02,
        useNativeDriver: true,
      }),
      Animated.spring(labelY, {
        toValue: -25,
        useNativeDriver: true,
      }),
      Animated.spring(labelScale, {
        toValue: 0.85,
        useNativeDriver: true,
      }),
    ]).start();
    onFocus?.(e);
  };

  const handleBlur = (e: any) => {
    setIsFocused(false);
    if (!rest.value) {
      Animated.parallel([
        Animated.spring(scale, {
          toValue: 1,
          useNativeDriver: true,
        }),
        Animated.spring(labelY, {
          toValue: 0,
          useNativeDriver: true,
        }),
        Animated.spring(labelScale, {
          toValue: 1,
          useNativeDriver: true,
        }),
      ]).start();
    }
    onBlur?.(e);
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <Animated.Text
          style={[
            styles.label,
            {
              transform: [
                { translateY: labelY },
                { scale: labelScale },
              ],
            },
            isFocused && styles.labelFocused,
            error && styles.labelError,
            labelStyle,
          ]}
        >
          {label}
        </Animated.Text>
      )}
      <Animated.View
        style={[
          styles.inputContainer,
          isFocused && styles.inputContainerFocused,
          error && styles.inputContainerError,
          { transform: [{ scale }] },
        ]}
      >
        <TextInput
          style={[
            styles.input,
            isFocused && styles.inputFocused,
            error && styles.inputError,
            inputStyle,
          ]}
          placeholderTextColor={theme.colors.secondary[400]}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...rest}
        />
      </Animated.View>
      {(error || helper) && (
        <Text
          style={[
            styles.helper,
            error ? styles.error : styles.helperText,
            error ? errorStyle : helperStyle,
          ]}
        >
          {error || helper}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: theme.spacing.xs,
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: theme.colors.secondary[200],
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.background.primary,
    ...theme.shadows.sm,
  },
  inputContainerFocused: {
    borderColor: theme.colors.primary[500],
    borderWidth: 2,
  },
  inputContainerError: {
    borderColor: theme.colors.semantic.error,
  },
  input: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.text.primary,
  },
  inputFocused: {
    color: theme.colors.text.primary,
  },
  inputError: {
    color: theme.colors.semantic.error,
  },
  label: {
    position: 'absolute',
    left: theme.spacing.sm,
    backgroundColor: theme.colors.background.primary,
    paddingHorizontal: theme.spacing.xs,
    color: theme.colors.text.secondary,
    fontSize: theme.typography.fontSize.base,
    zIndex: 1,
  },
  labelFocused: {
    color: theme.colors.primary[500],
  },
  labelError: {
    color: theme.colors.semantic.error,
  },
  helper: {
    marginTop: theme.spacing.xs,
    fontSize: theme.typography.fontSize.sm,
  },
  helperText: {
    color: theme.colors.text.secondary,
  },
  error: {
    color: theme.colors.semantic.error,
  },
}); 