import React, { useState } from "react"
import { View, Text, StyleSheet, ScrollView, TextInput } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Card } from "@/components/Card"
import { Button } from "@/components/ui/Button"
import { GridSelector, type GridOption } from "@/components/forms/GridSelector"
import { ScaleSelector } from "@/components/forms/ScaleSelector"
import { DatePicker } from "@/components/forms/DatePicker"
import { DurationPicker } from "@/components/forms/DurationPicker"
import { TimePicker } from "@/components/forms/TimePicker"
import { useTheme } from "@/hooks/useTheme"

const reasonOptions: GridOption[] = [
  { emoji: "😊", text: "Happy Tears", value: "happy" },
  { emoji: "😢", text: "Sad", value: "sad" },
  { emoji: "🧠", text: "Memory Lane", value: "memory" },
  { emoji: "😰", text: "Anxious", value: "anxious" },
  { emoji: "🥺", text: "Overwhelmed", value: "overwhelmed" },
  { emoji: "🤷", text: "Just Because", value: "justBecause" },
]

const volumeOptions: GridOption[] = [
  { emoji: "🥛", text: "Glass", value: "glass" },
  { emoji: "🍺", text: "Pint", value: "pint" },
  { emoji: "🛢️", text: "Gallon", value: "gallon" },
  { emoji: "🌊", text: "Waterfall", value: "waterfall" },
  { emoji: "🌊🏠", text: "Floods", value: "floods" },
  { emoji: "🌊🎲", text: "Tsunami", value: "tsunami" },
]

const satisfactionOptions: GridOption[] = [
  { emoji: "😌", text: "Relief", value: "relief" },
  { emoji: "🥰", text: "Therapeutic", value: "therapeutic" },
  { emoji: "✨", text: "Refreshed", value: "refreshed" },
  { emoji: "🎭", text: "Cathartic", value: "cathartic" },
]

export default function Home() {
  const theme = useTheme()
  const [newSession, setNewSession] = useState({
    name: "",
    reason: null as string | null,
    volume: null as string | null,
    startedAt: new Date(),
    minutes: "00",
    satisfaction: null as string | null,
    notes: "",
  })
  const [selectedDate, setSelectedDate] = useState(new Date())

  const handleSave = () => {
    // TODO: Implement save logic
    console.log('Saving session:', newSession)
  }

  const handleDateChange = (date: Date) => {
    // Preserve the current time when changing date
    const newDate = new Date(date)
    newDate.setHours(selectedDate.getHours())
    newDate.setMinutes(selectedDate.getMinutes())
    setSelectedDate(newDate)
  }

  const handleTimeChange = (date: Date) => {
    setSelectedDate(date)
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background.primary,
    },
    title: {
      fontSize: theme.typography.fontSize['2xl'],
      fontFamily: 'Inter_700Bold',
      marginVertical: theme.spacing.md,
      textAlign: 'center',
      color: theme.colors.primary[500],
    },
    card: {
      margin: theme.spacing.md,
      padding: theme.spacing.md,
    },
    sectionTitle: {
      fontSize: theme.typography.fontSize.lg,
      fontFamily: 'Inter_600SemiBold',
      marginBottom: theme.spacing.sm,
      marginTop: theme.spacing.lg,
      color: theme.colors.text.primary,
    },
    input: {
      borderWidth: 1,
      borderColor: theme.colors.secondary[200],
      borderRadius: theme.borderRadius.md,
      padding: theme.spacing.sm,
      fontSize: theme.typography.fontSize.base,
      fontFamily: 'Inter_400Regular',
      backgroundColor: theme.colors.background.primary,
    },
    textArea: {
      height: 100,
      textAlignVertical: 'top',
    },
    saveButton: {
      marginTop: theme.spacing.xl,
    },
    dateTimeSection: {
      gap: theme.spacing.sm,
    },
    dateTimeRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    pickerContainer: {
      gap: theme.spacing.sm,
    },
  })

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>Describe your cry</Text>

        <Card style={styles.card}>
          <Text style={styles.sectionTitle}>Session name</Text>
          <TextInput
            style={styles.input}
            placeholder="Name this cry session"
            value={newSession.name}
            onChangeText={(value) => setNewSession({ ...newSession, name: value })}
          />

          <Text style={styles.sectionTitle}>Why the tears?</Text>
          <GridSelector
            options={reasonOptions}
            selected={newSession.reason}
            onSelect={(value) => setNewSession({ ...newSession, reason: value })}
            columns={3}
          />

          <Text style={styles.sectionTitle}>Volume</Text>
          <ScaleSelector
            options={volumeOptions}
            selected={newSession.volume}
            onSelect={(value) => setNewSession({ ...newSession, volume: value })}
          />

          <Text style={styles.sectionTitle}>Date & Duration</Text>
          <View style={styles.dateTimeSection}>
            <DatePicker
              selectedDate={selectedDate}
              onDateChange={handleDateChange}
            >
              <TimePicker
                selectedDate={selectedDate}
                onTimeChange={handleTimeChange}
              />
            </DatePicker>
            <DurationPicker
              minutes={newSession.minutes}
              onChangeMinutes={(value) => setNewSession({ ...newSession, minutes: value })}
            />
          </View>

          <Text style={styles.sectionTitle}>Satisfaction</Text>
          <ScaleSelector
            options={satisfactionOptions}
            selected={newSession.satisfaction}
            onSelect={(value) => setNewSession({ ...newSession, satisfaction: value })}
          />

          <Text style={styles.sectionTitle}>Additional notes</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="How do you feel about this cry?"
            value={newSession.notes}
            onChangeText={(value) => setNewSession({ ...newSession, notes: value })}
            multiline
            numberOfLines={4}
          />

          <Button 
            onPress={handleSave}
            style={styles.saveButton}
            disabled={!newSession.reason || !newSession.volume}
            accessibilityLabel="Log cry session"
          >
            Log Session
          </Button>
        </Card>
      </ScrollView>
    </SafeAreaView>
  )
}

