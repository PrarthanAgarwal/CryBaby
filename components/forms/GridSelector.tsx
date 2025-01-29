import React from "react"
import { View, Text, TouchableOpacity, StyleSheet, type ViewStyle } from "react-native"
import * as Haptics from 'expo-haptics'

export interface GridOption {
  emoji: string
  text: string
  value: string
  accessibilityLabel?: string
}

interface GridSelectorProps {
  options: GridOption[]
  selected: string | null
  onSelect: (value: string) => void
  columns?: 2 | 3
  style?: ViewStyle
  disabled?: boolean
}

export function GridSelector({ 
  options, 
  selected, 
  onSelect, 
  columns = 2,
  style,
  disabled = false
}: GridSelectorProps) {
  const handleSelect = (value: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    onSelect(value)
  }

  const itemWidth = columns === 2 ? '48%' : '31%'

  return (
    <View style={[styles.grid, style]}>
      {options.map((option) => {
        const isSelected = selected === option.value
        return (
          <TouchableOpacity
            key={option.value}
            style={[
              styles.item,
              { width: itemWidth },
              isSelected && styles.selectedItem,
              disabled && styles.disabledItem
            ]}
            onPress={() => handleSelect(option.value)}
            disabled={disabled}
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel={option.accessibilityLabel || `Select ${option.text}`}
            accessibilityState={{ 
              selected: isSelected,
              disabled: disabled
            }}
          >
            <Text style={styles.emoji} accessibilityLabel={option.emoji}>
              {option.emoji}
            </Text>
            <Text style={[
              styles.text,
              isSelected && styles.selectedText,
              disabled && styles.disabledText
            ]}>
              {option.text}
            </Text>
          </TouchableOpacity>
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  grid: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  item: {
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    width: '48%',
  },
  selectedItem: {
    backgroundColor: "#bfdbfe",
    borderColor: "#3b82f6",
  },
  disabledItem: {
    opacity: 0.5,
  },
  emoji: {
    fontSize: 24,
    marginBottom: 4,
  },
  text: {
    fontSize: 12,
    textAlign: "center",
    color: "#1f2937",
  },
  selectedText: {
    color: "#3b82f6",
    fontWeight: "500",
  },
  disabledText: {
    color: "#9ca3af",
  },
}) 