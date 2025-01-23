import React, { useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity, Animated } from "react-native"
import RNPickerSelect from 'react-native-picker-select'
import * as Haptics from 'expo-haptics'

interface DurationPickerProps {
  hours: string
  minutes: string
  onChangeHours: (value: string) => void
  onChangeMinutes: (value: string) => void
  maxDuration?: {
    hours: number
    minutes: number
  }
  disabled?: boolean
}

export function DurationPicker({ 
  hours,
  minutes,
  onChangeHours,
  onChangeMinutes,
  maxDuration = { hours: 23, minutes: 59 },
  disabled = false,
}: DurationPickerProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const expandAnim = useState(new Animated.Value(0))[0]

  const handleToggle = () => {
    if (disabled) return
    
    const toValue = isExpanded ? 0 : 1
    setIsExpanded(!isExpanded)
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    
    Animated.timing(expandAnim, {
      toValue,
      duration: 300,
      useNativeDriver: false,
    }).start()
  }

  const handleChangeHours = (value: string) => {
    if (value) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
      onChangeHours(value)
    }
  }

  const handleChangeMinutes = (value: string) => {
    if (value) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
      onChangeMinutes(value.padStart(2, '0'))
    }
  }

  const hourItems = Array.from(
    { length: maxDuration.hours + 1 },
    (_, i) => ({
      label: `${i} hour${i !== 1 ? 's' : ''}`,
      value: i.toString(),
    })
  )

  const minuteItems = Array.from(
    { length: maxDuration.minutes + 1 },
    (_, i) => ({
      label: `${i} min`,
      value: i.toString().padStart(2, '0'),
    })
  )

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        onPress={handleToggle}
        style={styles.button}
        disabled={disabled}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Duration</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{hours}h {minutes}m</Text>
          </View>
        </View>
      </TouchableOpacity>

      <Animated.View style={[
        styles.pickerContainer,
        {
          maxHeight: expandAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 200]
          }),
          opacity: expandAnim
        }
      ]}>
        <View style={styles.pickersRow}>
          <View style={styles.pickerWrapper}>
            <RNPickerSelect
              value={hours}
              onValueChange={handleChangeHours}
              items={hourItems}
              style={pickerSelectStyles}
              useNativeAndroidPickerStyle={false}
            />
          </View>

          <View style={styles.pickerWrapper}>
            <RNPickerSelect
              value={minutes}
              onValueChange={handleChangeMinutes}
              items={minuteItems}
              style={pickerSelectStyles}
              useNativeAndroidPickerStyle={false}
            />
          </View>
        </View>
      </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    overflow: "hidden",
    marginVertical: 8,
  },
  button: {
    width: "100%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000000",
  },
  badge: {
    backgroundColor: "#B17F4A",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  badgeText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "500",
  },
  pickerContainer: {
    backgroundColor: "#f8f9fa",
    overflow: "hidden",
  },
  pickersRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 10,
  },
  pickerWrapper: {
    flex: 1,
    alignItems: "center",
  },
})

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    color: '#000000',
    textAlign: 'center',
  },
  inputAndroid: {
    fontSize: 16,
    paddingVertical: 8,
    paddingHorizontal: 10,
    color: '#000000',
    textAlign: 'center',
  },
}) 