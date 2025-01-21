import React from "react"
import { View, Text, StyleSheet, type ViewStyle } from "react-native"
import { Picker } from "@react-native-picker/picker"
import * as Haptics from 'expo-haptics'

interface DurationPickerProps {
  hours: string
  minutes: string
  onChangeHours: (value: string) => void
  onChangeMinutes: (value: string) => void
  style?: ViewStyle
  disabled?: boolean
  maxDuration?: {
    hours: number
    minutes: number
  }
}

export function DurationPicker({ 
  hours, 
  minutes, 
  onChangeHours, 
  onChangeMinutes,
  style,
  disabled = false,
  maxDuration = { hours: 23, minutes: 59 }
}: DurationPickerProps) {
  const handleChangeHours = (value: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    onChangeHours(value)
  }

  const handleChangeMinutes = (value: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    onChangeMinutes(value)
  }

  const hourValues = Array.from(
    { length: maxDuration.hours + 1 }, 
    (_, i) => i.toString()
  )

  const minuteValues = Array.from(
    { length: maxDuration.minutes + 1 }, 
    (_, i) => i.toString().padStart(2, "0")
  )

  return (
    <View style={[styles.container, style]}>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={hours}
          onValueChange={handleChangeHours}
          style={styles.picker}
          enabled={!disabled}
          accessibilityLabel="Select hours"
          accessibilityHint="Choose the number of hours"
        >
          {hourValues.map((value) => (
            <Picker.Item 
              key={value} 
              label={`${value} ${value === "1" ? "hour" : "hours"}`}
              value={value}
            />
          ))}
        </Picker>
      </View>

      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={minutes}
          onValueChange={handleChangeMinutes}
          style={styles.picker}
          enabled={!disabled}
          accessibilityLabel="Select minutes"
          accessibilityHint="Choose the number of minutes"
        >
          {minuteValues.map((value) => (
            <Picker.Item 
              key={value} 
              label={`${parseInt(value)} ${value === "01" ? "minute" : "minutes"}`}
              value={value}
            />
          ))}
        </Picker>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    padding: 8,
  },
  pickerContainer: {
    flex: 1,
    alignItems: "center",
  },
  picker: {
    width: "100%",
    height: 120,
  },
}) 