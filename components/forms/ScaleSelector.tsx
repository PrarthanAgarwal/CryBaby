import React from "react"
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Dimensions } from "react-native"
import * as Haptics from 'expo-haptics'
import { LinearGradient } from 'expo-linear-gradient'
import type { GridOption } from "./GridSelector"

interface ScaleSelectorProps {
  options: GridOption[]
  selected: string | null
  onSelect: (value: string) => void
  disabled?: boolean
}

export function ScaleSelector({ 
  options, 
  selected, 
  onSelect,
  disabled = false 
}: ScaleSelectorProps) {
  const handleSelect = (value: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    onSelect(value)
  }

  return (
    <View style={styles.wrapper}>
      <ScrollView 
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.container}
        snapToInterval={Dimensions.get('window').width * 0.3}
        decelerationRate="fast"
      >
        {options.map((option, index) => {
          const isSelected = selected === option.value
          return (
            <TouchableOpacity
              key={option.value}
              style={[
                styles.item,
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
      </ScrollView>
      
      <LinearGradient
        colors={['rgba(255,255,255,0)', 'rgba(255,255,255,0.8)']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.gradient}
        pointerEvents="none"
      />

      <View style={styles.pagination}>
        {options.map((_, index) => (
          <View
            key={index}
            style={[
              styles.paginationDot,
              selected === options[index].value && styles.paginationDotActive
            ]}
          />
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
    marginBottom: 16,
  },
  container: {
    paddingHorizontal: 4,
  },
  item: {
    width: Dimensions.get('window').width * 0.28,
    padding: 10,
    marginHorizontal: 4,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    height: 80,
  },
  selectedItem: {
    backgroundColor: "#bfdbfe",
    borderColor: "#3b82f6",
  },
  disabledItem: {
    opacity: 0.5,
  },
  emoji: {
    fontSize: 22,
    marginBottom: 4,
  },
  text: {
    fontSize: 11,
    textAlign: "center",
    color: "#1f2937",
    fontFamily: 'Inter_400Regular',
  },
  selectedText: {
    color: "#3b82f6",
    fontFamily: 'Inter_500Medium',
  },
  disabledText: {
    color: "#9ca3af",
  },
  gradient: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    width: 60,
    zIndex: 1,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 8,
  },
  paginationDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#e2e8f0',
    marginHorizontal: 2,
  },
  paginationDotActive: {
    backgroundColor: '#3b82f6',
  },
}) 