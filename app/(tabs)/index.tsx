import React, { useState } from "react"
import { View, Text, StyleSheet, ScrollView, TextInput } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Card } from "@/components/Card"
import { Button } from "@/components/ui/Button"
import { GridSelector, type GridOption } from "@/components/forms/GridSelector"
import { DurationPicker } from "@/components/forms/DurationPicker"
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
    hours: "0",
    minutes: "00",
    satisfaction: null as string | null,
    notes: "",
  })

  const handleSave = () => {
    // TODO: Implement save logic
    console.log('Saving session:', newSession)
  }

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
          <GridSelector
            options={volumeOptions}
            selected={newSession.volume}
            onSelect={(value) => setNewSession({ ...newSession, volume: value })}
            columns={3}
          />

          <Text style={styles.sectionTitle}>Duration</Text>
          <DurationPicker
            hours={newSession.hours}
            minutes={newSession.minutes}
            onChangeHours={(value) => setNewSession({ ...newSession, hours: value })}
            onChangeMinutes={(value) => setNewSession({ ...newSession, minutes: value })}
            maxDuration={{ hours: 23, minutes: 59 }}
          />

          <Text style={styles.sectionTitle}>Satisfaction</Text>
          <GridSelector
            options={satisfactionOptions}
            selected={newSession.satisfaction}
            onSelect={(value) => setNewSession({ ...newSession, satisfaction: value })}
            columns={3}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fdfbf1",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 16,
    textAlign: "center",
    color: "#3b82f6",
  },
  card: {
    margin: 16,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
    marginTop: 20,
    color: "#1f2937",
  },
  input: {
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#ffffff",
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  saveButton: {
    marginTop: 24,
  },
})

